import fs from 'node:fs';
const path = 'src/layouts/BaseLayout.astro';
let c = fs.readFileSync(path, 'utf8');

// 从 Astro frontmatter 提取 serverLang
const sm = c.match(/const serverLang = Astro\.props\.lang \|\| '([^']+)'/);
const actualLang = sm ? sm[1] : 'en';
console.log('Detected serverLang:', actualLang);

const newScript = `  <!-- i18n JSON -->
  <script type="application/json" id="__i18n__" set:html={allTranslations}></script>

  <!-- GA4 Event + Real-time i18n Client -->
  <script is:inline>
    window.__I18N__ = {};
    try { window.__I18N__ = JSON.parse(document.getElementById('__i18n__').textContent); } catch(e) {}
    window.__I18N_LANG__ = '${actualLang}';

    window.trackEvent = function(n,v) { if(typeof gtag!=='undefined') gtag(n,v||{}); };

    function applyTranslations(lang) {
      var T = window.__I18N__;
      if (!T) return;
      document.querySelectorAll('[data-i18n]').forEach(function(el) {
        var key = el.getAttribute('data-i18n');
        var txt = (T[key] && T[key][lang]) || (T[key] && T[key].en) || key;
        el.textContent = txt;
      });
      document.documentElement.lang = lang==='zh'?'zh-CN':lang==='fr'?'fr-FR':lang==='ja'?'ja-JP':'en';
      var sel = document.getElementById('lang-select');
      if (sel) {
        var opts = sel.options;
        for (var i=0;i<opts.length;i++){
          var v = opts[i].value;
          if ((lang==='en'&&(v==='/'||v==='')) || v.indexOf('/'+lang+'/')!==-1){ sel.selectedIndex=i; break; }
        }
      }
      localStorage.setItem('storm_lang', lang);
      trackEvent('language_switch', { from_language: window.__I18N_LANG__, to_language: lang, page_path: location.pathname });
      window.__I18N_LANG__ = lang;
      window.dispatchEvent(new CustomEvent('i18n:langchange', { detail: { lang: lang } }));
    }

    (function() {
      var saved = localStorage.getItem('storm_lang');
      var m = location.pathname.match(/^\\/(zh|fr|ja)(\\/|$)/);
      var urlLang = m ? m[1] : 'en';
      var targetLang = saved || urlLang;
      if (targetLang !== window.__I18N_LANG__) {
        var sel = document.getElementById('lang-select');
        if (sel) {
          var opts = sel.options;
          for (var i=0;i<opts.length;i++){
            var v = opts[i].value;
            if ((targetLang==='en'&&(v==='/'||v==='')) || v.indexOf('/'+targetLang+'/')!==-1){ sel.selectedIndex=i; break; }
          }
        }
        localStorage.setItem('storm_lang', targetLang);
        document.documentElement.lang = targetLang==='zh'?'zh-CN':targetLang==='fr'?'fr-FR':targetLang==='ja'?'ja-JP':'en';
        window.__I18N_LANG__ = targetLang;
      }
    })();

    document.addEventListener('change', function(e) {
      if (e.target && e.target.id === 'lang-select') {
        var match = e.target.value.match(/^\\/(zh|fr|ja)(\\/|$)/);
        applyTranslations(match ? match[1] : 'en');
      }
    });
  </script>`;

const oldScriptRegex = /  <!\-\- GA4 Event Tracking Helper \-\->\s*<script is:inline>\s*\n    \/\/ Helper function[\s\S]*?<\/script>/;
if (oldScriptRegex.test(c)) {
  c = c.replace(oldScriptRegex, newScript);
  console.log('✅ GA4 script block replaced with i18n client');
} else if (c.includes('window.__I18N__')) {
  console.log('✅ Already has i18n client');
} else {
  console.log('⚠️ Old script not found — dumping context:');
  const lines = c.split('\n');
  for (let i=127; i<147; i++) if (lines[i]) console.log(i+1, lines[i]);
}

// 确保 import 有 dict
if (!c.match(/import \{[^}]*dict[^}]*\} from ['\"]\.\.\/i18n\/dict['\"]/)) {
  c = c.replace(
    /import \{ languages, t, localizedPath \} from '\.\.\/i18n\/dict';/,
    "import { languages, t, localizedPath, dict } from '../i18n/dict';"
  );
  console.log('✅ Added dict to import');
}

fs.writeFileSync(path, c);
console.log('✅ Done writing BaseLayout.astro');
