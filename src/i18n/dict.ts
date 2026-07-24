// 多语种翻译字典
// 支持语言: en (英语), zh (中文)
// 用法: 在页面中 import { t, lang } from '../i18n/dict'
//       const lang = 'en' 或 'zh'
//       t('nav.home') → "Home" / "首页"

export const languages = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    htmlLang: 'en',
  },
  zh: {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    htmlLang: 'zh-CN',
  },
};

export const defaultLang = 'en';

export const dict = {
  // 导航
  'nav.home': { en: 'Home', zh: '首页' },
  'nav.storms': { en: 'Storms', zh: '风暴' },
  'nav.map': { en: 'Live Map', zh: '实时地图' },
  'nav.preparedness': { en: 'Preparedness', zh: '防灾指南' },
  'nav.about': { en: 'About', zh: '关于' },

  // 品牌名
  'brand.name': { en: 'Tropical Storm Tracker', zh: '热带风暴追踪' },

  // Hero
  'hero.badge.loading': { en: 'Loading...', zh: '加载中...' },
  'hero.badge.noStorms': { en: '☀️ No Active Storms', zh: '☀️ 暂无活跃风暴' },
  'hero.title': { en: 'Track Tropical Storms in Real-Time', zh: '实时追踪热带风暴' },
  'hero.desc': {
    en: 'Live tracking, alerts, and historical data for tropical storms, hurricanes, and cyclones. Powered by NOAA & NHC data.',
    zh: '实时追踪、预警和历史数据，涵盖热带风暴、飓风和气旋。数据来自 NOAA 和 NHC。',
  },
  'hero.viewMap': { en: '🗺️ View Live Map', zh: '🗺️ 查看实时地图' },
  'hero.stormDatabase': { en: 'Storm Database', zh: '风暴数据库' },

  // Active Storms
  'active.title': { en: '⚡ Active Storms', zh: '⚡ 活跃风暴' },
  'active.loading': { en: 'Fetching live data from NOAA NHC...', zh: '正在获取 NOAA NHC 实时数据...' },
  'active.noStorms': { en: 'No active tropical storms at this time.', zh: '当前无活跃热带风暴。' },
  'active.browseHistory': { en: 'Browse Historical Data', zh: '浏览历史数据' },
  'active.unableReach': { en: 'Unable to reach NOAA right now.', zh: '暂时无法连接 NOAA。' },
  'active.windSpeed': { en: 'Wind Speed', zh: '风速' },
  'active.pressure': { en: 'Pressure', zh: '气压' },
  'active.movement': { en: 'Movement', zh: '移动方向' },
  'active.location': { en: 'Location', zh: '位置' },
  'active.lastUpdated': { en: 'Last updated', zh: '最后更新' },
  'active.viewDetails': { en: 'View Details →', zh: '查看详情 →' },
  'active.active': { en: 'ACTIVE', zh: '活跃' },
  'active.weakening': { en: 'WEAKENING', zh: '减弱中' },

  // Season Outlook
  'season.title': { en: '📊 2026 Season Outlook', zh: '📊 2026 风暴季展望' },
  'season.forecast': { en: 'Below-Normal', zh: '低于正常水平' },
  'season.namedStorms': { en: 'Named Storms', zh: '命名风暴' },
  'season.hurricanes': { en: 'Hurricanes', zh: '飓风' },
  'season.majorHurricanes': { en: 'Major Hurricanes', zh: '强飓风' },
  'season.ace': { en: 'ACE Index', zh: 'ACE 指数' },
  'season.avg': { en: 'avg', zh: '平均' },
  'season.notes': {
    en: 'El Niño developing — expected to be very strong at peak season, increasing wind shear and suppressing Atlantic development.',
    zh: '厄尔尼诺现象发展中——预计在风暴季高峰期将非常强烈，增加风切变并抑制大西洋风暴发展。',
  },
  'season.dates': {
    en: 'Season: June 1 - November 30 | Peak: September 10',
    zh: '风暴季：6月1日 - 11月30日 | 高峰：9月10日',
  },

  // 2026 Season Storms
  'seasonStorms.title': { en: '🌪️ 2026 Season Storms', zh: '🌪️ 2026 风暴季' },
  'seasonStorms.viewAll': { en: 'View All →', zh: '查看全部 →' },
  'seasonStorms.formed': { en: 'Formed', zh: '形成' },
  'seasonStorms.dissipated': { en: 'Dissipated', zh: '消散' },
  'seasonStorms.landfall': { en: 'Landfall', zh: '登陆' },
  'seasonStorms.damage': { en: 'Damage', zh: '损失' },
  'seasonStorms.fatalities': { en: 'Fatalities', zh: '伤亡' },

  // Preparedness
  'prep.title': { en: '🛡️ Storm Preparedness', zh: '🛡️ 风暴防灾' },
  'prep.fullGuide': { en: 'Full Guide →', zh: '完整指南 →' },
  'prep.kit': { en: 'Emergency Kit', zh: '应急包' },
  'prep.kitDesc': { en: '3-day supply of water, non-perishable food, flashlight, batteries, first aid kit.', zh: '3天饮用水、不易腐食品、手电筒、电池、急救包。' },
  'prep.home': { en: 'Secure Your Home', zh: '加固房屋' },
  'prep.homeDesc': { en: 'Reinforce windows, clear yard debris, check roof for loose shingles.', zh: '加固窗户、清理院子杂物、检查屋顶瓦片。' },
  'prep.connected': { en: 'Stay Connected', zh: '保持联络' },
  'prep.connectedDesc': { en: 'Sign up for local alerts, keep phone charged, have battery radio backup.', zh: '订阅本地预警、保持手机充电、备用电池收音机。' },
  'prep.evacuation': { en: 'Evacuation Plan', zh: '撤离计划' },
  'prep.evacuationDesc': { en: 'Know your route, keep gas tank full, identify shelters ahead of time.', zh: '了解路线、保持油箱满油、提前确认避难所。' },

  // CTA
  'cta.title': { en: 'Never Miss a Storm Warning', zh: '不错过任何风暴预警' },
  'cta.desc': {
    en: 'Subscribe to get real-time alerts when a tropical storm is heading your way. Free, no spam.',
    zh: '订阅实时预警，热带风暴来临时第一时间通知你。免费，无垃圾邮件。',
  },
  'cta.subscribe': { en: 'Subscribe', zh: '订阅' },

  // Map Page
  'map.title': { en: '🗺️ Live Storm Map', zh: '🗺️ 实时风暴地图' },
  'map.desc': {
    en: 'Real-time tracking of active tropical storms. Data streamed live from NOAA National Hurricane Center.',
    zh: '实时追踪活跃热带风暴。数据来自 NOAA 国家飓风中心。',
  },
  'map.connecting': { en: 'Connecting to NOAA NHC...', zh: '正在连接 NOAA NHC...' },
  'map.fetching': { en: 'Fetching from NOAA NHC...', zh: '正在获取 NOAA NHC 数据...' },
  'map.loading': { en: 'Fetching live storm data...', zh: '正在获取实时风暴数据...' },
  'map.noActive': { en: '☀️ No active storms', zh: '☀️ 暂无活跃风暴' },
  'map.live': { en: '🟢 Live', zh: '🟢 实时' },
  'map.unable': { en: '⚠️ Unable to reach NOAA', zh: '⚠️ 无法连接 NOAA' },
  'map.updated': { en: 'Updated', zh: '已更新' },
  'map.legend': { en: 'Legend', zh: '图例' },
  'map.activeStorms': { en: 'Active Storms', zh: '活跃风暴' },
  'map.dataSource': { en: 'Data source', zh: '数据来源' },
  'map.autoRefresh': { en: 'Auto-refresh every 5 minutes. Last fetch', zh: '每5分钟自动刷新。上次获取' },
  'map.td': { en: 'Tropical Depression', zh: '热带低压' },
  'map.ts': { en: 'Tropical Storm', zh: '热带风暴' },
  'map.hurricane': { en: 'Hurricane', zh: '飓风' },
  'map.wind': { en: 'Wind', zh: '风速' },
  'map.movement': { en: 'Movement', zh: '移动' },
  'map.stormPath': { en: 'Storm Path', zh: '风暴路径' },

  // Footer
  'footer.desc': {
    en: 'Real-time tropical storm tracking and information platform.',
    zh: '实时热带风暴追踪与信息平台。',
  },
  'footer.resources': { en: 'Resources', zh: '资源' },
  'footer.quickLinks': { en: 'Quick Links', zh: '快速链接' },
  'footer.rss': { en: 'RSS Feed', zh: 'RSS 订阅' },
  'footer.copyright': {
    en: 'Tropical Storm Tracker. Data sourced from NOAA/NHC. Not for life-safety decisions.',
    zh: '热带风暴追踪。数据来自 NOAA/NHC。本网站不用于生命安全决策。',
  },

  // Storms Page
  'storms.title': { en: '🌪️ Storm Database', zh: '🌪️ 风暴数据库' },
  'storms.desc': {
    en: 'Comprehensive records of tropical storms and hurricanes. Data sourced from NOAA HURDAT2.',
    zh: '热带风暴和飓风综合记录。数据来自 NOAA HURDAT2。',
  },
  'storms.filterYear': { en: 'Year', zh: '年份' },
  'storms.filterCategory': { en: 'Category', zh: '等级' },
  'storms.filterRegion': { en: 'Region', zh: '区域' },
  'storms.filterSearch': { en: 'Storm name...', zh: '风暴名称...' },
  'storms.allYears': { en: 'All Years', zh: '所有年份' },
  'storms.allCategories': { en: 'All Categories', zh: '所有等级' },
  'storms.allRegions': { en: 'All Regions', zh: '所有区域' },
  'storms.colName': { en: 'Name', zh: '名称' },
  'storms.colYear': { en: 'Year', zh: '年份' },
  'storms.colCategory': { en: 'Category', zh: '等级' },
  'storms.colMaxWind': { en: 'Max Wind', zh: '最大风速' },
  'storms.colMinPressure': { en: 'Min Pressure', zh: '最低气压' },
  'storms.colFormed': { en: 'Formed', zh: '形成' },
  'storms.colDissipated': { en: 'Dissipated', zh: '消散' },
  'storms.colRegion': { en: 'Region', zh: '区域' },
  'storms.colDamage': { en: 'Damage', zh: '损失' },
  'storms.found': { en: 'storms found', zh: '个风暴' },
  'storms.noMatch': { en: 'No storms match your filters.', zh: '没有匹配的风暴。' },

  // Preparedness Page
  'prepPage.title': { en: '🛡️ Tropical Storm Preparedness Guide', zh: '🛡️ 热带风暴防灾指南' },
  'prepPage.desc': {
    en: 'Everything you need to know to stay safe before, during, and after a tropical storm.',
    zh: '热带风暴来临前、中、后你需要知道的一切。',
  },
  'prepPage.quickNav': { en: 'Quick Navigation', zh: '快速导航' },
  'prepPage.categories': { en: 'Storm Categories Explained', zh: '风暴等级说明' },
  'prepPage.before': { en: 'Before the Storm', zh: '风暴来临前' },
  'prepPage.during': { en: 'During the Storm', zh: '风暴期间' },
  'prepPage.after': { en: 'After the Storm', zh: '风暴过后' },
  'prepPage.kit': { en: 'Emergency Kit Checklist', zh: '应急包清单' },
  'prepPage.evacuation': { en: 'Evacuation Guide', zh: '撤离指南' },
  'prepPage.faq': { en: 'Frequently Asked Questions', zh: '常见问题' },
  'prepPage.dataSource': { en: 'Data Source', zh: '数据来源' },

  // About Page
  'about.title': { en: 'About Tropical Storm Tracker', zh: '关于热带风暴追踪' },
  'about.mission': { en: 'Our Mission', zh: '我们的使命' },

  // Storm Detail
  'detail.maxWind': { en: 'Max Wind Speed', zh: '最大风速' },
  'detail.minPressure': { en: 'Min Pressure', zh: '最低气压' },
  'detail.duration': { en: 'Duration', zh: '持续时间' },
  'detail.region': { en: 'Region', zh: '区域' },
  'detail.landfall': { en: 'Landfall', zh: '登陆地点' },
  'detail.damage': { en: 'Damage', zh: '损失' },
  'detail.fatalities': { en: 'Fatalities', zh: '伤亡' },
  'detail.formed': { en: 'Formed', zh: '形成时间' },
  'detail.overview': { en: 'Overview', zh: '概述' },
  'detail.stormPath': { en: 'Storm Path', zh: '风暴路径' },
  'detail.trackData': { en: 'Storm Track Data', zh: '路径数据' },
  'detail.time': { en: 'Time (UTC)', zh: '时间 (UTC)' },
  'detail.latitude': { en: 'Latitude', zh: '纬度' },
  'detail.longitude': { en: 'Longitude', zh: '经度' },
  'detail.wind': { en: 'Wind (mph)', zh: '风速 (mph)' },
  'detail.pressure': { en: 'Pressure (mb)', zh: '气压 (mb)' },
  'detail.season': { en: 'Atlantic Hurricane Season', zh: '大西洋飓风季' },
};

// 翻译函数
export function t(key, lang = 'en') {
  const entry = dict[key];
  if (!entry) return key;
  return entry[lang] || entry.en || key;
}

// 生成语言切换 URL
export function localizedPath(path, lang) {
  if (lang === 'en') return path; // 英语为默认，不加前缀
  return `/${lang}${path}`;
}
