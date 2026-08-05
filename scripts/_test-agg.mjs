import { fetchAndAggregate } from '../functions/api/_aggregator.js';

console.log('Fetching global storms...');
const result = await fetchAndAggregate();
console.log('Active storms:', result.activeStorms);
console.log('Fetched at:', result.fetchedAt);
console.log('Errors:', result.errors);
console.log('\nStorm sample (first):');
if (result.storms.length > 0) {
  const s = result.storms[0];
  console.log('  name:', s.name);
  console.log('  basinNames:', JSON.stringify(s.basinNames));
  console.log('  windDescription:', JSON.stringify(s.windDescription));
  console.log('  affectedRegions:', JSON.stringify(s.affectedRegions?.en?.slice(0, 3)));
  console.log('  distanceToLand:', s.distanceToLand, s.distanceMiles + 'mi');
  console.log('  locationText:', JSON.stringify(s.locationText));
  console.log('  dataSource:', JSON.stringify(s.dataSource));
}
