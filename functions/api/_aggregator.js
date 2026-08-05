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

// ============ 通俗风速描述（各语言） ============
const WIND_DESCRIPTIONS = {
  en: {
    '-1': 'Very light winds, mostly rain.',
    '0': 'Gusty winds, up to 73 mph. Trees may sway, minor flooding possible.',
    '1': 'Dangerous winds 74–95 mph. Roofs damaged, power outages likely.',
    '2': 'Extremely dangerous winds 96–110 mph. Major damage, trees uprooted.',
    '3': 'Devastating winds 111–129 mph. Homes lose roofs, weeks without power.',
    '4': 'Catastrophic winds 130–156 mph. Most structures damaged, area uninhabitable for weeks.',
    '5': 'Catastrophic winds 157+ mph. Most homes destroyed. Survivors face months of recovery.',
  },
  zh: {
    '-1': '风速很弱，以降雨为主。',
    '0': '阵风可达 73 mph。树木摇动，可能有轻微洪涝。',
    '1': '危险风速 74–95 mph。屋顶受损，可能停电。',
    '2': '极端危险风速 96–110 mph。严重破坏，树木倒伏。',
    '3': '毁灭性风速 111–129 mph。房屋屋顶掀翻，可能断水断电数周。',
    '4': '灾难性风速 130–156 mph。大多数建筑受损，灾区数周无法居住。',
    '5': '灾难性风速 157+ mph。大多数房屋被毁，恢复需数月。',
  },
  fr: {
    '-1': 'Vents très légers, mostly pluie.',
    '0': 'Rafales jusqu\'à 73 mph. Arbres agités, inondations mineures possibles.',
    '1': 'Vents dangereux 74–95 mph. Toitures endommagées, coupures probables.',
    '2': 'Vents extrêmement dangereux 96–110 mph. Dégâts majeurs, arbres déracinés.',
    '3': 'Vents dévastateurs 111–129 mph. Toitures arrachées, semaines sans électricité.',
    '4': 'Vents catastrophiques 130–156 mph. La plupart des structures endommagées.',
    '5': 'Vents catastrophiques 157+ mph. La plupart des maisons détruites.',
  },
  ja: {
    '-1': '風速は非常に弱く、雨为主体。',
    '0': '突風最大73mph。木が揺れ、軽度の洪水の可能性。',
    '1': '危険風速74–95mph。屋根損傷、停電の恐れ。',
    '2': '極めて危険な風速96–110mph。大きな被害、木の根こそぎ。',
    '3': '壊滅的風速111–129mph。屋根が飛ぶ、数週間の停電。',
    '4': '壊滅的風速130–156mph。大多数の建物被害、数週間居住不可。',
    '5': '壊滅的風速157+mph。大多数の住宅が倒壊。',
  },
};

