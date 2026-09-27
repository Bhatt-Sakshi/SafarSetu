const http = require('http');
const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'data', 'safarsetu.db');
const db = new Database(DB_PATH);

function makeRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve({ status: res.statusCode, headers: res.headers, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, raw: body });
        }
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runPaymentGatewayTests() {
  console.log('====================================================');
  console.log(' 💳 SafarSetu Authentic Payment Gateway Tests');
  console.log(' Testing POST /api/payments/process-checkout & SQLite');
  console.log('====================================================\n');

  let passed = 0;
  let total = 0;

  function assert(desc, condition) {
    total++;
    if (condition) {
      console.log(`  ✓ PASS: ${desc}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${desc}`);
    }
  }

  // 1. Sign up a real test user via server authentication
  const testEmail = `paytest_${Date.now()}@safarsetu.in`;
  const signupRes = await makeRequest({
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/signup',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    name: 'Aarav Test Traveler',
    email: testEmail,
    password: 'password123',
    role: 'tourist'
  });

  assert('Signup created test user account', signupRes.status === 201);
  const testToken = signupRes.data?.token;
  const testUserId = signupRes.data?.user?.id;
  assert('Server issued authentic JWT token', typeof testToken === 'string' && testToken.length > 20);

  // 2. Test Invalid/Forged JWT Token Rejection
  const invalidRes = await makeRequest({
    hostname: 'localhost',
    port: 3000,
    path: '/api/payments/process-checkout',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer forged_tampered_jwt_token_12345'
    }
  }, {
    basePrice: 2000,
    title: 'Test Stay'
  });

  assert('Forged JWT token rejected with HTTP 403', invalidRes.status === 403);

  // 3. Test UPI Checkout with Authentic JWT
  const upiCheckoutRes = await makeRequest({
    hostname: 'localhost',
    port: 3000,
    path: '/api/payments/process-checkout',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${testToken}`
    }
  }, {
    itemType: 'stay',
    title: 'Heritage Haveli & Palace Stay',
    destination: 'Jaipur',
    dateRange: 'Nov 10 - Nov 14, 2026',
    guests: 2,
    basePrice: 5000,
    discountSaved: 1000,
    tokensUsed: 40,
    paymentMethod: 'UPI (traveler@oksbi)',
    paymentDetails: { method: 'upi', vpa: 'traveler@oksbi' }
  });

  assert('UPI checkout succeeded with HTTP 200', upiCheckoutRes.status === 200);
  assert('Response contains success: true', upiCheckoutRes.data?.success === true);
  
  const txnId = upiCheckoutRes.data?.transactionId;
  assert('Cryptographic transaction ID starts with TXN_SETU_', typeof txnId === 'string' && txnId.startsWith('TXN_SETU_'));
  assert('Transaction ID format matches TXN_SETU_<timestamp>_<hex>', /^TXN_SETU_\d+_[a-f0-9]+$/i.test(txnId));

  // Check expected calculations:
  // basePrice 5000, discountSaved 1000, tokensUsed 40 => discount = 80
  // subtotal = 5000 - 1000 - 80 = 3920
  // tax = round(3920 * 0.05) = 196
  // finalAmount = 3920 + 196 = 4116
  assert('Calculated amount matches correct subtotal and taxes (₹4,116)', upiCheckoutRes.data?.amount === 4116);
  assert('Returned item name matches reservation', upiCheckoutRes.data?.item === 'Heritage Haveli & Palace Stay');
  assert('Awarded +120 Eco-Tokens for stay', upiCheckoutRes.data?.tokensEarned === 120);
  assert('Returned localized date string', typeof upiCheckoutRes.data?.date === 'string' && upiCheckoutRes.data.date.length > 5);

  // 4. Verify SQLite Database Record
  const bookingInDb = db.prepare('SELECT * FROM bookings WHERE payment_id = ?').get(txnId);
  assert('Reservation record written to SQLite bookings table', Boolean(bookingInDb));
  assert('Booking user_id matches authenticated user', bookingInDb?.user_id === testUserId);
  assert('Booking category is stay', bookingInDb?.category === 'stay');
  assert('Booking amount_paid recorded correctly', bookingInDb?.amount_paid === 4116);
  assert('Booking eco_tokens_awarded recorded as 120', bookingInDb?.eco_tokens_awarded === 120);
  assert('Booking tokens_used recorded as 40', bookingInDb?.tokens_used === 40);

  // 5. Verify User Profile Updated in SQLite
  // Initial: 500. Used: 40. Earned: 120. New balance = 500 - 40 + 120 = 580
  const userInDb = db.prepare('SELECT * FROM users WHERE id = ?').get(testUserId);
  assert('User eco_tokens updated in SQLite: 580', userInDb?.eco_tokens === 580);

  // 6. Test Card Checkout with 2-Factor OTP
  const cardCheckoutRes = await makeRequest({
    hostname: 'localhost',
    port: 3000,
    path: '/api/payments/process-checkout',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${testToken}`
    }
  }, {
    itemType: 'transit',
    title: 'Vande Bharat Express (Executive Chair)',
    destination: 'Varanasi',
    dateRange: 'Nov 15, 2026',
    guests: 1,
    basePrice: 2400,
    discountSaved: 0,
    tokensUsed: 0,
    paymentMethod: 'Visa Card (ending in 8921)',
    paymentDetails: { method: 'card', brand: 'Visa', last4: '8921', otpVerified: true }
  });

  assert('Card checkout succeeded with HTTP 200', cardCheckoutRes.status === 200);
  assert('Card transaction ID starts with TXN_SETU_', cardCheckoutRes.data?.transactionId?.startsWith('TXN_SETU_'));
  assert('Awarded +85 Eco-Tokens for eco transit booking', cardCheckoutRes.data?.tokensEarned === 85);

  // User tokens: 580 + 85 = 665
  const userAfterCard = db.prepare('SELECT * FROM users WHERE id = ?').get(testUserId);
  assert('User eco_tokens updated to 665 in SQLite', userAfterCard?.eco_tokens === 665);

  // 7. Test Net Banking Checkout
  const nbCheckoutRes = await makeRequest({
    hostname: 'localhost',
    port: 3000,
    path: '/api/payments/process-checkout',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${testToken}`
    }
  }, {
    itemType: 'market',
    title: 'Pashmina GI Cashmere Shawl',
    destination: 'Srinagar',
    dateRange: 'Direct Order',
    guests: 1,
    basePrice: 6500,
    discountSaved: 500,
    tokensUsed: 50,
    paymentMethod: 'Net Banking (Punjab National Bank)',
    paymentDetails: { method: 'netbanking', bank: 'Punjab National Bank' }
  });

  assert('Net Banking checkout succeeded with HTTP 200', nbCheckoutRes.status === 200);
  assert('Net Banking transaction ID starts with TXN_SETU_', nbCheckoutRes.data?.transactionId?.startsWith('TXN_SETU_'));

  // 8. Verify Bookings list on /api/user/me
  const profileRes = await makeRequest({
    hostname: 'localhost',
    port: 3000,
    path: '/api/user/me',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${testToken}`
    }
  });

  assert('Profile /api/user/me returns activeBookings array', Array.isArray(profileRes.data?.data?.activeBookings));
  assert('Profile contains all 3 newly confirmed bookings', profileRes.data?.data?.activeBookings?.length === 3);

  // Cleanup test user (cascades bookings)
  db.prepare('DELETE FROM users WHERE id = ?').run(testUserId);

  console.log('\n====================================================');
  console.log(` Results: ${passed}/${total} Payment Gateway Tests Passed`);
  console.log('====================================================');
  process.exit(passed === total ? 0 : 1);
}

runPaymentGatewayTests().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
