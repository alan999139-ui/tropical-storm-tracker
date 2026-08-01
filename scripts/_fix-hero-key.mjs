import fs from 'node:fs';
let c = fs.readFileSync('src/i18n/dict.ts', 'utf8');
c = c.replace("'hero.desc':", "'hero.description':");
fs.writeFileSync('src/i18n/dict.ts', c, 'utf8');

// Update references
let idx = fs.readFileSync('src/pages/index.astro', 'utf8');
idx = idx.replace(/t\('hero\.desc'/g, "t('hero.description'");
fs.writeFileSync('src/pages/index.astro', idx, 'utf8');
console.log('Renamed hero.desc -> hero.description');
