// 全局热带气旋聚合器（纯函数，无 Response 依赖）
// 被以下文件共用：
//   - functions/api/global-storms.js (Cloudflare Pages 边缘函数)
//   - functions/api/storms.js        (兼容别名)
//   - scripts/fetchGlobal.mjs        (构建时抓取)
//
// 数据源：
//   1) NOAA NHC/CPHC RSS — 大西洋 / 东太 / 中太（结构化，含坐标）
//   2) 美军 JTWC RSS + 文本预警 — 西北太平洋 / 北印度洋 / 南印度洋 / 澳洲 / 南太平洋
//      解析各风暴文本预警中的最新位置与强度，归属对应官方 RSMC。

import { BASINS, basinFromDesignation } from '../../src/data/basins.mjs';

const NHC_FEEDS = [
  { url: 'https://www.nhc.noaa.gov/index-at.xml', basin: 'north_atlantic', agency: 'NOAA NHC' },
  { url: 'https://www.nhc.noaa.gov/index-ep.xml', basin: 'east_pacific', agency: 'NOAA NHC' },
  { url: 'https://www.nhc.noaa.gov/index-cp.xml', basin: 'central_pacific', agency: 'NOAA CPHC' },
];

const JTWC_RSS = 'https://www.metoc.navy.mil/jtwc/rss/jtwc.rss';
const JTWC_BASE = 'https://www.metoc.navy.mil/jtwc/products/';

// ============ 工具 ============
function extractTag(xml, tag) {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return m ? m[1].trim() : '';
}

function ktToMph(kt) { return Math.round(kt * 1.15078); }

// 由风速(mph)推算等级（Saffir-Simpson，同样适用于台风 1-min 风速）
function categoryFromWind(windMph) {
  if (windMph < 39) return -1;   // TD
  if (windMph < 74) return 0;    // TS
  if (windMph < 96) return 1;
  if (windMph < 111) return 2;
  if (windMph < 130) return 3;
  if (windMph < 157) return 4;
  return 5;
}

function typeFromWind(windMph, basin) {
  const cat = categoryFromWind(windMph);
  const isPacific = basin === 'northwest_pacific' || basin === 'north_indian' ||
    basin === 'south_indian' || basin === 'australia' || basin === 'south_pacific';
  if (windMph < 39) return isPacific ? 'Tropical Depression' : 'Tropical Depression';
  if (windMph < 74) return isPacific ? 'Tropical Storm' : 'Tropical Storm';
  if (isPacific) return windMph >= 150 ? 'Super Typhoon' : 'Typhoon';
  return 'Hurricane';
}

// ============ NHC 解析 ============
function parseNHC(xmlText, basinKey, agencyShort) {
  const storms = [];
  const seen = new Set();
  if (/no tropical cyclones at this time|formation is not expected/i.test(xmlText)) return storms;

  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let m;
  while ((m = itemRegex.exec(xmlText)) !== null) {
    const item = m[1];
    const title = extractTag(item, 'title');
    const desc = extractTag(item, 'description');
    const pubDate = extractTag(item, 'pubDate');

    if (/no tropical cyclones|outlook|advisory|tropical weather discussion/i.test(title)) continue;

    const tm = title.match(/(Tropical Depression|Tropical Storm|Hurricane|Subtropical Storm|Post-Tropical|Remnant Low)\s+([A-Za-z0-9]+(?:[\w-]+)?)/i);
    if (!tm) continue;
    const type = tm[1].trim();
    const name = tm[2].trim();
    if (seen.has(name.toLowerCase())) continue;
    seen.add(name.toLowerCase());

    const parsed = parseNHCDesc(desc);
    const windMph = parsed.wind;
    storms.push({
      id: `nhc-${basinKey}-${name}`,
      name,
      designation: '',
      type,
      category: categoryFromWind(windMph),
      windMph,
      pressureMb: parsed.pressure,
      lat: parsed.lat,
      lon: parsed.lon,
      movement: parsed.movement,
      status: 'Active',
      basin: basinKey,
      basinName: BASINS[basinKey].names.en,
      agency: agencyShort,
      source: 'NHC',
      warningUrl: `https://www.nhc.noaa.gov/?${basinKey}`,
      issuedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
    });
  }
  return storms;
}

