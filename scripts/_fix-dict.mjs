import fs from 'node:fs';
const path = 'src/i18n/dict.ts';
let c = fs.readFileSync(path, 'utf8');

// 找所有 detail.overview 行的位置和行号
const lines = c.split('\n');
const positions = [];
lines.forEach((line, i) => {
  if (line.includes("'detail.overview'")) {
    positions.push({ line: i + 1, content: line.trim() });
  }
});
console.log('Found detail.overview at lines:', positions.map(p => p.line + ': ' + p.content).join('\n'));

// 策略：把第二个（即在 // 用户分类模块 附近的）detail.overview 改为 detail.overviewV2
// 实际上我们只需要保留一个就够了，删除所有重复
// 我们想保留的是 'detail.overview': { en: 'Overview' (旧键)
// 我们想删的是 'detail.overview': { en: 'What Happened' (新增的误复制的键)

// 先找第二个（ What Happened 那个）的精确上下文
// 找 detail.windImpact 的位置
let windImpactLine = -1;
lines.forEach((line, i) => {
  if (line.includes("'detail.windImpact'")) windImpactLine = i + 1;
});
console.log('detail.windImpact at line:', windImpactLine);

// 找 detail.overview V2 的精确行（第二处 What Happened）
let v2Line = -1;
lines.forEach((line, i) => {
  if (line.includes("'detail.overview'") && line.includes('What Happened')) {
    v2Line = i + 1;
  }
});
console.log('What Happened version at line:', v2Line);

// 把第二处 What Happened 改为不同键名 (detail.whatHappened)
if (v2Line > 0) {
  lines[v2Line - 1] = lines[v2Line - 1].replace("'detail.overview'", "'detail.whatHappened'");
  console.log(`✅ Line ${v2Line} renamed to detail.whatHappened`);
}

c = lines.join('\n');
fs.writeFileSync(path, c);

// 验证
let cnt = 0;
for (const m of c.matchAll(/  'detail\.overview'/g)) cnt++;
console.log(`Verification — detail.overview occurrences: ${cnt} ${cnt === 1 ? '✅' : '⚠️ still ' + cnt}`);
let cnt2 = 0;
for (const m of c.matchAll(/detail\.whatHappened/g)) cnt2++;
console.log(`detail.whatHappened occurrences: ${cnt2}`);
