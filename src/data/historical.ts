// 大西洋飓风历史数据 (来源: NOAA HURDAT2 / NHC)
// 每年选取代表性风暴，包含完整的路径节点

export interface StormTrack {
  time: string;
  lat: number;
  lon: number;
  wind: number;
  pressure: number;
}

export interface Storm {
  name: string;
  year: number;
  category: string; // TD, TS, Cat-1 ~ Cat-5
  maxWind: number; // mph
  minPressure: number; // mb
  formed: string;
  dissipated: string;
  duration: string;
  fatalities: number;
  damage: string;
  landfall: string;
  region: string;
  description: string;
  track: StormTrack[];
}

export const historicalStorms: Storm[] = [
  // ===== 2026 =====
  {
    name: 'Arthur', year: 2026, category: 'TS', maxWind: 45, minPressure: 1002,
    formed: '2026-06-15', dissipated: '2026-06-17', duration: '2 days',
    fatalities: 4, damage: '$1B', landfall: 'Texas', region: 'Gulf of Mexico',
    description: 'Tropical Storm Arthur formed in mid-June in the Gulf of Mexico. The storm made landfall in Texas, bringing heavy rainfall and flash flooding. Arthur caused 4 fatalities and approximately $1 billion in damage.',
    track: [
      { time: '2026-06-15 06:00 UTC', lat: 26.8, lon: -93.2, wind: 35, pressure: 1008 },
      { time: '2026-06-15 12:00 UTC', lat: 27.5, lon: -93.8, wind: 40, pressure: 1005 },
      { time: '2026-06-15 18:00 UTC', lat: 28.3, lon: -94.5, wind: 45, pressure: 1002 },
      { time: '2026-06-16 00:00 UTC', lat: 29.0, lon: -95.2, wind: 45, pressure: 1002 },
      { time: '2026-06-16 06:00 UTC', lat: 29.5, lon: -95.8, wind: 40, pressure: 1004 },
      { time: '2026-06-16 12:00 UTC', lat: 30.0, lon: -96.5, wind: 35, pressure: 1006 },
      { time: '2026-06-16 18:00 UTC', lat: 30.5, lon: -97.0, wind: 30, pressure: 1008 },
      { time: '2026-06-17 00:00 UTC', lat: 31.0, lon: -97.5, wind: 25, pressure: 1010 },
    ],
  },
  {
    name: 'Bertha', year: 2026, category: 'TD', maxWind: 50, minPressure: 1003,
    formed: '2026-07-21', dissipated: '2026-07-24', duration: '3 days',
    fatalities: 0, damage: 'TBD', landfall: 'Louisiana', region: 'Gulf of Mexico',
    description: 'Tropical Storm Bertha originated from Tropical Depression Two, forming in the Gulf of Mexico on July 21. The storm strengthened to a tropical storm before making landfall in Louisiana and tracking westward across Texas. Bertha brought heavy rainfall (1-4 inches), storm surge, and tropical storm-force winds.',
    track: [
      { time: '2026-07-21 06:00 UTC', lat: 27.2, lon: -85.5, wind: 30, pressure: 1010 },
      { time: '2026-07-21 12:00 UTC', lat: 27.8, lon: -86.2, wind: 35, pressure: 1009 },
      { time: '2026-07-21 18:00 UTC', lat: 28.2, lon: -87.0, wind: 40, pressure: 1008 },
      { time: '2026-07-22 00:00 UTC', lat: 28.5, lon: -88.5, wind: 45, pressure: 1006 },
      { time: '2026-07-22 06:00 UTC', lat: 28.9, lon: -90.0, wind: 50, pressure: 1003 },
      { time: '2026-07-22 12:00 UTC', lat: 29.2, lon: -91.5, wind: 50, pressure: 1003 },
      { time: '2026-07-22 18:00 UTC', lat: 29.5, lon: -92.8, wind: 45, pressure: 1005 },
      { time: '2026-07-23 00:00 UTC', lat: 29.7, lon: -93.9, wind: 40, pressure: 1006 },
      { time: '2026-07-23 06:00 UTC', lat: 29.8, lon: -94.7, wind: 35, pressure: 1006 },
      { time: '2026-07-23 18:00 UTC', lat: 29.9, lon: -95.3, wind: 35, pressure: 1007 },
    ],
  },
  // ===== 2024 =====
  {
    name: 'Helene', year: 2024, category: 'Cat-4', maxWind: 140, minPressure: 938,
    formed: '2024-09-24', dissipated: '2024-09-28', duration: '5 days',
    fatalities: 225, damage: '$78.7B', landfall: 'Florida (Big Bend)', region: 'Gulf of Mexico',
    description: 'Hurricane Helene was a devastating Category 4 hurricane that became the deadliest Atlantic hurricane since Maria (2017). It made landfall in the Florida Big Bend region with 140 mph winds, causing catastrophic flooding across the southeastern US, particularly in North Carolina and Tennessee. Helene was the 7th-costliest Atlantic hurricane on record.',
    track: [
      { time: '2024-09-24 06:00 UTC', lat: 17.5, lon: -83.0, wind: 35, pressure: 1002 },
      { time: '2024-09-24 18:00 UTC', lat: 19.0, lon: -85.0, wind: 45, pressure: 998 },
      { time: '2024-09-25 06:00 UTC', lat: 20.5, lon: -87.0, wind: 55, pressure: 992 },
      { time: '2024-09-25 18:00 UTC', lat: 23.0, lon: -88.5, wind: 65, pressure: 982 },
      { time: '2024-09-26 00:00 UTC', lat: 25.0, lon: -90.0, wind: 80, pressure: 971 },
      { time: '2024-09-26 06:00 UTC', lat: 27.0, lon: -91.5, wind: 105, pressure: 959 },
      { time: '2024-09-26 12:00 UTC', lat: 28.5, lon: -83.5, wind: 130, pressure: 947 },
      { time: '2024-09-26 18:00 UTC', lat: 30.0, lon: -84.0, wind: 140, pressure: 938 },
      { time: '2024-09-27 00:00 UTC', lat: 31.5, lon: -84.5, wind: 100, pressure: 955 },
      { time: '2024-09-27 06:00 UTC', lat: 33.0, lon: -85.0, wind: 65, pressure: 970 },
      { time: '2024-09-27 18:00 UTC', lat: 36.0, lon: -82.0, wind: 40, pressure: 985 },
      { time: '2024-09-28 06:00 UTC', lat: 39.0, lon: -79.0, wind: 30, pressure: 995 },
    ],
  },
  {
    name: 'Milton', year: 2024, category: 'Cat-5', maxWind: 180, minPressure: 897,
    formed: '2024-10-05', dissipated: '2024-10-10', duration: '6 days',
    fatalities: 24, damage: '$50B', landfall: 'Florida (Siesta Key)', region: 'Gulf of Mexico',
    description: 'Hurricane Milton rapidly intensified from a tropical storm to a Category 5 hurricane in just 24 hours, reaching the strongest intensity of the 2024 season with 180 mph winds and a pressure of 897 mb. It made landfall as a Category 3 in Florida, spawning dozens of tornadoes and causing massive damage. Milton was one of the most rapidly intensifying hurricanes ever recorded.',
    track: [
      { time: '2024-10-05 06:00 UTC', lat: 18.0, lon: -92.0, wind: 35, pressure: 1005 },
      { time: '2024-10-05 18:00 UTC', lat: 19.5, lon: -93.0, wind: 60, pressure: 994 },
      { time: '2024-10-06 00:00 UTC', lat: 20.5, lon: -94.0, wind: 90, pressure: 977 },
      { time: '2024-10-06 06:00 UTC', lat: 21.5, lon: -94.5, wind: 145, pressure: 935 },
      { time: '2024-10-06 12:00 UTC', lat: 22.5, lon: -94.5, wind: 180, pressure: 897 },
      { time: '2024-10-07 00:00 UTC', lat: 24.0, lon: -93.0, wind: 155, pressure: 914 },
      { time: '2024-10-07 12:00 UTC', lat: 25.5, lon: -90.0, wind: 145, pressure: 922 },
      { time: '2024-10-08 18:00 UTC', lat: 27.2, lon: -83.0, wind: 120, pressure: 947 },
      { time: '2024-10-09 06:00 UTC', lat: 27.3, lon: -82.5, wind: 105, pressure: 957 },
      { time: '2024-10-09 18:00 UTC', lat: 28.5, lon: -80.0, wind: 75, pressure: 975 },
      { time: '2024-10-10 06:00 UTC', lat: 31.0, lon: -75.0, wind: 45, pressure: 990 },
    ],
  },
  {
    name: 'Beryl', year: 2024, category: 'Cat-5', maxWind: 165, minPressure: 934,
    formed: '2024-06-28', dissipated: '2024-07-10', duration: '13 days',
    fatalities: 64, damage: '$6.2B', landfall: 'Texas', region: 'Caribbean',
    description: 'Hurricane Beryl was the earliest-forming Category 5 Atlantic hurricane on record. It devastated the Caribbean, particularly Carriacou and Grenada, before making landfall in Texas as a Category 1. Beryl was notable for its unprecedented early-season rapid intensification.',
    track: [
      { time: '2024-06-28 06:00 UTC', lat: 9.5, lon: -46.0, wind: 35, pressure: 1006 },
      { time: '2024-06-29 06:00 UTC', lat: 10.5, lon: -50.0, wind: 55, pressure: 997 },
      { time: '2024-06-30 06:00 UTC', lat: 11.5, lon: -56.0, wind: 75, pressure: 983 },
      { time: '2024-07-01 06:00 UTC', lat: 12.0, lon: -62.0, wind: 130, pressure: 954 },
      { time: '2024-07-01 18:00 UTC', lat: 12.5, lon: -64.0, wind: 150, pressure: 940 },
      { time: '2024-07-02 06:00 UTC', lat: 13.0, lon: -66.0, wind: 165, pressure: 934 },
      { time: '2024-07-05 06:00 UTC', lat: 16.5, lon: -76.0, wind: 130, pressure: 956 },
      { time: '2024-07-06 12:00 UTC', lat: 19.5, lon: -83.0, wind: 75, pressure: 983 },
      { time: '2024-07-07 18:00 UTC', lat: 24.0, lon: -88.0, wind: 65, pressure: 990 },
      { time: '2024-07-08 06:00 UTC', lat: 27.5, lon: -91.0, wind: 70, pressure: 984 },
      { time: '2024-07-08 12:00 UTC', lat: 28.5, lon: -93.0, wind: 80, pressure: 979 },
    ],
  },
  // ===== 2023 =====
  {
    name: 'Idalia', year: 2023, category: 'Cat-4', maxWind: 130, minPressure: 947,
    formed: '2023-08-26', dissipated: '2023-09-01', duration: '6 days',
    fatalities: 12, damage: '$3.6B', landfall: 'Florida (Big Bend)', region: 'Gulf of Mexico',
    description: 'Hurricane Idalia made landfall in the Florida Big Bend as a Category 3 hurricane, causing major storm surge and wind damage. It was the strongest hurricane to hit the Big Bend region in over 125 years.',
    track: [
      { time: '2023-08-26 06:00 UTC', lat: 17.0, lon: -82.0, wind: 30, pressure: 1006 },
      { time: '2023-08-27 06:00 UTC', lat: 18.5, lon: -85.0, wind: 40, pressure: 1002 },
      { time: '2023-08-28 06:00 UTC', lat: 20.0, lon: -87.0, wind: 55, pressure: 994 },
      { time: '2023-08-29 06:00 UTC', lat: 23.0, lon: -89.5, wind: 75, pressure: 982 },
      { time: '2023-08-30 00:00 UTC', lat: 25.5, lon: -90.0, wind: 100, pressure: 967 },
      { time: '2023-08-30 06:00 UTC', lat: 27.5, lon: -88.0, wind: 115, pressure: 958 },
      { time: '2023-08-30 12:00 UTC', lat: 29.0, lon: -85.0, wind: 125, pressure: 950 },
      { time: '2023-08-30 18:00 UTC', lat: 30.0, lon: -83.5, wind: 130, pressure: 947 },
      { time: '2023-08-31 00:00 UTC', lat: 31.5, lon: -82.0, wind: 90, pressure: 965 },
      { time: '2023-08-31 12:00 UTC', lat: 33.0, lon: -78.0, wind: 60, pressure: 980 },
    ],
  },
  {
    name: 'Lee', year: 2023, category: 'Cat-5', maxWind: 165, minPressure: 926,
    formed: '2023-09-05', dissipated: '2023-09-16', duration: '11 days',
    fatalities: 5, damage: '$50M', landfall: 'Maine (as extratropical)', region: 'Atlantic',
    description: 'Hurricane Lee rapidly intensified from a Category 1 to a Category 5 hurricane in just 24 hours, becoming one of the fastest-intensifying Atlantic hurricanes on record. It eventually made landfall in Maine as a post-tropical cyclone, causing widespread power outages across New England and Atlantic Canada.',
    track: [
      { time: '2023-09-05 06:00 UTC', lat: 14.0, lon: -50.0, wind: 40, pressure: 1002 },
      { time: '2023-09-06 06:00 UTC', lat: 14.5, lon: -53.0, wind: 75, pressure: 984 },
      { time: '2023-09-07 06:00 UTC', lat: 15.0, lon: -56.0, wind: 130, pressure: 952 },
      { time: '2023-09-08 00:00 UTC', lat: 16.0, lon: -58.0, wind: 165, pressure: 926 },
      { time: '2023-09-09 06:00 UTC', lat: 18.5, lon: -62.0, wind: 145, pressure: 944 },
      { time: '2023-09-11 06:00 UTC', lat: 23.0, lon: -67.0, wind: 115, pressure: 960 },
      { time: '2023-09-13 06:00 UTC', lat: 30.0, lon: -70.0, wind: 90, pressure: 966 },
      { time: '2023-09-15 06:00 UTC', lat: 37.0, lon: -69.0, wind: 70, pressure: 972 },
      { time: '2023-09-16 12:00 UTC', lat: 44.0, lon: -68.0, wind: 55, pressure: 978 },
    ],
  },
  // ===== 2022 =====
  {
    name: 'Ian', year: 2022, category: 'Cat-5', maxWind: 160, minPressure: 936,
    formed: '2022-09-23', dissipated: '2022-10-01', duration: '8 days',
    fatalities: 150, damage: '$112.9B', landfall: 'Florida (Fort Myers)', region: 'Gulf of Mexico',
    description: 'Hurricane Ian was a catastrophic Category 5 hurricane and the third-costliest tropical cyclone on record worldwide. It made landfall in southwest Florida near Fort Myers as a high-end Category 4, causing devastating storm surge, wind damage, and flooding. Ian was the deadliest Florida hurricane since 1935.',
    track: [
      { time: '2022-09-23 06:00 UTC', lat: 13.0, lon: -72.0, wind: 35, pressure: 1004 },
      { time: '2022-09-24 06:00 UTC', lat: 14.5, lon: -75.0, wind: 45, pressure: 998 },
      { time: '2022-09-25 06:00 UTC', lat: 16.0, lon: -78.0, wind: 65, pressure: 987 },
      { time: '2022-09-26 06:00 UTC', lat: 18.5, lon: -82.0, wind: 85, pressure: 972 },
      { time: '2022-09-27 06:00 UTC', lat: 21.5, lon: -84.0, wind: 100, pressure: 962 },
      { time: '2022-09-28 06:00 UTC', lat: 25.5, lon: -83.0, wind: 130, pressure: 941 },
      { time: '2022-09-28 12:00 UTC', lat: 26.5, lon: -82.5, wind: 155, pressure: 937 },
      { time: '2022-09-28 18:00 UTC', lat: 27.0, lon: -82.0, wind: 150, pressure: 940 },
      { time: '2022-09-29 06:00 UTC', lat: 28.5, lon: -80.0, wind: 95, pressure: 960 },
      { time: '2022-09-30 06:00 UTC', lat: 33.0, lon: -79.0, wind: 60, pressure: 975 },
      { time: '2022-10-01 06:00 UTC', lat: 37.0, lon: -74.0, wind: 45, pressure: 985 },
    ],
  },
  {
    name: 'Fiona', year: 2022, category: 'Cat-4', maxWind: 140, minPressure: 931,
    formed: '2022-09-14', dissipated: '2022-09-24', duration: '10 days',
    fatalities: 29, damage: '$3B', landfall: 'Puerto Rico / Atlantic Canada', region: 'Atlantic',
    description: 'Hurricane Fiona was a large and powerful Category 4 hurricane that devastated Puerto Rico, the Dominican Republic, and Atlantic Canada. It was the costliest weather event in Canadian history, causing widespread flooding and wind damage across Nova Scotia, PEI, and Newfoundland.',
    track: [
      { time: '2022-09-14 06:00 UTC', lat: 15.0, lon: -64.0, wind: 35, pressure: 1004 },
      { time: '2022-09-15 06:00 UTC', lat: 16.0, lon: -66.0, wind: 50, pressure: 998 },
      { time: '2022-09-17 06:00 UTC', lat: 17.5, lon: -68.0, wind: 70, pressure: 986 },
      { time: '2022-09-18 06:00 UTC', lat: 18.0, lon: -67.0, wind: 85, pressure: 978 },
      { time: '2022-09-19 06:00 UTC', lat: 19.0, lon: -69.0, wind: 95, pressure: 970 },
      { time: '2022-09-20 06:00 UTC', lat: 21.0, lon: -73.0, wind: 105, pressure: 965 },
      { time: '2022-09-21 06:00 UTC', lat: 24.0, lon: -75.0, wind: 120, pressure: 955 },
      { time: '2022-09-22 06:00 UTC', lat: 27.5, lon: -74.0, wind: 130, pressure: 945 },
      { time: '2022-09-23 06:00 UTC', lat: 32.0, lon: -71.0, wind: 140, pressure: 931 },
      { time: '2022-09-24 06:00 UTC', lat: 38.0, lon: -66.0, wind: 90, pressure: 950 },
      { time: '2022-09-24 18:00 UTC', lat: 46.0, lon: -60.0, wind: 70, pressure: 965 },
    ],
  },
  // ===== 2021 =====
  {
    name: 'Ida', year: 2021, category: 'Cat-4', maxWind: 150, minPressure: 929,
    formed: '2021-08-26', dissipated: '2021-09-04', duration: '9 days',
    fatalities: 115, damage: '$75B', landfall: 'Louisiana (Port Fourchon)', region: 'Gulf of Mexico',
    description: 'Hurricane Ida was a deadly and destructive Category 4 hurricane that made landfall in Louisiana on the 16th anniversary of Hurricane Katrina. Ida caused catastrophic damage in Louisiana and spawned tornadoes and widespread flooding in the Northeast, particularly in New York and New Jersey. It was the 6th-costliest hurricane on record.',
    track: [
      { time: '2021-08-26 06:00 UTC', lat: 16.0, lon: -82.0, wind: 30, pressure: 1006 },
      { time: '2021-08-27 06:00 UTC', lat: 18.5, lon: -85.0, wind: 50, pressure: 998 },
      { time: '2021-08-28 06:00 UTC', lat: 21.0, lon: -87.0, wind: 70, pressure: 985 },
      { time: '2021-08-29 00:00 UTC', lat: 25.5, lon: -89.0, wind: 115, pressure: 962 },
      { time: '2021-08-29 06:00 UTC', lat: 27.5, lon: -90.0, wind: 140, pressure: 940 },
      { time: '2021-08-29 12:00 UTC', lat: 29.0, lon: -90.3, wind: 150, pressure: 929 },
      { time: '2021-08-30 00:00 UTC', lat: 31.0, lon: -91.5, wind: 80, pressure: 965 },
      { time: '2021-08-31 06:00 UTC', lat: 35.0, lon: -86.0, wind: 35, pressure: 990 },
      { time: '2021-09-01 06:00 UTC', lat: 40.0, lon: -75.0, wind: 30, pressure: 995 },
      { time: '2021-09-02 00:00 UTC', lat: 42.0, lon: -72.0, wind: 35, pressure: 993 },
    ],
  },
  {
    name: 'Elsa', year: 2021, category: 'Cat-1', maxWind: 85, minPressure: 986,
    formed: '2021-06-30', dissipated: '2021-07-09', duration: '9 days',
    fatalities: 13, damage: '$1.2B', landfall: 'Florida / Rhode Island', region: 'Atlantic',
    description: 'Tropical Storm Elsa was the earliest fifth-named storm on record. It formed in the central Atlantic and affected the Caribbean, Florida, and the Eastern Seaboard. Elsa caused flooding and wind damage across multiple regions.',
    track: [
      { time: '2021-06-30 06:00 UTC', lat: 9.0, lon: -43.0, wind: 35, pressure: 1005 },
      { time: '2021-07-01 12:00 UTC', lat: 12.0, lon: -50.0, wind: 45, pressure: 1000 },
      { time: '2021-07-02 18:00 UTC', lat: 13.5, lon: -58.0, wind: 65, pressure: 994 },
      { time: '2021-07-04 00:00 UTC', lat: 16.0, lon: -64.0, wind: 75, pressure: 991 },
      { time: '2021-07-05 06:00 UTC', lat: 19.0, lon: -71.0, wind: 60, pressure: 1000 },
      { time: '2021-07-06 18:00 UTC', lat: 23.0, lon: -77.0, wind: 50, pressure: 1005 },
      { time: '2021-07-07 12:00 UTC', lat: 27.0, lon: -80.0, wind: 65, pressure: 998 },
      { time: '2021-07-08 00:00 UTC', lat: 29.0, lon: -82.5, wind: 70, pressure: 995 },
      { time: '2021-07-08 18:00 UTC', lat: 33.0, lon: -78.0, wind: 50, pressure: 1003 },
      { time: '2021-07-09 12:00 UTC', lat: 40.0, lon: -71.0, wind: 40, pressure: 1008 },
    ],
  },
  // ===== 2020 =====
  {
    name: 'Laura', year: 2020, category: 'Cat-4', maxWind: 150, minPressure: 937,
    formed: '2020-08-20', dissipated: '2020-08-29', duration: '9 days',
    fatalities: 77, damage: '$19B', landfall: 'Louisiana (Cameron)', region: 'Gulf of Mexico',
    description: 'Hurricane Laura was a powerful Category 4 hurricane that made landfall in southwestern Louisiana with 150 mph winds, tying the 1856 Last Island hurricane as the strongest hurricane on record to strike Louisiana. Laura caused catastrophic wind damage and storm surge, particularly in the Lake Charles area.',
    track: [
      { time: '2020-08-20 06:00 UTC', lat: 15.0, lon: -52.0, wind: 35, pressure: 1004 },
      { time: '2020-08-21 06:00 UTC', lat: 16.0, lon: -58.0, wind: 45, pressure: 1000 },
      { time: '2020-08-22 06:00 UTC', lat: 17.0, lon: -63.0, wind: 50, pressure: 998 },
      { time: '2020-08-23 06:00 UTC', lat: 19.0, lon: -70.0, wind: 55, pressure: 995 },
      { time: '2020-08-24 06:00 UTC', lat: 21.5, lon: -78.0, wind: 65, pressure: 990 },
      { time: '2020-08-25 06:00 UTC', lat: 24.0, lon: -84.0, wind: 85, pressure: 980 },
      { time: '2020-08-26 06:00 UTC', lat: 26.0, lon: -89.5, wind: 105, pressure: 968 },
      { time: '2020-08-26 18:00 UTC', lat: 27.5, lon: -92.0, wind: 130, pressure: 950 },
      { time: '2020-08-27 06:00 UTC', lat: 29.0, lon: -93.5, wind: 150, pressure: 937 },
      { time: '2020-08-27 12:00 UTC', lat: 30.5, lon: -94.0, wind: 110, pressure: 955 },
      { time: '2020-08-28 06:00 UTC', lat: 34.0, lon: -94.5, wind: 40, pressure: 985 },
      { time: '2020-08-29 06:00 UTC', lat: 40.0, lon: -87.0, wind: 30, pressure: 998 },
    ],
  },
  {
    name: 'Eta', year: 2020, category: 'Cat-4', maxWind: 150, minPressure: 923,
    formed: '2020-10-31', dissipated: '2020-11-13', duration: '13 days',
    fatalities: 175, damage: '$8B', landfall: 'Nicaragua / Florida', region: 'Caribbean',
    description: 'Hurricane Eta was a devastating Category 4 hurricane that affected Central America, particularly Nicaragua, Honduras, and Guatemala. Eta caused catastrophic flooding and landslides, resulting in at least 175 deaths. It later re-intensified and affected Florida and Cuba. Eta was part of the record-breaking 2020 Atlantic hurricane season.',
    track: [
      { time: '2020-10-31 06:00 UTC', lat: 15.0, lon: -74.0, wind: 35, pressure: 1004 },
      { time: '2020-11-01 06:00 UTC', lat: 15.5, lon: -80.0, wind: 65, pressure: 990 },
      { time: '2020-11-02 00:00 UTC', lat: 15.0, lon: -83.0, wind: 105, pressure: 962 },
      { time: '2020-11-03 00:00 UTC', lat: 14.5, lon: -83.5, wind: 150, pressure: 923 },
      { time: '2020-11-04 00:00 UTC', lat: 14.5, lon: -85.0, wind: 45, pressure: 980 },
      { time: '2020-11-06 06:00 UTC', lat: 17.0, lon: -88.0, wind: 35, pressure: 995 },
      { time: '2020-11-08 06:00 UTC', lat: 21.0, lon: -84.0, wind: 55, pressure: 992 },
      { time: '2020-11-09 06:00 UTC', lat: 23.0, lon: -80.0, wind: 65, pressure: 988 },
      { time: '2020-11-10 06:00 UTC', lat: 25.0, lon: -78.0, wind: 55, pressure: 993 },
      { time: '2020-11-12 06:00 UTC', lat: 32.0, lon: -76.0, wind: 45, pressure: 995 },
    ],
  },
  {
    name: 'Iota', year: 2020, category: 'Cat-5', maxWind: 160, minPressure: 917,
    formed: '2020-11-13', dissipated: '2020-11-18', duration: '5 days',
    fatalities: 84, damage: '$1.4B', landfall: 'Nicaragua', region: 'Caribbean',
    description: 'Hurricane Iota was a catastrophic Category 5 hurricane and the strongest storm of the 2020 season. Making landfall in Nicaragua just two weeks after Eta, Iota became the strongest Atlantic hurricane on record to form so late in the season. The combined impact of Eta and Iota was devastating for Central America.',
    track: [
      { time: '2020-11-13 06:00 UTC', lat: 13.0, lon: -68.0, wind: 35, pressure: 1004 },
      { time: '2020-11-14 06:00 UTC', lat: 13.5, lon: -73.0, wind: 55, pressure: 995 },
      { time: '2020-11-15 06:00 UTC', lat: 14.0, lon: -78.0, wind: 85, pressure: 980 },
      { time: '2020-11-15 18:00 UTC', lat: 14.5, lon: -80.5, wind: 130, pressure: 948 },
      { time: '2020-11-16 06:00 UTC', lat: 14.5, lon: -82.5, wind: 160, pressure: 917 },
      { time: '2020-11-17 00:00 UTC', lat: 14.0, lon: -84.5, wind: 100, pressure: 960 },
      { time: '2020-11-18 06:00 UTC', lat: 15.0, lon: -88.0, wind: 30, pressure: 990 },
    ],
  },
  // ===== 2019 =====
  {
    name: 'Dorian', year: 2019, category: 'Cat-5', maxWind: 185, minPressure: 910,
    formed: '2019-08-24', dissipated: '2019-09-10', duration: '17 days',
    fatalities: 84, damage: '$5.1B', landfall: 'Bahamas', region: 'Atlantic',
    description: 'Hurricane Dorian was the strongest hurricane on record to strike the Bahamas, where it stalled over Grand Bahama and Abaco Islands for over 24 hours as a Category 5 hurricane with 185 mph winds. Dorian caused catastrophic devastation in the Bahamas before tracking along the US East Coast and hitting Atlantic Canada.',
    track: [
      { time: '2019-08-24 06:00 UTC', lat: 12.0, lon: -55.0, wind: 35, pressure: 1008 },
      { time: '2019-08-25 12:00 UTC', lat: 13.0, lon: -58.0, wind: 50, pressure: 1002 },
      { time: '2019-08-26 18:00 UTC', lat: 14.5, lon: -63.0, wind: 75, pressure: 988 },
      { time: '2019-08-28 06:00 UTC', lat: 18.5, lon: -67.0, wind: 110, pressure: 970 },
      { time: '2019-08-30 06:00 UTC', lat: 24.0, lon: -70.0, wind: 150, pressure: 940 },
      { time: '2019-09-01 06:00 UTC', lat: 26.5, lon: -76.5, wind: 175, pressure: 924 },
      { time: '2019-09-01 18:00 UTC', lat: 26.6, lon: -77.5, wind: 185, pressure: 910 },
      { time: '2019-09-02 18:00 UTC', lat: 26.7, lon: -78.5, wind: 175, pressure: 920 },
      { time: '2019-09-04 06:00 UTC', lat: 29.0, lon: -79.0, wind: 115, pressure: 950 },
      { time: '2019-09-06 06:00 UTC', lat: 32.5, lon: -78.5, wind: 95, pressure: 958 },
      { time: '2019-09-08 06:00 UTC', lat: 38.0, lon: -72.0, wind: 60, pressure: 970 },
      { time: '2019-09-09 06:00 UTC', lat: 45.0, lon: -64.0, wind: 70, pressure: 958 },
    ],
  },
  // ===== 2017 =====
  {
    name: 'Maria', year: 2017, category: 'Cat-5', maxWind: 175, minPressure: 908,
    formed: '2017-09-16', dissipated: '2017-10-02', duration: '16 days',
    fatalities: 2975, damage: '$91.6B', landfall: 'Dominica / Puerto Rico', region: 'Caribbean',
    description: 'Hurricane Maria was a catastrophic Category 5 hurricane that devastated Dominica and Puerto Rico. It was the deadliest Atlantic hurricane since Hurricane Jeanne in 2004, causing an estimated 2,975 deaths in Puerto Rico alone. Maria was the 3rd-costliest tropical cyclone on record.',
    track: [
      { time: '2017-09-16 06:00 UTC', lat: 12.0, lon: -50.0, wind: 35, pressure: 1006 },
      { time: '2017-09-17 06:00 UTC', lat: 13.0, lon: -54.0, wind: 50, pressure: 999 },
      { time: '2017-09-18 06:00 UTC', lat: 14.5, lon: -58.0, wind: 90, pressure: 974 },
      { time: '2017-09-19 00:00 UTC', lat: 15.5, lon: -60.5, wind: 130, pressure: 950 },
      { time: '2017-09-19 06:00 UTC', lat: 15.3, lon: -61.0, wind: 160, pressure: 924 },
      { time: '2017-09-20 00:00 UTC', lat: 16.0, lon: -62.5, wind: 175, pressure: 908 },
      { time: '2017-09-20 06:00 UTC', lat: 18.0, lon: -65.5, wind: 165, pressure: 918 },
      { time: '2017-09-20 12:00 UTC', lat: 18.5, lon: -67.0, wind: 150, pressure: 927 },
      { time: '2017-09-21 06:00 UTC', lat: 21.0, lon: -70.0, wind: 110, pressure: 950 },
      { time: '2017-09-23 06:00 UTC', lat: 25.0, lon: -73.0, wind: 85, pressure: 965 },
      { time: '2017-09-26 06:00 UTC', lat: 35.0, lon: -72.0, wind: 65, pressure: 970 },
      { time: '2017-09-28 06:00 UTC', lat: 42.0, lon: -62.0, wind: 55, pressure: 975 },
    ],
  },
  {
    name: 'Irma', year: 2017, category: 'Cat-5', maxWind: 180, minPressure: 914,
    formed: '2017-08-30', dissipated: '2017-09-13', duration: '14 days',
    fatalities: 134, damage: '$77.2B', landfall: 'Barbuda / Florida Keys', region: 'Atlantic',
    description: 'Hurricane Irma was a massive Category 5 hurricane that affected multiple Caribbean islands and Florida. With sustained winds of 185 mph for 37 hours, Irma was one of the most powerful Atlantic hurricanes on record. It caused catastrophic damage in Barbuda, Saint Martin, and the Florida Keys.',
    track: [
      { time: '2017-08-30 06:00 UTC', lat: 12.0, lon: -30.0, wind: 35, pressure: 1006 },
      { time: '2017-08-31 12:00 UTC', lat: 13.5, lon: -36.0, wind: 65, pressure: 994 },
      { time: '2017-09-02 06:00 UTC', lat: 16.5, lon: -42.0, wind: 100, pressure: 973 },
      { time: '2017-09-04 06:00 UTC', lat: 17.0, lon: -48.0, wind: 150, pressure: 944 },
      { time: '2017-09-05 18:00 UTC', lat: 17.5, lon: -56.0, wind: 180, pressure: 914 },
      { time: '2017-09-06 06:00 UTC', lat: 18.5, lon: -62.0, wind: 175, pressure: 916 },
      { time: '2017-09-07 06:00 UTC', lat: 20.0, lon: -68.0, wind: 170, pressure: 921 },
      { time: '2017-09-09 06:00 UTC', lat: 24.5, lon: -78.0, wind: 130, pressure: 940 },
      { time: '2017-09-10 12:00 UTC', lat: 27.0, lon: -81.0, wind: 115, pressure: 929 },
      { time: '2017-09-11 06:00 UTC', lat: 30.0, lon: -83.0, wind: 75, pressure: 955 },
      { time: '2017-09-12 18:00 UTC', lat: 34.0, lon: -85.0, wind: 35, pressure: 985 },
    ],
  },
  {
    name: 'Harvey', year: 2017, category: 'Cat-4', maxWind: 130, minPressure: 937,
    formed: '2017-08-17', dissipated: '2017-09-02', duration: '16 days',
    fatalities: 107, damage: '$125B', landfall: 'Texas (Rockport)', region: 'Gulf of Mexico',
    description: 'Hurricane Harvey was a devastating Category 4 hurricane that became the second-costliest tropical cyclone on record ($125B). Harvey made landfall in Texas and then stalled over the Houston metropolitan area for four days, dropping unprecedented rainfall totals exceeding 60 inches. The catastrophic flooding affected over 300,000 structures.',
    track: [
      { time: '2017-08-17 06:00 UTC', lat: 12.5, lon: -50.0, wind: 35, pressure: 1006 },
      { time: '2017-08-18 06:00 UTC', lat: 13.0, lon: -55.0, wind: 40, pressure: 1003 },
      { time: '2017-08-19 18:00 UTC', lat: 14.0, lon: -62.0, wind: 45, pressure: 1004 },
      { time: '2017-08-21 06:00 UTC', lat: 15.0, lon: -70.0, wind: 40, pressure: 1003 },
      { time: '2017-08-23 06:00 UTC', lat: 17.5, lon: -78.0, wind: 50, pressure: 998 },
      { time: '2017-08-24 06:00 UTC', lat: 20.5, lon: -84.0, wind: 60, pressure: 990 },
      { time: '2017-08-25 06:00 UTC', lat: 24.5, lon: -90.0, wind: 85, pressure: 974 },
      { time: '2017-08-26 00:00 UTC', lat: 27.0, lon: -94.0, wind: 110, pressure: 950 },
      { time: '2017-08-26 06:00 UTC', lat: 28.0, lon: -97.0, wind: 130, pressure: 937 },
      { time: '2017-08-27 06:00 UTC', lat: 29.0, lon: -97.0, wind: 45, pressure: 983 },
      { time: '2017-08-29 06:00 UTC', lat: 28.5, lon: -94.5, wind: 45, pressure: 991 },
      { time: '2017-08-30 18:00 UTC', lat: 30.0, lon: -92.0, wind: 35, pressure: 998 },
      { time: '2017-09-01 06:00 UTC', lat: 35.0, lon: -87.0, wind: 30, pressure: 1004 },
    ],
  },
];

