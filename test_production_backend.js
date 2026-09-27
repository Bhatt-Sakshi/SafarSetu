/**
 * Comprehensive Production-Grade Backend & Security Test Suite
 * Tests SQLite database schema, bcrypt password hashing, JWT authentication,
 * 409 conflict detection, server-side price calculation, Razorpay HMAC-SHA256 verification,
 * database persistence, and cascading account deletion.
 */

require('dotenv').config();
const http = require('http');
const crypto = require('crypto');
const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const DB_PATH = path.join(__dirname, 'data', 'safarsetu.db');
const db = new Database(DB_PATH);
const JWT_SECRET = process.env.JWT_SECRET || 'safarsetu_production_grade_jwt_secret_2026_super_secure_key';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'safarsetu_razorpay_secret_key_2026';

function request(options, data = null) {
  return new Promise((resolve, reject) => {
    const payload = data ? JSON.stringify(data) : null;
    const reqOptions = {
      hostname: 'localhost',
      port: 3000,
      path: options.path,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
        ...(options.headers || {})
      }
    };

    const req = http.request(reqOptions, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : null;
          resolve({ status: res.statusCode, headers: res.headers, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, raw: body });
        }
      });
    });

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function runProductionTests() {
  console.log('====================================================');
  console.log(' 🛡️ SafarSetu Production Full-Stack Test Suite');
  console.log(' Testing SQLite, Auth, Security, & Razorpay Payment');
  console.log('====================================================\n');

  let passed = 0;
  let total = 0;

  function assert(condition, message) {
    total++;
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
    }
  }

  // ----------------------------------------------------
  // SECTION 1: SQLite Persistent Database Schema Inspection
  // ----------------------------------------------------
  console.log('--- 🗄️ 1. Testing SQLite Database Engine & Schema ---');
  
  // Verify users table
  const userColumns = db.prepare(`PRAGMA table_info(users)`).all().map(c => c.name);
  assert(
    ['id', 'name', 'email', 'password_hash', 'role', 'eco_tokens', 'avatar_url', 'created_at'].every(c => userColumns.includes(c)),
    'Users table contains all required columns (id, name, email, password_hash, role, eco_tokens, avatar_url, created_at)'
  );

  // Verify bookings table
  const bookingColumns = db.prepare(`PRAGMA table_info(bookings)`).all().map(c => c.name);
  assert(
    ['id', 'user_id', 'category', 'item_name', 'amount_paid', 'eco_tokens_awarded', 'status', 'payment_id', 'booking_date'].every(c => bookingColumns.includes(c)),
    'Bookings table contains all required columns (id, user_id, category, item_name, amount_paid, eco_tokens_awarded, status, payment_id, booking_date)'
  );

  // Verify itineraries table
  const itinColumns = db.prepare(`PRAGMA table_info(itineraries)`).all().map(c => c.name);
  assert(
    ['id', 'user_id', 'destination', 'duration_days', 'schedule_json'].every(c => itinColumns.includes(c)),
    'Itineraries table contains all required columns (id, user_id, destination, duration_days, schedule_json)'
  );

  // Verify WAL mode and foreign keys enabled
  const journalMode = db.prepare('PRAGMA journal_mode').get();
  const foreignKeys = db.prepare('PRAGMA foreign_keys').get();
  assert(journalMode.journal_mode.toLowerCase() === 'wal', 'SQLite database is operating in high-concurrency WAL mode');
  assert(foreignKeys.foreign_keys === 1, 'Foreign key constraints are strictly enforced in SQLite');

  // ----------------------------------------------------
  // SECTION 2: Server-Side Authentication & Session Flow
  // ----------------------------------------------------
  console.log('\n--- 🔒 2. Testing Server-Side Auth & Security ---');

  const testEmail = `test.pilot.${Date.now()}@safarsetu.in`;
  const testPassword = 'StrongPassword123!';

  // Test validation: short password
  const shortPassRes = await request({ path: '/api/auth/signup', method: 'POST' }, {
    name: 'Short Pass User',
    email: 'short@safarsetu.in',
    password: '123'
  });
  assert(shortPassRes.status === 400, 'Signup rejects passwords shorter than 6 characters with HTTP 400');

  // Test successful signup
  const signupRes = await request({ path: '/api/auth/signup', method: 'POST' }, {
    name: 'Priya Sharma',
    email: testEmail,
    password: testPassword,
    role: 'tourist'
  });
  assert(signupRes.status === 201 && signupRes.data.token, 'Signup creates account with HTTP 201 and returns valid JWT token');
  assert(signupRes.data.user.wallet.ecoTokens === 500, 'New user receives default 500 Eco-Tokens credited to database');

  const userToken = signupRes.data.token;
  const userId = signupRes.data.user.id;

  // Verify password was hashed with bcryptjs in SQLite
  const dbUser = db.prepare('SELECT * FROM users WHERE email = ?').get(testEmail);
  assert(dbUser && dbUser.password_hash.startsWith('$2'), 'Password is encrypted using bcryptjs salted hash in SQLite');
  const bcryptMatch = await bcrypt.compare(testPassword, dbUser.password_hash);
  assert(bcryptMatch === true, 'Bcrypt verification confirms salted hash matches plaintext password');

  // Test duplicate email signup (409 Conflict)
  const dupRes = await request({ path: '/api/auth/signup', method: 'POST' }, {
    name: 'Duplicate Priya',
    email: testEmail,
    password: 'AnotherPassword123'
  });
  assert(dupRes.status === 409, 'Duplicate email registration returns standard HTTP 409 Conflict');

  // Test login: invalid credentials
  const badLoginRes = await request({ path: '/api/auth/login', method: 'POST' }, {
    email: testEmail,
    password: 'WrongPassword'
  });
  assert(badLoginRes.status === 401, 'Login with incorrect password rejected with HTTP 401');

  // Test login: successful credentials
  const goodLoginRes = await request({ path: '/api/auth/login', method: 'POST' }, {
    email: testEmail,
    password: testPassword
  });
  assert(goodLoginRes.status === 200 && goodLoginRes.data.token, 'Login with correct credentials succeeds with HTTP 200 and issues JWT');

  // Test protected endpoint without token
  const unauthRes = await request({ path: '/api/user/me', method: 'GET' });
  assert(unauthRes.status === 401, 'Protected route /api/user/me without Bearer token rejected with HTTP 401');

  // Test protected endpoint with invalid token
  const badTokenRes = await request({
    path: '/api/user/me',
    method: 'GET',
    headers: { 'Authorization': 'Bearer bad_token_xyz' }
  });
  assert(badTokenRes.status === 403, 'Protected route with forged token rejected with HTTP 403');

  // Test protected endpoint with valid Bearer token
  const meRes = await request({
    path: '/api/user/me',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${userToken}` }
  });
  assert(meRes.status === 200 && meRes.data.user.email === testEmail, 'Protected route /api/user/me returns current user profile with Bearer auth');

  // ----------------------------------------------------
  // SECTION 3: Production-Grade Razorpay Payment Integration
  // ----------------------------------------------------
  console.log('\n--- 💳 3. Testing Razorpay Payment Integration & Verification ---');

  // Server-side order creation with price calculation
  const orderRes = await request({
    path: '/api/payments/create-order',
    method: 'POST',
    headers: { 'Authorization': `Bearer ${userToken}` }
  }, {
    itemType: 'stay',
    title: 'Himalayan Organic Cider Homestay',
    basePrice: 4000,
    discountSaved: 500,
    tokensUsed: 60,
    guests: 2,
    dateRange: 'Nov 10 - Nov 13, 2026'
  });

  assert(orderRes.status === 200 && orderRes.data.success, 'POST /api/payments/create-order initializes order successfully');
  const { orderId, amount, breakdown, keyId } = orderRes.data.data;
  assert(orderId && orderId.length > 5, `Server issued valid Razorpay order ID (${orderId})`);
  assert(amount > 0 && amount === breakdown.finalPayable * 100, `Amount calculated strictly in paise (${amount} paise = ₹${breakdown.finalPayable})`);
  assert(breakdown.tokenDiscountRupees === 120, '60 Eco-Tokens converted to ₹120 server-side discount (₹2/token)');
  assert(keyId.length > 0, `Returned active Razorpay Key ID: ${keyId}`);

  // Test signature verification: Tampered signature rejection (HTTP 400)
  const tamperedVerifyRes = await request({
    path: '/api/payments/verify',
    method: 'POST',
    headers: { 'Authorization': `Bearer ${userToken}` }
  }, {
    razorpay_order_id: orderId,
    razorpay_payment_id: 'pay_test_tampered_123',
    razorpay_signature: 'fake_tampered_signature_hex_code',
    itemType: 'stay',
    title: 'Himalayan Organic Cider Homestay',
    basePrice: 4000,
    discountSaved: 500,
    tokensUsed: 60
  });
  assert(tamperedVerifyRes.status === 400, 'Tampered Razorpay payment signature strictly rejected with HTTP 400');

  // Test signature verification: Authentic HMAC-SHA256 signature
  const authenticPaymentId = `pay_rzp_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
  const signText = `${orderId}|${authenticPaymentId}`;
  const validSignature = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET).update(signText).digest('hex');

  const validVerifyRes = await request({
    path: '/api/payments/verify-signature',
    method: 'POST',
    headers: { 'Authorization': `Bearer ${userToken}` }
  }, {
    razorpay_order_id: orderId,
    razorpay_payment_id: authenticPaymentId,
    razorpay_signature: validSignature,
    itemType: 'stay',
    title: 'Himalayan Organic Cider Homestay',
    destination: 'Manali',
    dateRange: 'Nov 10 - Nov 13, 2026',
    guests: 2,
    basePrice: 4000,
    discountSaved: 500,
    tokensUsed: 60
  });

  assert(validVerifyRes.status === 200 && validVerifyRes.data.success, 'Valid HMAC-SHA256 signature accepted with HTTP 200 on POST /api/payments/verify-signature');

  const verifiedBooking = validVerifyRes.data.data.booking;
  assert(verifiedBooking.paymentId === authenticPaymentId, 'Booking record contains verified Razorpay payment ID');
  assert(verifiedBooking.tokensAwarded === 120, 'Awarded +120 Eco-Tokens for certified sustainable stay booking');

  // Verify booking persistence in SQLite
  const dbBooking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(verifiedBooking.id);
  assert(dbBooking !== undefined && dbBooking.user_id === userId, 'Booking written to SQLite bookings table with user_id foreign key');
  assert(dbBooking.amount_paid > 0 && dbBooking.status === 'confirmed', 'Booking status confirmed with recorded amount_paid');

  // Verify user wallet updated in SQLite
  const updatedDbUser = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  assert(updatedDbUser.eco_tokens === 500 - 60 + 120, `User tokens in SQLite updated correctly: ${updatedDbUser.eco_tokens} (500 - 60 used + 120 earned = 560)`);

  // ----------------------------------------------------
  // SECTION 4: Itinerary Saving & Retrieval
  // ----------------------------------------------------
  console.log('\n--- 🗺️ 4. Testing Itinerary Database Vault ---');

  const saveItinRes = await request({
    path: '/api/save-itinerary',
    method: 'POST',
    headers: { 'Authorization': `Bearer ${userToken}` }
  }, {
    destination: 'Varanasi',
    title: '3-Day Ghats & Handloom Trail',
    duration: 3,
    style: 'Heritage',
    carbonSaved: '32.4 kg CO2'
  });
  assert(saveItinRes.status === 200 && saveItinRes.data.data.id.startsWith('itin-'), 'Itinerary saved to database with persistent ID');

  const itinDbRecord = db.prepare('SELECT * FROM itineraries WHERE user_id = ?').get(userId);
  assert(itinDbRecord && itinDbRecord.destination === 'Varanasi', 'Itinerary record persisted in SQLite itineraries table');

  // Verify /api/user/me returns both booking and itinerary
  const meWithData = await request({
    path: '/api/user/me',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${userToken}` }
  });
  assert(meWithData.data.user.activeBookings.length >= 1, 'Profile returns active bookings linked to user session');
  assert(meWithData.data.user.savedItineraries.length >= 1, 'Profile returns saved itineraries linked to user session');

  // ----------------------------------------------------
  // SECTION 5: Cascading Account Deletion (Danger Zone)
  // ----------------------------------------------------
  console.log('\n--- ⚠️ 5. Testing Cascading Account Deletion ---');

  const deleteRes = await request({
    path: '/api/user/account',
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${userToken}` }
  });
  assert(deleteRes.status === 200 && deleteRes.data.success, 'DELETE /api/user/account executes successfully');

  // Check SQLite: User must be gone
  const deletedUser = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  assert(deletedUser === undefined, 'User row permanently erased from SQLite users table');

  // Check SQLite: Cascaded bookings must be gone
  const userBookings = db.prepare('SELECT * FROM bookings WHERE user_id = ?').all(userId);
  assert(userBookings.length === 0, 'Associated user bookings cascaded and wiped from SQLite bookings table');

  // Check SQLite: Cascaded itineraries must be gone
  const userItineraries = db.prepare('SELECT * FROM itineraries WHERE user_id = ?').all(userId);
  assert(userItineraries.length === 0, 'Associated user itineraries cascaded and wiped from SQLite itineraries table');

  // Token is now orphaned, /api/user/me must return 404
  const orphanedMeRes = await request({
    path: '/api/user/me',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${userToken}` }
  });
  assert(orphanedMeRes.status === 404, 'Former JWT token for erased user properly returns HTTP 404 User Not Found');

  console.log(`\n====================================================`);
  console.log(` Results: ${passed}/${total} Production Backend Tests Passed`);
  console.log(`====================================================`);

  if (passed === total) {
    console.log('🌟 100% PRODUCTION READY: Database, Auth, Security, & Razorpay Verified!');
    process.exit(0);
  } else {
    console.error('Some tests failed.');
    process.exit(1);
  }
}

runProductionTests().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