function parseNHCDesc(desc) {
  const coordPatterns = [
    /near\s+([+-]?\d{1,2}\.?\d*)\s*[NS]?[,\s]+([+-]?\d{1,3}\.?\d*)\s*[EW]?/i,
    /located\s+(?:near|at|over)\s+([+-]?\d{1,2}\.?\d*)\s*[NS]?[,\s]+([+-]?\d{1,3}\.?\d*)\s*[EW]?/i,
    /center\s+(?:was|is)\s+(?:near|at)\s+([+-]?\d{1,2}\.?\d*)\s*[NS]?[,\s]+([+-]?\d{1,3}\.?\d*)\s*[EW]?/i,
  ];
  const windPatterns = [
    /maximum sustained winds?\s+(?:of\s+)?(?:about\s+)?(\d+)\s*mph/i,
    /(\d+)\s*mph\s+(?:sustained\s+)?winds?/i,
    /winds?\s+(?:of\s+)?(\d+)\s+mph/i,
  ];
  const pressurePatterns = [
    /minimum central pressure\s+(?:of\s+)?(\d+)\s*mb/i,
    /pressure\s+(?:of\s+)?(\d+)\s*mb/i,
    /(\d{4})\s*mb/i,
  ];
  const movePatterns = [
    /movement[\s:]+(\w{1,3})\s+at\s+(\d+)\s*mph/i,
    /moving[\s:]+(\w{1,3})\s+(?:at\s+)?(\d+)\s*mph/i,
  ];

  let lat = 0, lon = 0;
  for (const pat of coordPatterns) {
    const mm = desc.match(pat);
    if (mm) {
      lat = parseFloat(mm[1]);
      lon = parseFloat(mm[2]);
      if (/S\b/.test(desc.slice(mm.index, mm.index + 20))) lat = -Math.abs(lat);
      if (/W\b/.test(desc.slice(mm.index, mm.index + 20))) lon = -Math.abs(lon);
      break;
    }
  }
  let wind = 0;
  for (const pat of windPatterns) { const mm = desc.match(pat); if (mm) { wind = parseInt(mm[1]); break; } }
  let pressure = 0;
  for (const pat of pressurePatterns) { const mm = desc.match(pat); if (mm) { pressure = parseInt(mm[1]); break; } }
  let movement = 'Unknown';
  for (const pat of movePatterns) { const mm = desc.match(pat); if (mm) { movement = `${mm[1].toUpperCase()} at ${mm[2]} mph`; break; } }

  return { lat, lon, wind, pressure, movement };
}

// ============ JTWC 解析 ============
function parseJtwcStormList(rssText) {
  // 返回 [{ basin, agency, designation, name, type, status, warningTextUrl }]
  const list = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let m;
  while ((m = itemRegex.exec(rssText)) !== null) {
    const item = m[1];
    const descRaw = extractTag(item, 'description');
    const categoryText = extractTag(item, 'category');

    // 风暴名/编号/类型
    const stormRegex = /<b>(?:Super\s+)?(Typhoon|Tropical\s+Storm|Tropical\s+Depression|Cyclone|Subtropical\s+Storm|Tropical\s+Disturbance)\s+(\d{1,2}[A-Z])\s*(?:\(([^)]+)\))?/gi;
    let sm;
    while ((sm = stormRegex.exec(descRaw)) !== null) {
      const type = sm[1].trim();
      const designation = sm[2].trim();
      const name = sm[3] ? sm[3].trim() : designation;
      const status = /final warning/i.test(descRaw) ? 'Final Warning' : 'Active';
      const wm = descRaw.match(/products\/([a-z]+\d+)web\.txt/i);
      const warningTextUrl = wm ? JTWC_BASE + wm[1] + 'web.txt' : '';
      const basin = basinFromDesignation(designation); // 先用编号推断，拿到坐标后再校正
      list.push({
        basin,
        agency: BASINS[basin]?.agencyShort || 'JTWC',
        designation,
        name,
        type,
        status,
        warningTextUrl,
      });
    }
  }
  return list;
}

function parseJtwcText(text) {
  // 最新位置：取第一个 NEAR / REPEAT POSIT
  const posMatch = text.match(/(?:NEAR|REPEAT POSIT:?)\s+(\d{1,2}\.?\d*)\s*([NSEW])\s+(\d{1,3}\.?\d*)\s*([NSEW])/i);
  let lat = 0, lon = 0;
  if (posMatch) {
    lat = parseFloat(posMatch[1]) * (posMatch[2] === 'S' ? -1 : 1);
    lon = parseFloat(posMatch[3]) * (posMatch[4] === 'W' ? -1 : 1);
  }
  // 强度（节 → mph）
  const windMatch = text.match(/MAX SUSTAINED WINDS\s+(?:NEAR|OF)?\s*(\d+)\s*KT/i)
    || text.match(/(\d+)\s*KT\s+(?:SUSTAINED|WINDS)/i)
    || text.match(/WINDS\s+(?:OF\s+)?(\d+)\s*KTS?/i);
  const windKt = windMatch ? parseInt(windMatch[1]) : 0;
  const windMph = windKt ? ktToMph(windKt) : 0;

  // 强度类型校正
  let type = 'Tropical Cyclone';
  if (/SUPER TYPHOON/i.test(text)) type = 'Super Typhoon';
  else if (/TYPHOON/i.test(text)) type = 'Typhoon';
  else if (/TROPICAL STORM/i.test(text)) type = 'Tropical Storm';
  else if (/TROPICAL DEPRESSION/i.test(text)) type = 'Tropical Depression';
  else if (/CYCLONE/i.test(text)) type = 'Cyclone';
  else if (/SUBTROPICAL/i.test(text)) type = 'Subtropical Storm';

  return { lat, lon, windMph, type };
}

