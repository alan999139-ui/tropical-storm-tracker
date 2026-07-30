import { defineConfig } from 'astro/config';

// https://astro.build
// Cloudflare Pages 部署：static 站点 + functions/ 目录的 Pages Functions
// functions/api/storms.js 作为边缘 API 运行，客户端 JS 调用它获取实时 NOAA 数据
export default defineConfig({
  site: 'https://tropicalstormtracker.quest',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
