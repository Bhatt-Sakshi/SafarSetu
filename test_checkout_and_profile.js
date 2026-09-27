/**
 * Automated Verification Script for Realistic Checkout Gateway & Profile Enhancements
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

async function runVerification() {
  console.log('--- Testing Payment Checkout & Profile Dashboard Enhancements ---');
  let passed = 0;
  let total = 0;

  function assert(condition, message) {
    total++;
    if (condition) {
      console.log(`✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`✗ FAIL: ${message}`);
    }
  }

  // Test 1: Check that booking endpoint supports realistic checkout parameters (transactionId, paymentMethod, taxRate)
  const txnId = `TXN-SETU-${Math.random().toString(36).substring(2, 8).toUpperCase()}99`;
  const bookingRes = await post('/api/bookings', {
    itemType: 'stay',
    title: 'Himalayan Solar Sanctuary',
    destination: 'Manali',
    dateRange: 'Oct 14 - Oct 17, 2026',
    guests: 2,
    basePrice: 4200,
    discountSaved: 1050,
    tokensUsed: 20,
    paymentMethod: 'UPI (aarav@oksbi)',
    transactionId: txnId
  });

  assert(bookingRes.status === 200, 'POST /api/bookings returns 200 OK');
  assert(bookingRes.data.data.booking.id === txnId, `Booking preserves realistic Gateway Transaction ID (${txnId})`);
  assert(bookingRes.data.data.booking.paymentMethod === 'UPI (aarav@oksbi)', 'Booking records payment method');
  assert(bookingRes.data.data.booking.tokenDiscountRupees === 40, 'Eco-Token discount accurately computed (20 tokens = ₹40)');
  assert(bookingRes.data.data.booking.taxRate === 0.05, '5% GST accurately applied to stays');

  // Test 2: Check PRO Pass checkout with 18% GST and welcome tokens
  const proTxnId = `TXN-SETU-PRO-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  const proBookingRes = await post('/api/bookings', {
    itemType: 'pro',
    title: 'SafarSetu PRO VIP Pass (Monthly Membership)',
    destination: 'All-India VIP',
    dateRange: '1 Month VIP Access',
    guests: 1,
    basePrice: 299,
    discountSaved: 0,
    tokensUsed: 0,
    paymentMethod: 'Card (ending in 8921)',
    transactionId: proTxnId,
    itemMetadata: { plan: 'monthly' }
  });

  assert(proBookingRes.status === 200, 'POST /api/bookings for PRO pass returns 200 OK');
  assert(proBookingRes.data.data.isPro === true, 'PRO status activated on successful checkout');
  assert(proBookingRes.data.data.booking.taxRate === 0.18, '18% GST accurately applied to PRO VIP subscription');
  assert(proBookingRes.data.data.booking.tokensAwarded === 200, '+200 welcome bonus tokens awarded');

  // Test 3: Avatar update endpoint
  const newAvatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80';
  const avatarRes = await post('/api/user/avatar', { avatar: newAvatar });
  assert(avatarRes.status === 200 && avatarRes.data.data.avatar === newAvatar, 'POST /api/user/avatar successfully updates avatar');

  // Test 4: Danger Zone Wipe & Delete Account endpoint
  const deleteRes = await post('/api/user/delete-account', {});
  assert(deleteRes.status === 200 && deleteRes.data.success === true, 'POST /api/user/delete-account successfully wipes user account');

  const profileAfterWipe = await get('/api/profile');
  assert(profileAfterWipe.data.data.activeBookings.length === 0, 'Active bookings wiped clean after account deletion');
  assert(profileAfterWipe.data.data.isPro === false, 'PRO status reset after account deletion');

  console.log(`\nVerified: ${passed}/${total} tests passed.`);
  if (passed !== total) process.exit(1);
}

runVerification().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
