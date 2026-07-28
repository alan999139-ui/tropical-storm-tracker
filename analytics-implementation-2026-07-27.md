# 数据验证系统实施方案 A — 2026-07-27

## 已完成功能

### 1. Google Analytics 4 集成

**文件：** `src/layouts/BaseLayout.astro`

**功能：**
- GA4 测量 ID 占位符（`GA_MEASUREMENT_ID`）- 待你替换真实 ID
- 自动检测：只有配置了真实 ID 才会加载 GA4
- 语言感知追踪：`page_language` 参数自动设置
- 页面视图自动追踪

**待做：**
1. 去 [Google Analytics](https://analytics.google.com) 创建 GA4 账号
2. 获取测量 ID（格式：`G-XXXXXXXX`）
3. 在 `src/layouts/BaseLayout.astro` 第 20 行替换：
   ```javascript
   const GA4_ID = 'G-XXXXXXXX';  // 你的真实测量 ID
   ```

### 2. 事件追踪系统

**全局辅助函数：** `window.trackEvent(eventName, eventParams)`

#### 通用事件

| 事件名称 | 触发时机 | 参数 |
|---------|---------|------|
| `language_switch` | 用户切换语言 | `from_language`, `to_language`, `page_path` |
| `hero_cta_click` | 首页 Hero 按钮点击 | `button`, `page_section`, `language`, `ab_variant` |
| `pricing_cta_click` | 定价预览按钮点击 | `button`, `page_section`, `language`, `plan` |
| `social_share` | 社交分享按钮点击 | `platform`, `page_type`, `language` |

#### 地图交互事件（新增）

| 事件名称 | 触发时机 | 参数 | 分析价值 |
|---------|---------|------|---------|
| `map_loaded` | 地图初始化完成 | `initial_zoom`, `initial_center`, `page_language` | 地图使用率 |
| `map_filter_basin` | 流域筛选按钮点击 | `basin_id`, `basin_name`, `page_language` | **用户最关心哪个地区** |
| `map_zoom` | 地图缩放 | `zoom_level`, `view_type`, `page_language` | 用户探索深度 |
| `map_pan` | 地图平移（2秒防抖） | `center_lat`, `center_lon`, `zoom_level`, `page_language` | 关注区域定位 |
| `map_marker_click` | 风暴标记点击 | `storm_name`, `basin_id`, `wind_mph`, `agency`, `page_language` | **风暴兴趣热点** |

**使用示例：**
```javascript
// 任意页面都可以调用
trackEvent('button_click', {
  button: 'subscribe',
  page_section: 'footer',
  language: 'en'
});
```

### 3. 社交分享按钮

**组件：** `src/components/ShareButtons.astro`

**支持平台：**
- Twitter（自动生成带话题的推文）
- Facebook（分享链接）
- LinkedIn（专业网络分享）
- 复制链接（一键复制到剪贴板）

**多语言支持：**
- 英语：Share / Copy
- 中文：分享 / 复制链接
- 法语：Partager / Copier
- 日语：シェア / コピー

**已集成页面：**
- `/storms/[name]` - 英文版
- `/fr/storms/[name]` - 法语版
- `/ja/storms/[name]` - 日语版

### 4. A/B 测试标记

**首页订阅 CTA：**
```html
<a href="/alerts" onclick="trackEvent(..., {ab_variant: 'control'})">
  Get Free Alerts
</a>
```

**后续 A/B 测试方案：**
- Variant A: "Get Free Alerts" (当前版本)
- Variant B: "Stay Safe - Get Alerts Now"
- Variant C: "⚡ Instant Storm Alerts"

通过 GA4 对比不同文案的点击率。

## 部署状态

- **Commit 1:** `fc23422` - GA4 + 社交分享 + 基础 CTA 追踪
- **Commit 2:** `19405cf` - 地图交互追踪 + 多语言 CTA
- **CI 状态:** ✅ 已推送到 GitHub
- **线上验证:** 等待 Cloudflare Pages 部署完成

**验证清单：**
- [ ] GA4 ID 已配置（需要你去 GA 后台创建）
- [ ] 首页 CTA 点击事件正常
- [ ] 地图筛选/缩放/标记点击事件正常
- [ ] 社交分享按钮显示
- [ ] 语言切换事件正常

## 数据分析建议

### 关键指标（KPI）

| 指标 | 计算方式 | 目标值 | 事件来源 |
|------|---------|--------|----------|
| 语言分布 | 各语言 PV / 总 PV | 了解用户语言偏好 | `page_language` 参数 |
| 地图使用率 | `map_loaded` 事件数 / 总会话数 | >40% | `map_loaded` |
| **流域兴趣** | `map_filter_basin` 按 basin_id 分组统计 | 发现热门地区 | `map_filter_basin` |
| 地图探索深度 | `map_zoom` + `map_pan` 事件数 / 地图会话 | >5次/会话 | `map_zoom`, `map_pan` |
| **风暴关注度** | `map_marker_click` 按 storm_name 分组 | 发现热门风暴 | `map_marker_click` |
| 订阅转化率 | 订阅提交数 / `/alerts` 访问数 | >5% | 后端需补充 |
| 社交分享率 | 分享次数 / 风暴详情页 PV | >2% | `social_share` |
| 多语言用户 | 切换语言次数 / 总会话数 | 了解跨语言需求 | `language_switch` |

### 地图行为分析场景

**场景 1：用户最关心哪个地区？**
```
GA4 报告 → 事件 → map_filter_basin
按 basin_id 统计次数 → 排名前三的流域
```

**预期洞察：**
- 如果 `north_atlantic` 排名第一 → 加强北大西洋风暴报道
- 如果 `western_pacific` 流量高 → 考虑增加日语/中文台风内容
- 如果 `australia` 点击少 → 检查南半球用户是否知道有此功能

**场景 2：用户如何探索地图？**
```
GA4 报告 → 事件 → map_zoom
查看 zoom_level 分布 → 多少用户放大到城市级别（zoom > 8）
```

**预期洞察：**
- 高缩放比例（8+）→ 用户在查具体位置，考虑加城市标注
- 低缩放比例（2-4）→ 全球浏览模式，确保标记清晰可见

**场景 3：哪些风暴最受关注？**
```
GA4 报告 → 事件 → map_marker_click
按 storm_name + basin_id 交叉分析
```

**预期洞察：**
- 发现用户最关心的风暴 → 优先更新详情页
- 发现用户点击但无详情 → 考虑补充历史数据
- 发现某个风暴点击异常少 → 检查标记是否被遮挡

### GA4 报告设置建议

1. **创建自定义报告**
   - 维度：Language / Page Path / Country
   - 指标：Pageviews / Events / Conversions

2. **设置转化事件**
   - `hero_cta_click` (button=get_alerts)
   - `pricing_cta_click` (button=free_trial)
   - `social_share` (任意 platform)

3. **创建受众群体**
   - 英语用户（page_language = en）
   - 高互动用户（地图访问 > 3次/会话）
   - 订阅意向用户（访问 /alerts 页面）

## 下一步行动

### 即刻可做（5分钟）
1. 创建 GA4 账号并替换测量 ID
2. 24小时后查看首次数据

### 本周可做（1-2小时）
1. 设计 A/B 测试文案（3个变体）
2. 给 zh 首页也加事件追踪
3. 添加邮件订阅成功事件追踪

### 下周可做（半天）
1. 设置 GA4 自定义报告和仪表盘
2. 配置 GA4 BigQuery 导出（免费）
3. 分析首批数据，优化转化漏斗

## 技术细节

**GA4 配置位置：**
- `src/layouts/BaseLayout.astro` 第 18-43 行

**事件追踪调用位置：**
- 首页 Hero：`src/pages/index.astro` 第 60-62 行
- 定价预览：`src/pages/index.astro` 第 181-183 行
- 社交分享：`src/components/ShareButtons.astro` 第 28-66 行

**数据流向：**
用户行为 → `trackEvent()` → `gtag('event')` → GA4 服务器 → GA4 报告

## 数据价值总结

### 现在你能回答的问题（部署后立即可用）

**用户是谁：**
- 哪个语言的访客最多？
- 用户来自哪些国家？（GA4 自动收集）
- 多少用户会切换语言？

**用户关心什么：**
- 🔥 **哪个流域最受关注？**（`map_filter_basin` 排名）
- 🔥 **哪个风暴点击最多？**（`map_marker_click` 分组）
- 用户在地图上探索多深？（缩放级别分布）

**用户行为模式：**
- 多少人点进地图页？
- 多少人分享风暴信息？
- CTA 按钮哪个文案更好？

### 商业洞察场景

**场景 1：精准内容投放**
```
发现：北太平洋流域点击占 40%
行动：增加日语/中文台风科普内容
结果：提升东亚用户留存
```

**场景 2：付费转化优化**
```
发现：看地图 → 点标记 → 订阅流失大
行动：在标记弹出框加"订阅此风暴提醒"按钮
结果：缩短转化路径
```

**场景 3：国际化决策**
```
发现：法语用户占比 15% 但无法语订阅页
行动：翻译 alerts 页面为法语
结果：提升法语用户转化
```

### 竞争优势

**vs 竞品：**
- ❌ 大多数风暴网站无行为追踪
- ❌ 不知道用户关心哪个地区
- ❌ 无法优化转化漏斗
- ✅ 你的站点：**数据驱动，持续优化**

---

## 部署状态

- Commit: `fc23422`
- GitHub Actions: 运行中
- 线上验证: 等待 CI 完成

**验证清单：**
- [ ] GA4 ID 已配置
- [ ] 首页 CTA 点击事件正常
- [ ] 社交分享按钮显示
- [ ] 语言切换事件正常
