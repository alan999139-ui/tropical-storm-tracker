import fs from 'node:fs';
const c = fs.readFileSync('dist/index.html', 'utf8');
const re = /<script type="application\/json" id="__i18n__"[^>]*>([\s\S]*?)<\/script>/;
const m = c.match(re);
if (!m) { console.log('NOT FOUND'); process.exit(1); }
console.log('JSON len =', m[1].length);
// Try parse
try {
  const obj = JSON.parse(m[1]);
  const keys = Object.keys(obj);
  console.log('Parse OK! Keys count =', keys.length);
  console.log('Sample keys:', keys.slice(0, 5));
} catch(e) {
  console.log('PARSE ERROR:', e.message);
  console.log('First 300 chars:', m[1].slice(0, 300));
}
