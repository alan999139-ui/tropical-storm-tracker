# Tropical Storm 网站开发方案

## 目标
针对高热度搜索词「Tropical Storm」开发一个垂直追踪与信息聚合网站，抢占季节性爆发流量。

## 关键分析

### 搜索热度特征
- 季节性爆发：每年6-11月飓风季搜索量飙升
- 单次风暴事件可带来数百万次搜索
- 大型新闻站占据头部但专注度不够

### 用户搜索意图
1. 当前风暴路径
2. 影响范围
3. 防灾准备
4. 历史数据

## 网站定位
Tropical Storm 实时追踪与信息聚合平台 — 专而深的风暴追踪站

## 功能模块
1. 实时风暴追踪地图（Mapbox/Leaflet + NOAA API）
2. 风暴数据库（历年档案，自动生成长尾SEO页面）
3. 资讯聚合（AI摘要，按地区/风暴名分类）
4. 防灾指南（等级解读、撤离指南、物资清单）
5. 订阅预警（邮件/推送通知）
6. 数据可视化（趋势图、热力图）

## SEO策略
- 主词：tropical storm（首页）
- 长尾：tropical storm + 年份/名称/地区
- 结构化数据：Schema.org Event/Article
- 时效性内容抢Google News
- 多语言（英语+西班牙语）
- FAQ抢Featured Snippet

## 技术架构
- 前端：Next.js + TypeScript + TailwindCSS
- 地图：Mapbox GL JS / Leaflet
- 数据源：NOAA API / NHC RSS / OpenWeather API
- 数据库：PostgreSQL + Redis
- 部署：Vercel / Cloudflare Pages
- 搜索：Algolia 或 Elasticsearch

## 变现路径
1. Google AdSense / 直接广告位
2. 联盟营销（防灾物资、保险推荐）
3. 高级订阅（无广告 + API接口）
4. 数据授权（保险公司、研究机构）

## 启动优先级
- Phase 1（2周）：首页 + 实时地图 + 基础风暴数据库
- Phase 2（4周）：历史数据 + 防灾指南 + SEO基础
- Phase 3（持续）：资讯聚合 + 订阅系统 + 数据可视化

## 竞品参考
- TropiTracker（开源）：github.com/CGray1234/TropiTracker
- NHC（官方）：数据权威体验差
- Windy.com：可视化好但不专注风暴

## 结论
差异化 = 专注度 + 数据深度 + SEO执行力。核心原则：在下一个风暴来临前上线，用实时事件带流量。