// ============ 影响区域（基于流域+坐标近似匹配） ============
const BASIN_AFFECTED_REGIONS = {
  north_atlantic: {
    en: ['Florida', 'Louisiana', 'Texas', 'North Carolina', 'Cuba', 'Bahamas', 'Puerto Rico', 'Jamaica', 'Gulf Coast'],
    zh: ['佛罗里达', '路易斯安那', '德克萨斯', '北卡罗来纳', '古巴', '巴哈马', '波多黎各', '牙买加', '墨西哥湾沿岸'],
    fr: ['Floride', 'Louisiane', 'Texas', 'Caroline du Nord', 'Cuba', 'Bahamas', 'Porto Rico', 'Jamaïque', 'Golfe du Mexique'],
    ja: ['フロリダ', 'ルイジアナ', 'テキサス', 'ノースカロライナ', 'キューバ', 'バハマ', 'プエルトリコ', 'ジャマイカ', 'メキシコ湾岸'],
  },
  east_pacific: {
    en: ['Mexico', 'Southern California', 'Guatemala', 'El Salvador', 'Hawaii', 'Baja California'],
    zh: ['墨西哥', '南加利福尼亚', '危地马拉', '萨尔瓦多', '夏威夷', '下加利福尼亚'],
    fr: ['Mexique', 'Californie du Sud', 'Guatemala', 'Salvador', 'Hawaii', 'Basse-Californie'],
    ja: ['メキシコ', '南カリフォルニア', 'グアテマラ', 'エルサルバドル', 'ハワイ', 'バハ・カリフォルニア'],
  },
  central_pacific: {
    en: ['Hawaii', 'Johnston Atoll', 'Marshall Islands', 'Wake Island'],
    zh: ['夏威夷', '约翰斯顿环礁', '马绍尔群岛', '威克岛'],
    fr: ['Hawaii', 'Johnston Atoll', 'Îles Marshall', 'Wake Island'],
    ja: ['ハワイ', 'ジョン斯顿環礁', 'マーシャル諸島', 'ウェーク島'],
  },
  northwest_pacific: {
    en: ['Japan', 'Philippines', 'Taiwan', 'China', 'South Korea', 'Vietnam', 'Hong Kong', 'Guam'],
    zh: ['日本', '菲律宾', '台湾', '中国', '韩国', '越南', '香港', '关岛'],
    fr: ['Japon', 'Philippines', 'Taïwan', 'Chine', 'Corée du Sud', 'Vietnam', 'Hong Kong', 'Guam'],
    ja: ['日本', 'フィリピン', '台湾', '中国', '韓国', 'ベトナム', '香港', 'グアム'],
  },
  north_indian: {
    en: ['India', 'Bangladesh', 'Myanmar', 'Sri Lanka', 'Oman', 'Yemen'],
    zh: ['印度', '孟加拉国', '缅甸', '斯里兰卡', '阿曼', '也门'],
    fr: ['Inde', 'Bangladesh', 'Myanmar', 'Sri Lanka', 'Oman', 'Yémen'],
    ja: ['インド', 'バングラデシュ', 'ミャンマー', 'スリランカ', 'オーマン', 'イエメン'],
  },
  south_indian: {
    en: ['Madagascar', 'Mozambique', 'Mauritius', 'Réunion', 'Seychelles', 'Comoros'],
    zh: ['马达加斯加', '莫桑比克', '毛里求斯', '留尼汪', '塞舌尔', '科摩罗'],
    fr: ['Madagascar', 'Mozambique', 'Maurice', 'La Réunion', 'Seychelles', 'Comores'],
    ja: ['マダガスカル', 'モザンビーク', 'モーリシャス', 'レユニオン', 'セーシェル', 'コモロ'],
  },
  australia: {
    en: ['Queensland', 'Western Australia', 'Northern Territory', 'New South Wales', 'Papua New Guinea', 'Solomon Islands'],
    zh: ['昆士兰州', '西澳大利亚州', '北领地', '新南威尔士州', '巴布亚新几内亚', '所罗门群岛'],
    fr: ['Queensland', 'Australie-Occidentale', 'Territoire du Nord', 'Nouvelle-Galles du Sud', 'PNG', 'Îles Salomon'],
    ja: ['クイーンズランド', '西オーストラリア', 'ノthern準州', 'ニューサウスウェールズ', 'パプアニューギニア', 'ソロモン諸島'],
  },
  south_pacific: {
    en: ['Fiji', 'New Caledonia', 'Vanuatu', 'Samoa', 'Tonga', 'New Zealand'],
    zh: ['斐济', '新喀里多尼亚', '瓦努阿图', '萨摩亚', '汤加', '新西兰'],
    fr: ['Fiji', 'Nouvelle-Calédonie', 'Vanuatu', 'Samoa', 'Tonga', 'Nouvelle-Zélande'],
    ja: ['フィジー', 'ニューカレドニア', 'バヌアツ', 'サモア', 'トンガ', 'ニュージーランド'],
  },
};

// ============ 辅助函数 ============
function extractTag(xml, tag) {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return m ? m[1].trim() : '';
}

function ktToMph(kt) { return Math.round(kt * 1.15078); }

