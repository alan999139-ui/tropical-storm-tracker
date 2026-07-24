// Cloudflare Pages Function: /api/storms
// 实时获取 NOAA NHC 大西洋风暴数据并返回 JSON
// 部署在 Cloudflare Pages 边缘节点，无需 CORS 代理

export async function onRequestGet(context) {
  const NOAA_RSS_URL = 'https://www.nhc.noaa.gov/index-at.xml';

  // 1. 优先使用构建时数据（静态构建，服务器端已有最新数据）
  const buildtimeData = getBuildtimeStorms();
  if (buildtimeData && !buildtimeData._fallback) {
    return jsonResponse(context, buildtimeData);
  }

  // 2. 运行时从 NOAA 实时获取
  try {
    const response = await fetch(NOAA_RSS_URL, {
      headers: {
        'User-Agent': 'TropicalStormTracker/1.0 (https://tropical-storm-tracker.pages.dev)',
      },
      cf: { cacheTtl: 120, cacheEverything: true },
    });

    if (!response.ok) {
      return jsonResponse(context, {
        error: 'Failed to fetch NOAA data',
        status: response.status,
        storms: [],
      }, 502);
    }

    const xmlText = await response.text();
    const storms = parseStormsFromRSS(xmlText);

    return jsonResponse(context, {
      source: 'NOAA NHC',
      feedUrl: NOAA_RSS_URL,
      fetchedAt: new Date().toISOString(),
      activeStorms: storms.length,
      storms: storms,
    });
  } catch (err) {
    // 3. 降级：使用构建时缓存数据（即使标记为 fallback）
    if (buildtimeData) {
      buildtimeData._runtimeFallback = true;
      buildtimeData._runtimeError = err.message;
      return jsonResponse(context, buildtimeData);
    }
    return jsonResponse(context, {
      error: 'Internal error fetching NOAA data',
      message: err.message,
      storms: [],
      source: 'NOAA NHC (unavailable)',
      fetchedAt: new Date().toISOString(),
    }, 500);
  }
}

function jsonResponse(context, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Cache-Control': 'public, max-age=120',
    },
  });
}

// 构建时 active.json 路径（Cloudflare Pages Functions 在 dist 同级目录运行）
function getBuildtimeStorms() {
  try {
    // 尝试从 dist 同级读取（构建时 prebuild 生成）
    const { readFileSync } = require('fs');
    const path = require('path');
    const filePath = path.join(process.cwd(), 'src', 'data', 'active.json');
    const raw = readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function parseStormsFromRSS(xmlText) {
  // 使用正则解析 XML（Cloudflare Workers 环境无 DOMParser）
  const storms = [];
  const seen = new Set();

  // 匹配所有 <item> 块
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let itemMatch;

  while ((itemMatch = itemRegex.exec(xmlText)) !== null) {
    const itemContent = itemMatch[1];

    // 尝试从 nhc:Cyclone 结构化数据解析
    const cycloneMatch = itemContent.match(/<(?:nhc:)?Cyclone[^>]*>([\s\S]*?)<\/(?:nhc:)?Cyclone>/);
    if (cycloneMatch) {
      const cycloneData = cycloneMatch[1];
      const name = extractTag(cycloneData, 'name');
      const type = extractTag(cycloneData, 'type');
      const center = extractTag(cycloneData, 'center');
      const movement = extractTag(cycloneData, 'movement');
      const pressure = extractTag(cycloneData, 'pressure');
      const wind = extractTag(cycloneData, 'wind');
      const datetime = extractTag(cycloneData, 'datetime');
      const headline = extractTag(cycloneData, 'headline');

      if (name && !seen.has(name)) {
        seen.add(name);
        const coords = center.split(',').map(s => parseFloat(s.trim()));
        const windNum = parseInt(wind) || 0;
        const pressureNum = parseInt(pressure) || 0;
        storms.push({
          name,
          type: type || getStormType(windNum),
          lat: coords[0] || 0,
          lon: coords[1] || 0,
          wind: windNum,
          pressure: pressureNum,
          movement,
          datetime,
          headline,
        });
        continue;
      }
    }

    // 后备：从 title + description 解析
    const title = extractTag(itemContent, 'title');
    const desc = extractTag(itemContent, 'description');
    const titleMatch = title.match(/(?:Tropical Storm|Hurricane|Tropical Depression)\s+(\w+)/);
    if (titleMatch && !seen.has(titleMatch[1])) {
      const locMatch = desc.match(/located near\s+(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)/i);
      const windMatch = desc.match(/maximum sustained winds.*?(\d+)\s*mph/i);
      const pressureMatch = desc.match(/minimum central pressure.*?(\d+)\s*mb/i);
      const movementMatch = desc.match(/movement\s+(\w+)\s+at\s+(\d+)\s*mph/i) || desc.match(/moving.*?(\w+).*?(\d+)\s*mph/i);

      if (locMatch || windMatch) {
        const name = titleMatch[1];
        seen.add(name);
        const windNum = windMatch ? parseInt(windMatch[1]) : 0;
        storms.push({
          name,
          type: title.match(/(Tropical Depression|Tropical Storm|Hurricane)/)?.[1] || getStormType(windNum),
          lat: locMatch ? parseFloat(locMatch[1]) : 0,
          lon: locMatch ? parseFloat(locMatch[2]) : 0,
          wind: windNum,
          pressure: pressureMatch ? parseInt(pressureMatch[1]) : 0,
          movement: movementMatch ? `${movementMatch[1]} at ${movementMatch[2]} mph` : 'Unknown',
          datetime: '',
          headline: '',
        });
      }
    }
  }

  return storms;
}

function extractTag(xml, tagName) {
  const regex = new RegExp(`<(?:nhc:)?${tagName}[^>]*>([^<]*)</(?:nhc:)?${tagName}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : '';
}

function getStormType(wind) {
  if (wind < 39) return 'Tropical Depression';
  if (wind < 74) return 'Tropical Storm';
  return 'Hurricane';
}
