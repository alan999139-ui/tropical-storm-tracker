# Japanese Locale Pages — Task Summary

**Project:** StormTracker  
**Date:** 2026-07-27  
**Task:** Create 6 complete Japanese (ja) locale pages

## Files Created

| File | Description | Build Status |
|------|-------------|-------------|
| `src/pages/ja/index.astro` | Homepage — hero, active storms, season outlook, CTA | ✅ Built |
| `src/pages/ja/storms.astro` | Storm database with charts and filterable table | ✅ Built |
| `src/pages/ja/map.astro` | Global live storm map with basin filter | ✅ Built |
| `src/pages/ja/preparedness.astro` | Preparedness guide with FAQ, checklists | ✅ Built |
| `src/pages/ja/about.astro` | About page with mission and data sources | ✅ Built |
| `src/pages/ja/storms/[name].astro` | Dynamic storm detail pages (18 pages generated) | ✅ Built |

## Output
- `dist/ja/` — 6 pages + 18 storm detail pages
- Total: 97 pages built, sitemap written (118 URLs)

## Key Implementation Notes

### Import paths
- `src/pages/ja/*.astro` → `../../layouts/BaseLayout.astro` (2 levels up)
- `src/pages/ja/storms/[name].astro` → `../../../layouts/BaseLayout.astro` (3 levels up)

### i18n
- All pages use `import { t } from '../../i18n/dict'` (or `../../../...`)
- All visible text uses `t('key', 'ja')`
- All dict keys for ja already exist in `src/i18n/dict.ts`

### Data fields
- Historical storms use `s.windMph` and `s.pressureMb` (not `.wind` / `.pressure`)
- Storm names stay in English (official HURDAT2 names)
- `getStaticPaths()` unchanged — same historicalStorms data as EN page

### Japanese-specific
- `lang="ja"` in `<BaseLayout>`
- Status messages: "データソースに接続中..." / "リアルタイム" / "☀️ 活発な暴風なし" / "⚠️ リアルタイムデータソースに接続不可"
- Data source footer lists agencies in Japanese (JMA = 気象庁, BOM = オーストラリア気象局, IMD = IMD, Météo-France = フランス気象局, FMS = フィジー気象サービス)

## Build Fixes
1. `[name].astro` had wrong import depth — fixed from `../../layouts` → `../../../layouts`
2. `[name].astro` had wrong i18n/dict import depth — fixed from `../../i18n/dict` → `../../../i18n/dict`

## Verification
- `npm run build` — clean build, 97 pages
- No `undefined` values in built HTML
- All 6 routes + all 18 storm detail routes present in `dist/ja/`
