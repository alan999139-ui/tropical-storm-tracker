// Cloudflare Pages Function: /api/global-storms
// 全局热带气旋实时聚合（NHC + JTWC），边缘缓存 2 分钟。
import { fetchAndAggregate } from './_aggregator.js';

export async function onRequestGet(context) {
  try {
    const data = await fetchAndAggregate();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Cache-Control': 'public, max-age=120',
        'cf-cache-status': 'DYNAMIC',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({
      source: 'NOAA NHC + JTWC',
      global: true,
      activeStorms: 0,
      storms: [],
      degraded: true,
      error: err.message,
      fetchedAt: new Date().toISOString(),
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=60',
      },
    });
  }
}