// 由风速(mph)推算等级（Saffir-Simpson，同样适用于台风 1-min 风速）
function categoryFromWind(windMph) {
  if (windMph < 39) return -1;   // TD → -1
  if (windMph < 74) return 0;    // TS → 0
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
  if (cat < 0) return isPacific ? 'Tropical Depression' : 'Tropical Depression';
  if (cat === 0) return isPacific ? 'Tropical Storm' : 'Tropical Storm';
  if (isPacific) return windMph >= 150 ? 'Super Typhoon' : 'Typhoon';
  return 'Hurricane';
}

// 计算距最近陆地的近似距离（度），简化版
function distToLand(lat, lon) {
  // 简化：按坐标区间判断
  const landmarks = [
    { lat: 25, lon: -80, name: 'Florida', dist: 9999 },
    { lat: 29, lon: -90, name: 'Louisiana', dist: 9999 },
    { lat: 23, lon: -82, name: 'Cuba', dist: 9999 },
    { lat: 18, lon: -66, name: 'Puerto Rico', dist: 9999 },
    { lat: 13, lon: 122, name: 'Philippines', dist: 9999 },
    { lat: 35, lon: 139, name: 'Japan', dist: 9999 },
    { lat: 22, lon: 114, name: 'Hong Kong/China', dist: 9999 },
    { lat: 22, lon: 121, name: 'Taiwan', dist: 9999 },
    { lat: 20, lon: 100, name: 'Myanmar/Thailand', dist: 9999 },
    { lat: -10, lon: 130, name: 'Australia', dist: 9999 },
    { lat: -18, lon: 178, name: 'Fiji', dist: 9999 },
    { lat: 22, lon: -85, name: 'Caribbean', dist: 9999 },
  ];
  let minDist = 9999, nearest = 'Open Ocean';
  for (const lm of landmarks) {
    const d = Math.sqrt((lat - lm.lat) ** 2 + (lon - lm.lon) ** 2);
    if (d < minDist) { minDist = d; nearest = lm.name; }
  }
  return { nearest, distMiles: Math.round(minDist * 69) }; // 1度≈69英里
}

