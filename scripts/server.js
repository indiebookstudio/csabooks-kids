const http = require('http');
const fs = require('fs');
const path = require('path');
const { generateBanners } = require('./generate-banners');

const PORT = 8080;
const ROOT = path.resolve(__dirname, '..');
const BANNER_DIR = path.resolve(__dirname, '..', 'assets', 'banner');

// Initial banners generation on server launch
try {
  generateBanners();
} catch (e) {
  console.warn('[Server] Initial banners generation warning:', e.message);
}

// Watch assets/banner for added, removed or modified banner images
let bannerWatchTimeout = null;
try {
  fs.watch(BANNER_DIR, (eventType, filename) => {
    if (filename && (filename.endsWith('banners.json') || filename.endsWith('banners.js'))) {
      return; // Ignore self-generated files
    }
    clearTimeout(bannerWatchTimeout);
    bannerWatchTimeout = setTimeout(() => {
      console.log(`[Watch] Detected ${eventType} in assets/banner/ (${filename || 'file'}). Regenerating banners...`);
      try {
        generateBanners();
      } catch (err) {
        console.error('[Watch] Error regenerating banners:', err.message);
      }
    }, 150);
  });
  console.log('[Watch] Live watching assets/banner/ for added or removed image files.');
} catch (err) {
  console.warn('[Watch] Could not watch assets/banner/ directory:', err.message);
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let cleanUrl = req.url.split('?')[0];
  if (cleanUrl === '/' || cleanUrl === '') cleanUrl = '/index.html';

  // Ensure banners are always fresh whenever banners or index are requested
  if (
    cleanUrl === '/index.html' ||
    cleanUrl === '/assets/banner/banners.js' ||
    cleanUrl === '/assets/banner/banners.json'
  ) {
    try {
      generateBanners();
    } catch (e) {
      // ignore
    }
  }

  const filePath = path.join(ROOT, decodeURIComponent(cleanUrl));

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': mime,
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`CSA Books 4 Kids server running at http://localhost:${PORT}`);
});
