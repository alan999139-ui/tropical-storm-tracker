# Tropical Storm Tracker 🌪️

实时热带风暴追踪与信息聚合平台，部署于 Cloudflare Pages。

## 技术栈

- **框架**: Astro (静态站点生成，SEO 友好)
- **地图**: Leaflet.js + Mapbox
- **数据源**: NOAA / NHC 公开 API
- **部署**: Cloudflare Pages
- **CDN**: Cloudflare 全球边缘网络

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建
npm run build

# 部署到 Cloudflare Pages
npm run deploy
```

## 项目结构

```
tropical-storm/
├── src/
│   ├── components/     # UI 组件
│   ├── layouts/        # 页面布局
│   ├── pages/          # 路由页面
│   ├── data/           # 数据获取层
│   ├── utils/          # 工具函数
│   └── styles/         # 全局样式
├── public/             # 静态资源
├── astro.config.mjs    # Astro 配置
├── wrangler.toml       # Cloudflare 配置
└── cloudflare.toml     # Pages 构建配置
```

## 数据源

- **NHC (National Hurricane Center)**: 实时风暴数据
  - RSS: https://www.nhc.noaa.gov/index-at.xml
  - GIS: https://www.nhc.noaa.gov/gis/
- **NOAA**: 历史风暴数据库
- **OpenWeather API**: 辅助天气数据

## SEO 策略

- 静态 HTML 输出，SSG 预渲染
- 每个风暴自动生成独立页面
- Schema.org 结构化数据
- 自动 sitemap.xml
- RSS 订阅源

## License

MIT
