/**
 * tests/test-browser-e2e.js
 * 
 * Invokes tests/run-browser-e2e.ps1 which starts the server and drives headless Chrome
 * to capture screenshots across viewports for all 12 key pages and QR routes.
 */

const { execFileSync } = require('child_process');
const path = require('path');

const ps1Script = path.join(__dirname, 'run-browser-e2e.ps1');

try {
  execFileSync('powershell.exe', [
    '-NoProfile',
    '-ExecutionPolicy', 'Bypass',
    '-File', ps1Script
  ], {
    stdio: 'inherit'
  });
  console.log('✅ Visual and browser E2E test suite finished cleanly.');
} catch (err) {
  console.error('❌ E2E test suite failed with error:', err.message);
  process.exit(1);
}
