/**
 * ============================================================================
 * CSA BOOKS 4 KIDS - TEST SUITE: /api/send-bonus
 * ============================================================================
 * Run: node test-endpoint.js
 */

import handler from './api/send-bonus.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ ${message}`);
    failed++;
  }
}

async function runTests() {
  console.log('\n--- 1. Testing CORS Preflight (OPTIONS) ---');
  {
    const req = new Request('http://localhost/api/send-bonus', {
      method: 'OPTIONS',
      headers: {
        'Origin': 'https://csabookskids.com',
        'Access-Control-Request-Method': 'POST'
      }
    });
    const res = await handler(req);
    assert(res.status === 204, 'Status should be 204 No Content');
    assert(res.headers.get('Access-Control-Allow-Origin') === '*', 'Access-Control-Allow-Origin should be *');
    assert(res.headers.get('Access-Control-Allow-Methods').includes('POST'), 'Methods should include POST');
  }

  console.log('\n--- 2. Testing Health Check (GET) ---');
  {
    const req = new Request('http://localhost/api/send-bonus', {
      method: 'GET'
    });
    const res = await handler(req);
    assert(res.status === 200, 'Status should be 200 OK');
    const data = await res.json();
    assert(data.status === 'ok', 'Status property should be ok');
    assert(data.service.includes('CSA Books 4 Kids'), 'Service name should match brand');
  }

  console.log('\n--- 3. Testing Input Validation (Missing Fields) ---');
  {
    const req = new Request('http://localhost/api/send-bonus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName: '', lastName: '', email: '' })
    });
    const res = await handler(req);
    assert(res.status === 400, 'Empty fields should return 400 Bad Request');
  }

  console.log('\n--- 4. Testing Email Format Validation ---');
  {
    const req = new Request('http://localhost/api/send-bonus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName: 'Marco', lastName: 'Rossi', email: 'not-an-email' })
    });
    const res = await handler(req);
    assert(res.status === 400, 'Invalid email format should return 400 Bad Request');
  }

  console.log('\n--- 4b. Testing Consent Validation ---');
  {
    const req = new Request('http://localhost/api/send-bonus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName: 'Marco', lastName: 'Rossi', email: 'marco@example.com', consent: false })
    });
    const res = await handler(req);
    assert(res.status === 400, 'False consent should return 400 Bad Request');
  }

  console.log('\n--- 5. Testing Anti-Spam Honeypot ---');
  {
    const req = new Request('http://localhost/api/send-bonus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Bot',
        lastName: 'Spammer',
        email: 'bot@spam.com',
        website: 'http://spam-link.xyz'
      })
    });
    const res = await handler(req);
    assert(res.status === 200, 'Honeypot should trigger silent 200 OK without dispatching email');
    const data = await res.json();
    assert(data.success === true, 'Response should indicate success to trick bot');
  }

  console.log('\n--- 6. Testing Brevo Payload Construction & Dispatch ---');
  {
    process.env.BREVO_API_KEY = 'test-brevo-api-key';
    let interceptedUrl = null;
    let interceptedHeaders = null;
    let interceptedBody = null;

    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url, options) => {
      interceptedUrl = url;
      interceptedHeaders = options.headers;
      interceptedBody = JSON.parse(options.body);
      return new Response(JSON.stringify({ messageId: '<test-msg-123@brevo.com>' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
    };

    try {
      const req = new Request('http://localhost/api/send-bonus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'Marco',
          lastName: 'Salucci',
          email: 'lettore@esempio.it',
          lang: 'it'
        })
      });

      const res = await handler(req);
      assert(res.status === 200, 'Status should be 200 OK');
      const data = await res.json();
      assert(data.success === true, 'Response success should be true');

      // Verify Brevo API Call Details
      assert(interceptedUrl === 'https://api.brevo.com/v3/smtp/email', 'Target should be Brevo v3 SMTP API');
      assert(interceptedHeaders['api-key'] === 'test-brevo-api-key', 'api-key header must match environment variable');
      assert(interceptedBody.sender.name === 'CSA Books 4 Kids', 'Sender name must be CSA Books 4 Kids');
      assert(interceptedBody.sender.email === 'csabooks.kids@gmail.com', 'Sender email must be csabooks.kids@gmail.com');
      assert(interceptedBody.to[0].email === 'lettore@esempio.it', 'Recipient email must match input');
      assert(interceptedBody.to[0].name === 'Marco Salucci', 'Recipient name must match input');
      assert(interceptedBody.cc[0].email === 'csabooks.kids@gmail.com', 'CC must be csabooks.kids@gmail.com');
      assert(interceptedBody.attachment && interceptedBody.attachment.length === 1, 'Attachment array must contain 1 item');
      assert(interceptedBody.attachment[0].url === 'https://csabookskids.com/assets/construction-site-adventures/Bundle.Volume.1/IT/Bonus/Bonus.CSA.Vol.1.pdf', 'Attachment URL must point to CDN PDF');
      assert(interceptedBody.attachment[0].name === 'Bonus-CSA-Volume1-Disegni-da-Colorare.pdf', 'Attachment name must be set');
      assert(interceptedBody.htmlContent.includes('CSA Books'), 'HTML must contain brand name');
      assert(interceptedBody.htmlContent.includes('Marco Salucci'), 'HTML must contain recipient name');
    } finally {
      globalThis.fetch = originalFetch;
    }
  }

  console.log(`\n========================================`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test runner failure:', err);
  process.exit(1);
});
