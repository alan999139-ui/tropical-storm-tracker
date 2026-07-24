#!/usr/bin/env node
/**
 * build-fetch.mjs
 * 构建时运行：从 NOAA NHC 获取最新风暴数据，用 Zod 校验后输出到 src/data/active.json
 *
 * 运行方式：
 *   node scripts/fetchNOAA.mjs
 *
 * 在 astro.config.mjs 的 build.start hook 中调用。
 * 若 NOAA 不可用且无缓存 → 退出码 1（中止构建）。
 * 若 NOAA 不可用但有缓存 → 标记 _fallback 继续。
 * 若 NOAA 返回"无活跃风暴" → 正常写入 0 个风暴，构建继续。
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';

// ===== Zod Schema =====
import { z } from 'zod';

const StormSchema = z.object({
  name: z.string().min(1),
  type: z.string(),
  lat: z.number(),
  lon: z.number(),
  wind: z.number().int().min(0),
  pressure: z.number().int().min(800),
  movement: z.string(),
  datetime: z.string(),
  headline: z.string(),
  region: z.string().optional(),
}).passthrough();

// ===== 配置 =====
const NOAA_RSS_URL = 'https://www.nhc.noaa.gov/index-at.xml';
const OUTPUT_PATH = './src/data/active.json';
const FETCH_TIMEOUT_MS = 15000;

// ===== HTTP Fetch =====
async function fetchWithTimeout(url, timeoutMs = FETCH_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const resp = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'TropicalStormTracker/1.0 (+https://tropical-storm-tracker.pages.dev)',
        'Accept': 'application/rss+xml, application/xml, text/*',
      },
    });
    clearTimeout(timer);
    return resp;
  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError') throw new Error(`Timeout after ${timeoutMs}ms: ${url}`);
    throw err;
  }
}

// ===== 提取 XML 标签内容 =====
function extractField(xml, field) {
  for (const tag of [field, `nhc:${field}`, `dc:${field}`]) {
    const m = xml.match(new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, 'i'));
    if (m?.[1]?.trim()) return m[1].trim();
  }
  return null;
}

// ===== 从 title 解析风暴名称和类型 =====
function parseStormFromTitle(title) {
  // 匹配：Tropical Depression NNN / Tropical Storm NAME / Hurricane NAME
  const m = title.match(/(Tropical Depression|Tropical Storm|Hurricane|Subtropical Storm|Post-Tropical|Post-Tropical Cyclone|Remnant Low)\s+([A-Za-z0-9]+(?:[\w-]+)?)/i);
  if (!m) return null;
  return { type: m[1].trim(), name: m[2].trim() };
}

// ===== 从 description 解析坐标/风速/气压/移动方向 =====
function parseStormFromDesc(desc) {
  // 经纬度 — 多种格式支持
  const coordPatterns = [
    // "near 14.5N, 42.3W" 或 "near 14.5 N, 42.3 W"
    /near\s+([+-]?\d{1,2}\.?\d*)\s*[NS]?[,\s]+([+-]?\d{1,3}\.?\d*)\s*[EW]?/i,
    // "located near 25.1N, 71.2W"
    /located\s+(?:near|at|over)\s+([+-]?\d{1,2}\.?\d*)\s*[NS]?[,\s]+([+-]?\d{1,3}\.?\d*)\s*[EW]?/i,
    // "center was near 32.5N, 73.5W"
    /center\s+(?:was|is)\s+(?:near|at)\s+([+-]?\d{1,2}\.?\d*)\s*[NS]?[,\s]+([+-]?\d{1,3}\.?\d*)\s*[EW]?/i,
  ];

  // 风速
  const windPatterns = [
    /maximum sustained winds?\s+(?:of\s+)?(?:about\s+)?(\d+)\s*mph/i,
    /(\d+)\s*mph\s+(?:sustained\s+)?winds?/i,
    /winds?\s+(?:of\s+)?(\d+)\s+mph/i,
  ];

  // 气压
  const pressurePatterns = [
    /minimum central pressure\s+(?:of\s+)?(\d+)\s*mb/i,
    /pressure\s+(?:of\s+)?(\d+)\s*mb/i,
    /(\d{4})\s*mb/i,
  ];

  // 移动方向和速度
  const movePatterns = [
    /movement[\s:]+(\w{1,2})\s+at\s+(\d+)\s*mph/i,
    /moving[\s:]+(\w{1,2})\s+(?:at\s+)?(\d+)\s*mph/i,
    /moving\s+(\w{1,2})\s+(\d+)\s*mph/i,
    /(\w{1,2})\s+(?:at|near)\s+(\d+)\s*mph/i,
  ];

  let lat = 0, lon = 0;
  for (const pat of coordPatterns) {
    const m = desc.match(pat);
    if (m) {
      lat = parseFloat(m[1]);
      lon = parseFloat(m[2]);
      // 判断半球
      if (/S\b/.test(desc.slice(m.index, m.index + 20))) lat = -Math.abs(lat);
      if (/W\b/.test(desc.slice(m.index, m.index + 20))) lon = -Math.abs(lon);
      break;
    }
  }

  let wind = 0;
  for (const pat of windPatterns) {
    const m = desc.match(pat);
    if (m) { wind = parseInt(m[1]); break; }
  }

  let pressure = 0;
  for (const pat of pressurePatterns) {
    const m = desc.match(pat);
    if (m) { pressure = parseInt(m[1]); break; }
  }

  let movement = 'Unknown';
  for (const pat of movePatterns) {
    const m = desc.match(pat);
    if (m) { movement = `${m[1].toUpperCase()} at ${m[2]} mph`; break; }
  }

  return { lat, lon, wind, pressure, movement };
}

// ===== 主解析函数 =====
function parseXMLToStorms(xmlText) {
  const storms = [];
  const seen = new Set();

  // 1. 检测"无活跃风暴"占位符
  if (/no tropical cyclones at this time/i.test(xmlText) || /formation is not expected/i.test(xmlText)) {
    return [];
  }

  // 2. 解析所有 <item> 块
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let itemMatch;
  while ((itemMatch = itemRegex.exec(xmlText)) !== null) {
    const item = itemMatch[1];
    const title = extractField(item, 'title') || '';
    const desc = extractField(item, 'description') || '';
    const pubDate = extractField(item, 'pubDate') || '';

    // 跳过非风暴 item
    if (/no tropical cyclones|outlook|advisory|tropical weather discussion/i.test(title)) continue;

    const stormInfo = parseStormFromTitle(title);
    if (!stormInfo) continue;
    const { type, name } = stormInfo;

    if (seen.has(name.toLowerCase())) continue;
    seen.add(name.toLowerCase());

    const parsed = parseStormFromDesc(desc);

    storms.push({
      name,
      type,
      lat: parsed.lat,
      lon: parsed.lon,
      wind: parsed.wind,
      pressure: parsed.pressure,
      movement: parsed.movement,
      datetime: pubDate,
      headline: desc.replace(/<[^>]+>/g, '').trim().slice(0, 200),
      region: 'Atlantic',
    });
  }

  return storms;
}

function inferStormType(wind) {
  if (wind < 39) return 'Tropical Depression';
  if (wind < 74) return 'Tropical Storm';
  return 'Hurricane';
}

// ===== 主逻辑 =====
async function main() {
  const log = (...args) => console.log(`[${new Date().toISOString()}]`, ...args);

  log(`Fetching NOAA NHC RSS: ${NOAA_RSS_URL}`);
  let xmlText = '';

  try {
    const resp = await fetchWithTimeout(NOAA_RSS_URL);
    if (!resp.ok) throw new Error(`HTTP ${resp.status} ${resp.statusText}`);
    xmlText = await resp.text();
    if (!xmlText.length || xmlText.length < 100) throw new Error('Response too short');
    log(`Received ${xmlText.length} bytes of XML`);
  } catch (err) {
    log(`❌ Fetch failed: ${err.message}`);
    if (existsSync(OUTPUT_PATH)) {
      log('⚠️  Falling back to cached active.json...');
      try {
        const cached = JSON.parse(readFileSync(OUTPUT_PATH, 'utf8'));
        cached._fallback = true;
        cached._error = err.message;
        writeFileSync(OUTPUT_PATH, JSON.stringify(cached, null, 2), 'utf8');
        log('✅ Cached data written (marked as fallback). Build continues.');
        process.exit(0);
      } catch (e) {
        log(`❌ Cache read failed: ${e.message}`);
        process.exit(1);
      }
    } else {
      log('❌ No cached data. Aborting build.');
      process.exit(1);
    }
  }

  log('Parsing storm data...');
  let storms = parseXMLToStorms(xmlText);
  log(`Parsed ${storms.length} raw storm(s): ${storms.map(s => s.name).join(', ') || '(none)'}`);

  // Zod 校验
  log('Running Zod validation...');
  const validated = [];
  let failed = 0;
  for (const s of storms) {
    const result = StormSchema.safeParse(s);
    if (result.success) {
      validated.push(result.data);
    } else {
      failed++;
      log(`  ⚠️  "${s.name}": ${result.error.errors.map(e => `${e.path.join('.')}=${e.message}`).join('; ')}`);
    }
  }

  if (failed > 0) log(`⚠️  ${failed}/${storms.length} failed validation and were dropped.`);

  if (validated.length === 0 && storms.length > 0) {
    log('❌ ALL storms failed validation — aborting build to prevent bad data.');
    process.exit(1);
  }

  // 过滤无效坐标（经纬度不能同时为 0）
  const beforeCoord = validated.length;
  const final = validated.filter(s => !(s.lat === 0 && s.lon === 0));
  if (final.length < beforeCoord) log(`ℹ️  Dropped ${beforeCoord - final.length} storms with invalid coordinates (0,0).`);

  const result = {
    source: 'NOAA NHC',
    feedUrl: NOAA_RSS_URL,
    fetchedAt: new Date().toUTCString(),
    activeStorms: final.length,
    storms: final,
    _buildTime: new Date().toISOString(),
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2), 'utf8');
  log(`✅ Wrote ${final.length} validated storm(s) to ${OUTPUT_PATH}`);
  if (final.length === 0) log('ℹ️  No active storms — this is normal during off-season.');
}

main().catch(err => {
  console.error(`[${new Date().toISOString()}] ❌ Unhandled: ${err.message}`);
  process.exit(1);
});