// 构建带丰富信息的风暴对象
function enrichStorm(s) {
  const catKey = String(s.category ?? -1);
  const affected = BASIN_AFFECTED_REGIONS[s.basin] || BASIN_AFFECTED_REGIONS.north_atlantic;
  const landInfo = distToLand(s.lat || 0, s.lon || 0);
  return {
    ...s,
    // 多语言
    names: {
      en: s.name,
      zh: s.name,   // 中文名待后续映射表扩展
    },
    basinNames: {
      en: BASINS[s.basin]?.names?.en || s.basin || '',
      zh: BASINS[s.basin]?.names?.zh || s.basin || '',
      fr: BASINS[s.basin]?.names?.fr || s.basin || '',
      ja: BASINS[s.basin]?.names?.ja || s.basin || '',
    },
    // 通俗风速描述
    windDescription: {
      en: WIND_DESCRIPTIONS.en[catKey] || WIND_DESCRIPTIONS.en['0'],
      zh: WIND_DESCRIPTIONS.zh[catKey] || WIND_DESCRIPTIONS.zh['0'],
      fr: WIND_DESCRIPTIONS.fr[catKey] || WIND_DESCRIPTIONS.fr['0'],
      ja: WIND_DESCRIPTIONS.ja[catKey] || WIND_DESCRIPTIONS.ja['0'],
    },
    // 影响区域
    affectedRegions: affected,
    // 距陆地
    distanceToLand: landInfo.nearest,
    distanceMiles: landInfo.distMiles,
    // 坐标人类可读
    locationText: {
      en: `${Math.abs(s.lat || 0).toFixed(1)}°${(s.lat || 0) >= 0 ? 'N' : 'S'}, ${Math.abs(s.lon || 0).toFixed(1)}°${(s.lon || 0) >= 0 ? 'E' : 'W'}`,
      zh: `${Math.abs(s.lat || 0).toFixed(1)}°${(s.lat || 0) >= 0 ? '北纬' : '南纬'} ${Math.abs(s.lon || 0).toFixed(1)}°${(s.lon || 0) >= 0 ? '东经' : '西经'}`,
      fr: `${Math.abs(s.lat || 0).toFixed(1)}°${(s.lat || 0) >= 0 ? 'N' : 'S'}, ${Math.abs(s.lon || 0).toFixed(1)}°${(s.lon || 0) >= 0 ? 'E' : 'W'}`,
      ja: `${Math.abs(s.lat || 0).toFixed(1)}°${(s.lat || 0) >= 0 ? 'N' : 'S'} ${Math.abs(s.lon || 0).toFixed(1)}°${(s.lon || 0) >= 0 ? 'E' : 'W'}`,
    },
    // 数据源
    dataSource: {
      en: s.source === 'NHC' ? 'NOAA National Hurricane Center' : 'Joint Typhoon Warning Center (JTWC)',
      zh: s.source === 'NHC' ? '美国国家飓风中心（NOAA NHC）' : '联合台风警报中心（JTWC）',
      fr: s.source === 'NHC' ? 'NOAA National Hurricane Center' : 'JTWC',
      ja: s.source === 'NHC' ? '米国立ハリケーンセンター（NOAA NHC）' : '聯合台風警報センター（JTWC）',
    },
  };
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
  const list = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let m;
  while ((m = itemRegex.exec(rssText)) !== null) {
    const item = m[1];
    const descRaw = extractTag(item, 'description');
    const stormRegex = /<b>(?:Super\s+)?(Typhoon|Tropical\s+Storm|Tropical\s+Depression|Cyclone|Subtropical\s+Storm|Tropical\s+Disturbance)\s+(\d{1,2}[A-Z])\s*(?:\(([^)]+)\))?/gi;
    let sm;
    while ((sm = stormRegex.exec(descRaw)) !== null) {
      const type = sm[1].trim();
      const designation = sm[2].trim();
      const name = sm[3] ? sm[3].trim() : designation;
      const status = /final warning/i.test(descRaw) ? 'Final Warning' : 'Active';
      const wm = descRaw.match(/products\/([a-z]+\d+)web\.txt/i);
      const warningTextUrl = wm ? JTWC_BASE + wm[1] + 'web.txt' : '';
      const basin = basinFromDesignation(designation);
      list.push({ basin, agency: BASINS[basin]?.agencyShort || 'JTWC', designation, name, type, status, warningTextUrl });
    }
  }
  return list;
}

function parseJtwcText(text) {
  const posMatch = text.match(/(?:NEAR|REPEAT POSIT:?)\s+(\d{1,2}\.?\d*)\s*([NSEW])\s+(\d{1,3}\.?\d*)\s*([NSEW])/i);
  let lat = 0, lon = 0;
  if (posMatch) {
    lat = parseFloat(posMatch[1]) * (posMatch[2] === 'S' ? -1 : 1);
    lon = parseFloat(posMatch[3]) * (posMatch[4] === 'W' ? -1 : 1);
  }
  const windMatch = text.match(/MAX SUSTAINED WINDS\s+(?:NEAR|OF)?\s*(\d+)\s*KT/i)
    || text.match(/(\d+)\s*KT\s+(?:SUSTAINED|WINDS)/i)
    || text.match(/WINDS\s+(?:OF\s+)?(\d+)\s*KTS?/i);
  const windKt = windMatch ? parseInt(windMatch[1]) : 0;
  const windMph = windKt ? ktToMph(windKt) : 0;
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
        'User-Agent': 'StormTracker/1.0 (+https://tropicalstormtracker.quest)',
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

  // 4) 去重（NHC 优先）
  const byKey = new Map();
  for (const s of storms) {
    const key = s.designation || s.id;
    if (!byKey.has(key)) byKey.set(key, s);
    else if (byKey.get(key).source !== 'NHC') byKey.set(key, s);
  }
  let finalStorms = [...byKey.values()];

  // 5) 丰富字段
  finalStorms = finalStorms.map(enrichStorm);

  // 6) 流域统计
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
