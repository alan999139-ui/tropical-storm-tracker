// 全球热带气旋流域定义（单一数据源）
// 被以下文件共享使用：
//   - scripts/fetchGlobal.mjs (构建时抓取)
//   - src/pages/alerts.astro (地区选择器)
//   - src/pages/dashboard.astro (用户地区)
//   - src/pages/map.astro (流域筛选)
//
// 每个流域标注其官方 RSMC（区域专业气象中心）作为权威数据来源。
// 实时数据管线：大西洋/东太/中太来自 NOAA NHC/CPHC；
// 其余全球流域来自美军 JTWC 预警（数据管线），并归属对应官方机构。

export const BASINS = {
  north_atlantic: {
    id: 'north_atlantic',
    names: { en: 'North Atlantic', zh: '北大西洋', fr: 'Atlantique Nord', ja: '北大西洋' },
    agency: 'NOAA National Hurricane Center',
    agencyShort: 'NOAA NHC',
    flag: '🌊',
    sourcePipe: 'NHC',
    center: [27, -75],
  },
  east_pacific: {
    id: 'east_pacific',
    names: { en: 'East Pacific', zh: '东太平洋', fr: 'Pacifique Est', ja: '東太平洋' },
    agency: 'NOAA National Hurricane Center',
    agencyShort: 'NOAA NHC',
    flag: '🌅',
    sourcePipe: 'NHC',
    center: [15, -120],
  },
  central_pacific: {
    id: 'central_pacific',
    names: { en: 'Central Pacific', zh: '中太平洋', fr: 'Pacifique Centre', ja: '中央太平洋' },
    agency: 'NOAA Central Pacific Hurricane Center',
    agencyShort: 'NOAA CPHC',
    flag: '🌺',
    sourcePipe: 'NHC',
    center: [15, -150],
  },
  northwest_pacific: {
    id: 'northwest_pacific',
    names: { en: 'Northwest Pacific', zh: '西北太平洋', fr: 'Pacifique Nord-Ouest', ja: '北西太平洋' },
    agency: 'Japan Meteorological Agency (RSMC Tokyo)',
    agencyShort: 'JMA',
    flag: '🌏',
    sourcePipe: 'JTWC',
    center: [20, 135],
  },
  north_indian: {
    id: 'north_indian',
    names: { en: 'North Indian Ocean', zh: '北印度洋', fr: 'Océan Indien Nord', ja: '北インド洋' },
    agency: 'India Meteorological Department (RSMC New Delhi)',
    agencyShort: 'IMD',
    flag: '🌊',
    sourcePipe: 'JTWC',
    center: [15, 80],
  },
  south_indian: {
    id: 'south_indian',
    names: { en: 'Southwest Indian Ocean', zh: '西南印度洋', fr: 'Océan Indien Sud-Ouest', ja: '南西インド洋' },
    agency: 'Météo-France (RSMC La Réunion)',
    agencyShort: 'Météo-France',
    flag: '🌊',
    sourcePipe: 'JTWC',
    center: [-15, 70],
  },
  australia: {
    id: 'australia',
    names: { en: 'Australian Region', zh: '澳大利亚海域', fr: 'Région Australienne', ja: 'オーストラリア海域' },
    agency: 'Bureau of Meteorology (RSMC Melbourne)',
    agencyShort: 'BOM',
    flag: '🇦🇺',
    sourcePipe: 'JTWC',
    center: [-20, 135],
  },
  south_pacific: {
    id: 'south_pacific',
    names: { en: 'South Pacific', zh: '南太平洋', fr: 'Pacifique Sud', ja: '南太平洋' },
    agency: 'Fiji Meteorological Service (RSMC Nadi)',
    agencyShort: 'FMS',
    flag: '🌴',
    sourcePipe: 'JTWC',
    center: [-20, 175],
  },
};

export const BASIN_LIST = Object.values(BASINS);

// 根据 JTWC 风暴编号后缀字母判断流域
// W=西北太平洋, B=北印度洋, E=东太平洋, C=中太平洋, A=大西洋, S=南半球(按经度细分)
export function basinFromDesignation(designation, lon) {
  const letter = (designation || '').slice(-1).toUpperCase();
  switch (letter) {
    case 'W': return 'northwest_pacific';
    case 'B': return 'north_indian';
    case 'E': return 'east_pacific';
    case 'C': return 'central_pacific';
    case 'A': return 'north_atlantic';
    case 'S':
      if (lon !== undefined) {
        if (lon >= 90 && lon < 160) return 'australia';
        if (lon >= 160 || lon < -120) return 'south_pacific';
        if (lon >= 20 && lon < 90) return 'south_indian';
      }
      return 'south_pacific';
    default: return 'northwest_pacific';
  }
}

export function agencyForBasin(basinId) {
  return BASINS[basinId]?.agencyShort || 'Unknown';
}
