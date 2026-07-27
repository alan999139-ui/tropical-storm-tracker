#!/usr/bin/env node
/**
 * scripts/fetchGlobal.mjs
 * 构建时运行：从 NOAA NHC + 美军 JTWC 聚合全球热带气旋实时数据，
 * 用 Zod 校验后输出到 src/data/active.json。
 *
 * 运行：node scripts/fetchGlobal.mjs
 * 在 package.json 的 prebuild 钩子中调用（取代原 fetchNOAA.mjs）。
 *
 * 若全部源不可用且无缓存 → 退出码 1（中止构建）。
 * 若部分源失败 → 写出可用数据并标记 degraded。
 * 若返回“无活跃风暴” → 正常写入 0 个风暴，构建继续。
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { z } from 'zod';
import { fetchAndAggregate } from '../functions/api/_aggregator.js';

const OUTPUT_PATH = './src/data/active.json';

const StormSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  designation: z.string().optional(),
  type: z.string(),
  category: z.number(),
  windMph: z.number().int().min(0),
  pressureMb: z.number().int().min(0),
  lat: z.number(),
  lon: z.number(),
  movement: z.string(),
  status: z.string(),
  basin: z.string(),
  basinName: z.string(),
  agency: z.string(),
  source: z.string(),
  warningUrl: z.string(),
  issuedAt: z.string(),
}).passthrough();

async function main() {
  const log = (...args) => console.log(`[${new Date().toISOString()}]`, ...args);
  log('Aggregating global tropical cyclone data (NHC + JTWC)...');

  let data;
  try {
    data = await fetchAndAggregate();
  } catch (err) {
    log(`❌ Aggregation failed: ${err.message}`);
    if (existsSync(OUTPUT_PATH)) {
      log('⚠️  Falling back to cached active.json...');
      const cached = JSON.parse(readFileSync(OUTPUT_PATH, 'utf8'));
      cached._fallback = true;
      cached._error = err.message;
      writeFileSync(OUTPUT_PATH, JSON.stringify(cached, null, 2), 'utf8');
      process.exit(0);
    }
    log('❌ No cached data. Aborting build.');
    process.exit(1);
  }

  // 校验
  const validated = [];
  let failed = 0;
  for (const s of data.storms) {
    const r = StormSchema.safeParse(s);
    if (r.success) validated.push(r.data);
    else { failed++; log(`  ⚠️  "${s.name}": ${r.error.errors.map(e => e.path.join('.') + '=' + e.message).join('; ')}`); }
  }
  if (failed > 0) log(`⚠️  ${failed}/${data.storms.length} failed validation.`);

  // 过滤无效坐标
  const final = validated.filter(s => !(s.lat === 0 && s.lon === 0));

  const result = {
    source: data.source,
    global: true,
    fetchedAt: data.fetchedAt,
    activeStorms: final.length,
    basins: data.basins,
    sources: data.sources,
    degraded: !!data.errors,
    errors: data.errors,
    storms: final,
    _buildTime: new Date().toISOString(),
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2), 'utf8');
  log(`✅ Wrote ${final.length} storm(s) across ${Object.values(data.basins).filter(n => n > 0).length} basin(s) to ${OUTPUT_PATH}`);
  if (final.length === 0) log('ℹ️  No active storms globally — normal during off-season.');
  if (data.errors) log(`ℹ️  Partial data (${data.errors.length} source issue(s)): ${data.errors.join(' | ')}`);
}

main().catch(err => {
  console.error(`[${new Date().toISOString()}] ❌ Unhandled: ${err.message}`);
  process.exit(1);
});
