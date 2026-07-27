# 用户系统与商业化页面部署记录

**日期：** 2026-07-26
**项目：** Tropical Storm Tracker (tropicalstormtracker.quest)

## 目标

为静态风暴追踪网站增加用户注册登录系统和付费订阅功能，提升不同国家/身份用户的注册转化和付费意愿。

## 新增页面（5个）

| 页面 | 路径 | 功能 |
|------|------|------|
| Alerts | `/alerts/` | 风暴预警订阅页，免费邮件通知 + 高级预警升级 CTA |
| Pricing | `/pricing/` | 三档定价对比：Free / Pro $4.99/月 / Premium $9.99/月 |
| Sign In | `/signin/` | 登录页，支持邮箱密码 + Google/GitHub OAuth |
| Sign Up | `/signup/` | 注册页，同上社交登录 |
| Dashboard | `/dashboard/` | 用户仪表盘：区域管理、告警历史、活跃风暴、账户设置、Pro 功能预览 |

## 新增 API

- `functions/api/subscribe.js` — Cloudflare Pages Function，处理邮件订阅 POST 请求，支持 KV 存储

## 修改的文件

- `src/layouts/BaseLayout.astro` — 导航栏增加 Sign In / Get Started 按钮，登录后显示 Dashboard 入口；页脚增加 Account 列；添加客户端 auth 状态检测脚本
- `src/pages/index.astro` — 首页 hero CTA 改为 "Get Free Alerts"；底部新增 Pricing Teaser 区块
- `src/i18n/dict.ts` — 新增 nav.alerts/signIn/signUp、footer.account、dashboard.* 等多语种键值
- `scripts/generateSitemap.mjs` — 新增 10 个 URL 到 sitemap

## 技术方案

- **认证：** localStorage 客户端模拟（后续可升级为 Cloudflare Workers + OAuth）
- **订阅存储：** Cloudflare KV（Pages Function 环境）
- **支付：** 定价页展示方案，支付集成待后端实现

## 部署状态

- Git commit: `b70e6bc`
- GitHub Actions: Run completed/success
- 所有 5 个新页面返回 HTTP 200
- 线上地址: https://tropicalstormtracker.quest/

## 待办

- [ ] 创建中文版页面 (`src/pages/zh/alerts.astro` 等)
- [ ] 实现真实 OAuth 认证后端
- [ ] 集成支付处理器（Stripe / Cloudflare Billing）
- [ ] 实现邮件预警发送逻辑
- [ ] Dashboard 页面接入真实用户数据
