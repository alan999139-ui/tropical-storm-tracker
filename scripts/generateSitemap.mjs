#!/usr/bin/env node
/**
 * generateSitemap.mjs
 * 构建后运行：手动生成 sitemap.xml（绕过 astrojs/sitemap 插件 crash 问题）
 */

import { readdirSync, writeFileSync, statSync } from 'fs';
import { join, extname } from 'path';

const SITE_URL = 'https://tropical-storm-tracker.pages.dev';
const DIST_DIR = './dist';
const OUTPUT_PATH = './dist/sitemap.xml';

function walkDir(dir, base = '') {
  const entries = readdirSync(dir);
  const urls = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const relPath = join(base, entry);

    try {
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        urls.push(...walkDir(fullPath, relPath));
      } else if (extname(entry) === '.html') {
        let pathname = '/' + relPath.replace(/\\/g, '/');
        if (pathname.endsWith('/index.html')) {
          pathname = pathname.replace(/\/index\.html$/, '/') || '/';
        } else if (pathname.endsWith('.html')) {
          pathname = pathname.replace(/\.html$/, '');
        }
        urls.push(pathname);
      }
    } catch {}
  }
  return urls;
}

function generateSitemap(urls) {
  const now = new Date().toISOString().split('T')[0];

  const staticPages = [
    '/', '/storms/', '/map/', '/preparedness/', '/about/',
    '/alerts/', '/pricing/', '/signin/', '/signup/', '/dashboard/',
    '/zh/', '/zh/storms/', '/zh/map/', '/zh/preparedness/', '/zh/about/',
    '/zh/alerts/', '/zh/pricing/', '/zh/signin/', '/zh/signup/', '/zh/dashboard/',
    '/feed.xml',
  ];

  const allUrls = new Set([...staticPages, ...urls]);
  const sorted = [...allUrls].sort();

  const urlEntries = sorted.map(loc => {
    const isZh = loc.startsWith('/zh');
    const priority = loc === '/' ? '1.0' : ['/storms/', '/map/'].includes(loc) ? '0.9' : '0.8';
    const changefreq = staticPages.includes(loc) ? 'daily' : 'weekly';

    return `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${isZh ? `
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${SITE_URL}${loc}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${loc.replace('/zh', '')}"/>` : `
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${loc}"/>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${SITE_URL}/zh${loc}"/>`}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urlEntries}
</urlset>`;
}

const STATIC_PAGES_COUNT = 21;

try {
  const urls = walkDir(DIST_DIR);
  const sitemap = generateSitemap(urls);
  writeFileSync(OUTPUT_PATH, sitemap, 'utf8');
  console.log(`✅ Sitemap written (${urls.length + STATIC_PAGES_COUNT} URLs)`);
} catch (err) {
  console.error('⚠️  Sitemap generation failed:', err.message);
  process.exit(0); // 不中断构建
}