// ============ 主聚合 ============
async function fetchText(url, timeoutMs = 12000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const resp = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'TropicalStormTracker/1.0 (+https://tropical-storm-tracker.pages.dev)',
        'Accept': 'application/rss+xml, application/xml, text/*',
      },
    });
    clearTimeout(timer);
    if (!resp.ok) throw new Error(`HTTP ${resp.status} ${url}`);
    return await resp.text();
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchAndAggregate() {
  const storms = [];
  const errors = [];

  // 1) NHC 三流域并行
  const nhcResults = await Promise.allSettled(
    NHC_FEEDS.map(async (f) => {
      const xml = await fetchText(f.url);
      return parseNHC(xml, f.basin, f.agency);
    })
  );
  nhcResults.forEach((r) => {
    if (r.status === 'fulfilled') storms.push(...r.value);
    else errors.push(`NHC: ${r.reason?.message || r.reason}`);
  });

  // 2) JTWC RSS
  let jtwcList = [];
  try {
    const rss = await fetchText(JTWC_RSS);
    jtwcList = parseJtwcStormList(rss);
  } catch (e) {
    errors.push(`JTWC RSS: ${e.message}`);
  }

  // 3) 并行抓取每个 JTWC 风暴的文本预警
  if (jtwcList.length > 0) {
    const details = await Promise.allSettled(
      jtwcList.map(async (s) => {
        if (!s.warningTextUrl) return null;
        const txt = await fetchText(s.warningTextUrl);
        const parsed = parseJtwcText(txt);
        // 用坐标校正南半球流域
        let basin = s.basin;
        if (s.designation.endsWith('S')) basin = basinFromDesignation(s.designation, parsed.lon);
        const windMph = parsed.windMph;
        return {
          id: `jtwc-${basin}-${s.designation}`,
          name: s.name,
          designation: s.designation,
          type: parsed.type || s.type,
          category: categoryFromWind(windMph),
          windMph,
          pressureMb: 0,
          lat: parsed.lat,
          lon: parsed.lon,
          movement: 'See JTWC product',
          status: s.status,
          basin,
          basinName: BASINS[basin]?.names.en || basin,
          agency: BASINS[basin]?.agencyShort || 'JTWC',
          source: 'JTWC',
          warningUrl: s.warningTextUrl,
          issuedAt: new Date().toISOString(),
        };
      })
    );
    details.forEach((d) => {
      if (d.status === 'fulfilled' && d.value) storms.push(d.value);
      else if (d.status === 'rejected') errors.push(`JTWC storm: ${d.reason?.message || d.reason}`);
    });
  }

  // 4) 去重（按 designation；NHC 优先）
  const byKey = new Map();
  for (const s of storms) {
    const key = s.designation || s.id;
    if (!byKey.has(key)) byKey.set(key, s);
    else {
      const existing = byKey.get(key);
      if (existing.source === 'NHC') continue; // 保留 NHC
      byKey.set(key, s);
    }
  }
  const finalStorms = [...byKey.values()];

  // 5) 流域统计
  const basinsSummary = {};
  for (const b of Object.keys(BASINS)) basinsSummary[b] = 0;
  finalStorms.forEach((s) => { if (basinsSummary[s.basin] !== undefined) basinsSummary[s.basin]++; });

  return {
    source: 'NOAA NHC + JTWC',
    fetchedAt: new Date().toISOString(),
    global: true,
    activeStorms: finalStorms.length,
    basins: basinsSummary,
    sources: {
      north_atlantic: 'NOAA NHC',
      east_pacific: 'NOAA NHC',
      central_pacific: 'NOAA CPHC',
      northwest_pacific: 'JMA (via JTWC)',
      north_indian: 'IMD (via JTWC)',
      south_indian: 'Météo-France (via JTWC)',
      australia: 'BOM (via JTWC)',
      south_pacific: 'FMS (via JTWC)',
    },
    storms: finalStorms,
    errors: errors.length ? errors : undefined,
  };
}
