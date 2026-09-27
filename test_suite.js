/**
 * Automated Verification Test Suite for TourVerse AI
 * Verifies all full-stack endpoints, dynamic any-destination geocoding,
 * landslide risk hazard detection, booking persistence, and wallet syncing.
 */

const http = require('http');

function post(path, data) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body) }));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function get(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body) }));
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('--- Starting SafarSetu Automated Full-Stack Test Suite ---');
  let passed = 0;
  let total = 0;

  function assert(condition, testName) {
    total++;
    if (condition) {
      console.log(`✓ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`✗ FAIL: ${testName}`);
    }
  }

  // 1. Health
  const health = await get('/api/health');
  assert(health.status === 200 && health.data.status === 'healthy', 'Health check returns status 200 and healthy');

  // 2. Curated Destinations
  const dests = await get('/api/destinations');
  assert(dests.status === 200 && dests.data.data.length >= 6, 'Fetches curated destinations list');

  // 3. Geocoding Mountain (Manali)
  const manali = await post('/api/geocode', { query: 'Manali' });
  assert(manali.data.data.isMountain === true && manali.data.data.landslideRisk === 'extreme', 'Manali flagged as mountain with extreme landslide risk');

  // 4. Geocoding Mountain Any-Destination Fallback (e.g. "Spiti Valley")
  const spiti = await post('/api/geocode', { query: 'Spiti Valley' });
  assert(spiti.data.data.isMountain === true && spiti.data.data.hazardAlert !== null, 'Any arbitrary mountain (Spiti Valley) dynamically generates hazard alert');

  // 5. Geocoding Non-Mountain Any-Destination Fallback (e.g. "Rome")
  const rome = await post('/api/geocode', { query: 'Rome' });
  assert(rome.data.data.isMountain === false && rome.data.data.landslideRisk === 'safe', 'Any non-mountain destination (Rome) flagged safe');

  // 6. Dynamic Itinerary Generation
  const itin = await post('/api/generate-itinerary', { destination: 'Shimla', days: 4, travelStyle: 'backpacker' });
  assert(itin.data.data.days.length === 4 && itin.data.data.weatherBadge !== undefined, 'Generates 4-day customized itinerary with weather metadata');

  // 7. Multi-Modal Transit
  const transit = await get('/api/transit?type=train');
  assert(transit.data.data.every(t => t.type === 'train'), 'Filters multi-modal transit options by mode (electric trains)');

  // 8. Smart Stays Dynamic Pricing (50% Occupancy vs 20% Occupancy)
  const stays50 = await get('/api/stays?occupancy=50');
  const stays20 = await get('/api/stays?occupancy=20');
  const price50 = stays50.data.data[0].dynamicPricing.finalPrice;
  const price20 = stays20.data.data[0].dynamicPricing.finalPrice;
  assert(price20 < price50, `Off-peak yield discount works: 20% occ (₹${price20}) < 50% occ (₹${price50})`);

  // 9. Market with GI Tag QR Payload
  const market = await get('/api/market?category=handicraft');
  assert(market.data.data.length > 0 && market.data.data[0].giTag.registeredNumber.includes('GI Tag'), 'Artisan market includes verified GI tag registry numbers');

  // 10. Booking Creation & Wallet Persistence
  const profileBefore = await get('/api/profile');
  const tokensBefore = profileBefore.data.data.wallet.ecoTokens;
  const bookingRes = await post('/api/bookings', {
    itemType: 'stay',
    title: 'Automated Test Eco-Cottage',
    destination: 'Shimla',
    dateRange: 'Nov 1 - Nov 3, 2026',
    guests: 2,
    basePrice: 3000,
    discountSaved: 750,
    tokensUsed: 40
  });
  assert(bookingRes.status === 200 && bookingRes.data.data.booking.id.startsWith('BK-'), 'Created real functional booking with persistent ID');

  const profileAfter = await get('/api/profile');
  const tokensAfter = profileAfter.data.data.wallet.ecoTokens;
  assert(tokensAfter !== tokensBefore, `Wallet tokens updated: before=${tokensBefore}, after=${tokensAfter}`);

  // 11. Safety Reroute Incentive (+100 Tokens)
  const rerouteRes = await post('/api/reroute-safety', {
    destination: 'Manali',
    rerouteId: 'reroute-test',
    safeRouteName: 'Safe Pine Valley Trail'
  });
  assert(rerouteRes.status === 200 && rerouteRes.data.data.bonusTokens === 100, 'AI safety reroute awards +100 Eco-Tokens');

  // 12. SafarSetu PRO VIP Activation
  const proRes = await post('/api/subscribe-pro', { plan: 'annual' });
  assert(proRes.data.data.isPro === true, 'Upgraded successfully to SafarSetu PRO');

  console.log(`\nResults: ${passed}/${total} tests passed.`);
  if (passed === total) {
    console.log('🎉 All SafarSetu Full-Stack Features Verified Successfully!');
  } else {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test suite execution error:', err);
  process.exit(1);
});