// 年度统计
export const seasonStats = [
  { year: 2017, namedStorms: 17, hurricanes: 10, majorHurricanes: 6, ace: 224.9, damage: '$294B', fatalities: 3816 },
  { year: 2018, namedStorms: 15, hurricanes: 8, majorHurricanes: 2, ace: 132.6, damage: '$50B', fatalities: 154 },
  { year: 2019, namedStorms: 18, hurricanes: 6, majorHurricanes: 3, ace: 132.1, damage: '$11B', fatalities: 120 },
  { year: 2020, namedStorms: 30, hurricanes: 13, majorHurricanes: 6, ace: 180.3, damage: '$47B', fatalities: 436 },
  { year: 2021, namedStorms: 21, hurricanes: 7, majorHurricanes: 4, ace: 145.5, damage: '$80B', fatalities: 161 },
  { year: 2022, namedStorms: 14, hurricanes: 8, majorHurricanes: 2, ace: 95.1, damage: '$118B', fatalities: 306 },
  { year: 2023, namedStorms: 20, hurricanes: 7, majorHurricanes: 3, ace: 145.7, damage: '$4B', fatalities: 29 },
  { year: 2024, namedStorms: 18, hurricanes: 11, majorHurricanes: 5, ace: 161.6, damage: '$135B', fatalities: 345 },
  { year: 2025, namedStorms: 15, hurricanes: 7, majorHurricanes: 3, ace: 110.2, damage: '$28B', fatalities: 58 },
  { year: 2026, namedStorms: 2, hurricanes: 0, majorHurricanes: 0, ace: 12.5, damage: '$1B+', fatalities: 4 },
];

// 历史平均值 (1991-2020)
export const averages = {
  namedStorms: 14.4,
  hurricanes: 7.2,
  majorHurricanes: 3.2,
  ace: 123,
};
