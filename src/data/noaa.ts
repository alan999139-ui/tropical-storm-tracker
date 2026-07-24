// 数据获取层 — NOAA / NHC API 接口
// 文件: src/data/noaa.ts

// NOAA NHC 公开数据端点
export const NOAA_ENDPOINTS = {
  // 活跃风暴 RSS
  activeStormsRSS: 'https://www.nhc.noaa.gov/index-at.xml',
  // 大西洋区域摘要
  atlanticSummary: 'https://www.nhc.noaa.gov/text/refresh/MIATWSAT+shtml/MIATWSAT.shtml',
  // 太平洋区域摘要
  pacificSummary: 'https://www.nhc.noaa.gov/text/refresh/MIATWSEP+shtml/MIATWSEP.shtml',
  // GIS 数据（风暴路径、预测锥）
  gisArchive: 'https://www.nhc.noaa.gov/gis/',
  // HURDAT2 历史数据库
  hurdat2: 'https://www.nhc.noaa.gov/data/hurdat/hurdat2-1851-2023-050924.txt',
};

// 风暴类型枚举
export type StormType = 'Tropical Depression' | 'Tropical Storm' | 'Hurricane';

// 风暴强度枚举
export type StormIntensity = 'TD' | 'TS' | 'Cat-1' | 'Cat-2' | 'Cat-3' | 'Cat-4' | 'Cat-5';

// 风暴数据接口
export interface Storm {
  id: string;
  name: string;
  type: StormType;
  intensity: StormIntensity;
  lat: number;
  lon: number;
  windSpeed: number; // mph
  pressure: number; // mb
  movementDir: string;
  movementSpeed: number;
  lastUpdate: string;
  region: string;
}

// 萨菲尔-辛普森飓风等级
export function getCategory(windSpeed: number): StormIntensity {
  if (windSpeed < 39) return 'TD';
  if (windSpeed < 74) return 'TS';
  if (windSpeed < 96) return 'Cat-1';
  if (windSpeed < 111) return 'Cat-2';
  if (windSpeed < 130) return 'Cat-3';
  if (windSpeed < 157) return 'Cat-4';
  return 'Cat-5';
}

// 风暴颜色映射
export const intensityColors: Record<StormIntensity, string> = {
  'TD': '#4dabf7',
  'TS': '#ffd43b',
  'Cat-1': '#ff8787',
  'Cat-2': '#fa5252',
  'Cat-3': '#e64980',
  'Cat-4': '#cc5de8',
  'Cat-5': '#845ef7',
};

// 从 NOAA RSS 解析活跃风暴（客户端 fetch + DOMParser）
export async function fetchActiveStorms(): Promise<Storm[]> {
  try {
    const response = await fetch(NOAA_ENDPOINTS.activeStormsRSS);
    const xml = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');

    const items = doc.querySelectorAll('item');
    const storms: Storm[] = [];

    items.forEach(item => {
      const title = item.querySelector('title')?.textContent || '';
      const description = item.querySelector('description')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || '';

      // 解析标题中的风暴信息
      // 格式示例: "Tropical Storm Bertha Advisory Number 5"
      const nameMatch = title.match(/(?:Tropical Storm|Hurricane|Tropical Depression)\s+(\w+)/);
      const typeMatch = title.match(/(Tropical Depression|Tropical Storm|Hurricane)/);

      if (nameMatch && typeMatch) {
        storms.push({
          id: `${nameMatch[1].toLowerCase()}-${pubDate}`,
          name: nameMatch[1],
          type: typeMatch[1] as StormType,
          intensity: typeMatch[1] === 'Hurricane' ? 'Cat-1' : typeMatch[1] === 'Tropical Storm' ? 'TS' : 'TD',
          lat: 0, // 从 description 解析
          lon: 0,
          windSpeed: 0,
          pressure: 0,
          movementDir: '',
          movementSpeed: 0,
          lastUpdate: pubDate,
          region: 'Atlantic',
        });
      }
    });

    return storms;
  } catch (error) {
    console.error('Error fetching NOAA data:', error);
    return [];
  }
}
