# 中文版页面创建任务

## 目标
在 `src/pages/zh/` 目录下创建4个中文版页面文件，对应英文版页面。

## 完成情况

### 创建的文件

1. **`src/pages/zh/map.astro`** (15,810 bytes)
   - 实时风暴地图页面（中文版）
   - 使用 `import BaseLayout from '../../layouts/BaseLayout.astro'` 和 `import { t } from '../../i18n/dict'`
   - 设置 `lang="zh"`
   - JS 中 `fetchStorms` 逻辑与英文版完全一致
   - 所有显示文本翻译为中文（状态栏、图例、弹窗、侧边栏等）
   - 数据源说明翻译为中文
   - 时间格式化使用 `zh-CN` locale

2. **`src/pages/zh/storms.astro`** (8,750 bytes)
   - 风暴数据库页面（中文版）
   - 2026年真实数据：Arthur (TS) 和 Bertha (TD)
   - 所有表头使用 `t()` 函数翻译
   - 筛选器选项翻译为中文（热带低压、热带风暴、1-5级飓风等）
   - 区域翻译（墨西哥湾、大西洋、加勒比海、太平洋）
   - "个风暴" 代替 "storms found"
   - 风暴详情链接使用 `/zh/storms/` 前缀

3. **`src/pages/zh/preparedness.astro`** (18,282 bytes)
   - 防灾指南页面（中文版）
   - 风暴等级说明翻译（TD到Cat 5）
   - 风暴来临前/期间/过后的检查清单翻译
   - 应急包清单翻译（6个分类卡片）
   - 撤离指南5个步骤翻译
   - FAQ 5条问答翻译
   - FAQ Schema.org 结构化数据翻译为中文

4. **`src/pages/zh/about.astro`** (2,899 bytes)
   - 关于页面（中文版）
   - 使命、数据来源、免责声明、技术、联系方式全部翻译

### 规则遵守

- ✅ 所有文件 import 路径使用 `../../` 相对路径
- ✅ 所有文件使用 `t('key', 'zh')` 翻译函数
- ✅ 所有文件设置 `lang="zh"` 传给 BaseLayout
- ✅ 所有内部链接使用 `/zh/` 前缀
- ✅ 样式从英文版完整复制
- ✅ JS 逻辑与英文版保持一致

## 关键决策
- Bertha 的 damage 字段翻译为"待定"（对应英文版"TBD"）
- Arthur 的 damage 字段翻译为"$10亿"（对应英文版"$1B"）
- `getStormType()` 函数中的类型名称翻译为中文（热带低压/热带风暴/飓风）
- 时间格式化从 `en-US` 改为 `zh-CN`
- FAQ Schema.org 结构化数据也翻译为中文以保持 SEO 一致性
