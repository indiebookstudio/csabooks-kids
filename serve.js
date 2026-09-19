const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 8080;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(__dirname, reqPath);

  let targetPath = filePath;
  if (!fs.existsSync(targetPath) || fs.statSync(targetPath).isDirectory()) {
    if (fs.existsSync(targetPath + '.html')) {
      targetPath = targetPath + '.html';
    } else if (fs.existsSync(path.join(targetPath, 'index.html'))) {
      targetPath = path.join(targetPath, 'index.html');
    }
  }

  fs.stat(targetPath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('File Not Found: ' + reqPath);
      return;
    }
    const ext = path.extname(targetPath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(targetPath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`CSA Books 4 Kids server running at http://localhost:${PORT}`);
});
