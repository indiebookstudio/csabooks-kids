/**
 * ============================================================================
 * CSA BOOKS 4 KIDS - TEST SUITE: /api/send-bonus
 * ============================================================================
 * Run: node test-endpoint.js
 */

import handler from './api/send-bonus.js';
import ottoHandler from './api/send-otto-key.js';

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

  console.log('\n--- 7. Testing Volume 2 Brevo Payload Construction ---');
  {
    process.env.BREVO_API_KEY = 'test-brevo-api-key';
    let interceptedBody = null;

    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url, options) => {
      interceptedBody = JSON.parse(options.body);
      return new Response(JSON.stringify({ messageId: '<test-msg-456@brevo.com>' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
    };

    try {
      const req = new Request('http://localhost/api/send-bonus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'Giulia',
          lastName: 'Bianchi',
          email: 'giulia@esempio.it',
          volume: 2,
          lang: 'it'
        })
      });

      const res = await handler(req);
      assert(res.status === 200, 'Volume 2 request status should be 200 OK');
      assert(interceptedBody.subject.includes('Vol. 2'), 'Subject must mention Vol. 2');
      assert(interceptedBody.attachment[0].url === 'https://csabookskids.com/assets/construction-site-adventures/Bundle.Volume.2/IT/Bonus/Bonus.CSA.Vol.2.pdf', 'Attachment URL must point to Volume 2 CDN PDF');
      assert(interceptedBody.attachment[0].name === 'Bonus-CSA-Volume2-Disegni-da-Colorare.pdf', 'Attachment name must match Volume 2');
      assert(interceptedBody.htmlContent.includes('Raccolta Vol. 2'), 'HTML content must mention Raccolta Vol. 2');
      assert(interceptedBody.htmlContent.includes('Giulia Bianchi'), 'HTML must contain recipient name');
    } finally {
      globalThis.fetch = originalFetch;
    }
  }

  console.log('\n--- 8. Testing Otto Key CORS Preflight (OPTIONS) ---');
  {
    const req = new Request('http://localhost/api/send-otto-key', {
      method: 'OPTIONS',
      headers: {
        'Origin': 'https://csabookskids.com',
        'Access-Control-Request-Method': 'POST'
      }
    });
    const res = await ottoHandler(req);
    assert(res.status === 204, 'Otto status should be 204 No Content');
    assert(res.headers.get('Access-Control-Allow-Origin') === '*', 'Access-Control-Allow-Origin should be *');
    assert(res.headers.get('Access-Control-Allow-Methods').includes('POST'), 'Methods should include POST');
  }

  console.log('\n--- 9. Testing Otto Key Health Check (GET) ---');
  {
    const req = new Request('http://localhost/api/send-otto-key', { method: 'GET' });
    const res = await ottoHandler(req);
    assert(res.status === 200, 'Otto GET should be 200 OK');
    const data = await res.json();
    assert(data.status === 'ok', 'Status property should be ok');
    assert(data.service.includes('Otto'), 'Service name should mention Otto');
  }

  console.log('\n--- 10. Testing Otto Input Validation (Missing & Invalid Email) ---');
  {
    const req1 = new Request('http://localhost/api/send-otto-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: '' })
    });
    const res1 = await ottoHandler(req1);
    assert(res1.status === 400, 'Empty email should return 400 Bad Request');

    const req2 = new Request('http://localhost/api/send-otto-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'non-un-email' })
    });
    const res2 = await ottoHandler(req2);
    assert(res2.status === 400, 'Malformed email should return 400 Bad Request');
  }

  console.log('\n--- 11. Testing Otto Anti-Spam Honeypot ---');
  {
    const req = new Request('http://localhost/api/send-otto-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'spambot@example.com',
        website: 'http://spam-link.xyz'
      })
    });
    const res = await ottoHandler(req);
    assert(res.status === 200, 'Honeypot should trigger silent 200 OK without dispatching email');
    const data = await res.json();
    assert(data.success === true, 'Response should trick bot with success=true');
  }

  console.log('\n--- 12. Testing Otto Brevo Payload & Secret Key Content ---');
  {
    process.env.BREVO_API_KEY = 'test-otto-brevo-key';
    let interceptedUrl = null;
    let interceptedHeaders = null;
    let interceptedBody = null;

    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url, options) => {
      interceptedUrl = url;
      interceptedHeaders = options.headers;
      interceptedBody = JSON.parse(options.body);
      return new Response(JSON.stringify({ messageId: '<otto-msg-789@brevo.com>' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
    };

    try {
      const req = new Request('http://localhost/api/send-otto-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'genitore@famiglia.it',
          marketingConsent: false,
          lang: 'it'
        })
      });

      const res = await ottoHandler(req);
      assert(res.status === 200, 'Status should be 200 OK');
      const data = await res.json();
      assert(data.success === true, 'Response success should be true');

      // Verify Brevo payload details
      assert(interceptedUrl === 'https://api.brevo.com/v3/smtp/email', 'Target should be Brevo v3 SMTP API');
      assert(interceptedHeaders['api-key'] === 'test-otto-brevo-key', 'api-key header must match environment variable');
      assert(interceptedBody.sender.name.includes('Otto'), 'Sender name must mention Otto');
      assert(interceptedBody.sender.email.includes('@'), 'Sender email must be valid');
      assert(interceptedBody.replyTo.email === 'csabooks.kids@gmail.com', 'Reply-To must point to csabooks.kids@gmail.com');
      assert(interceptedBody.to[0].email === 'genitore@famiglia.it', 'Recipient email must match input');
      assert(interceptedBody.subject === 'La chiave segreta di Otto è arrivata! 🔑', 'Subject must match official Italian copy');
      assert(interceptedBody.htmlContent.includes('OTTO'), 'HTML email must contain the universal key OTTO');
      assert(interceptedBody.htmlContent.includes('https://csabookskids.com/accesso/4dcbbaee2e69a278e4e59eab50430ccc/'), 'HTML email must contain permanent QR URL');
      assert(interceptedBody.htmlContent.includes('polpo_esploratore_con_chiave_dorata.png'), 'HTML must include Otto with golden key image');
    } finally {
      globalThis.fetch = originalFetch;
    }
  }

  console.log('\n--- 13. Testing Otto Marketing Consent Handling ---');
  {
    process.env.BREVO_API_KEY = 'test-otto-brevo-key';
    let contactRegistered = false;
    let contactBody = null;

    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url, options) => {
      if (url.includes('/v3/contacts')) {
        contactRegistered = true;
        contactBody = JSON.parse(options.body);
        return new Response(JSON.stringify({ id: 12345 }), { status: 201 });
      }
      return new Response(JSON.stringify({ messageId: '<msg-consent@brevo.com>' }), { status: 201 });
    };

    try {
      const req = new Request('http://localhost/api/send-otto-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'iscritta@famiglia.it',
          marketingConsent: true,
          lang: 'it'
        })
      });

      const res = await ottoHandler(req);
      assert(res.status === 200, 'Status should be 200 OK');
      assert(contactRegistered === true, 'Brevo Contacts API should be called when marketingConsent is true');
      assert(contactBody.email === 'iscritta@famiglia.it', 'Contact email must match input');
      assert(contactBody.attributes.MARKETING_CONSENT === true, 'MARKETING_CONSENT attribute must be true');
    } finally {
      globalThis.fetch = originalFetch;
    }
  }

  console.log('\n--- 14. Testing Fallback Sender Retry ---');
  {
    process.env.BREVO_API_KEY = 'test-otto-brevo-key';
    let callCount = 0;
    let usedSenders = [];

    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url, options) => {
      callCount++;
      const body = JSON.parse(options.body);
      usedSenders.push(body.sender.email);
      if (callCount === 1) {
        // First call fails with unauthorized sender
        return new Response(JSON.stringify({ code: 'unauthorized_sender', message: 'Sender is not authorized' }), { status: 400 });
      }
      // Second call succeeds with fallback
      return new Response(JSON.stringify({ messageId: '<fallback-msg@brevo.com>' }), { status: 201 });
    };

    try {
      const req = new Request('http://localhost/api/send-otto-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'prova@famiglia.it',
          marketingConsent: false
        })
      });

      const res = await ottoHandler(req);
      assert(res.status === 200, 'Status should be 200 OK after fallback retry');
      assert(callCount === 2, 'Should attempt 2 calls (initial + fallback)');
      assert(usedSenders[1] === 'csabooks.kids@gmail.com', 'Fallback sender must be csabooks.kids@gmail.com');
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
