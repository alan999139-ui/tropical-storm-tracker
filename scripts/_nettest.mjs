const urls = [
  'https://www.metoc.navy.mil/jtwc/rss/jtwc.rss',
  'https://www.nhc.noaa.gov/index-at.xml',
];
for (const u of urls) {
  try {
    const r = await fetch(u, { signal: AbortSignal.timeout(8000) });
    console.log(u, '=>', r.status);
  } catch (e) {
    console.log(u, '=> ERR', e.message);
  }
}
