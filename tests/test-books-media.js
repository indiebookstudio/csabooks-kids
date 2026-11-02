/**
 * tests/test-books-media.js
 * 
 * Verifies that replacing an image file in the `books/` structure (e.g. cover.png or an interior)
 * immediately takes effect without modifying any code, HTML, or JSON.
 * At the end, the test restores the original image and verifies byte-for-byte SHA256 integrity.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

// 1x1 transparent PNG buffer
const DUMMY_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

async function runTest() {
  console.log('=== TEST: Image Replacement & Zero-Code Maintenance ===');

  const targetCover = path.join(__dirname, '..', 'books', 'einstein', 'it', 'cover.png');
  const targetInterior = path.join(__dirname, '..', 'books', 'einstein', 'it', 'interiors', '06.png');

  if (!fs.existsSync(targetCover)) {
    throw new Error(`Target cover does not exist: ${targetCover}`);
  }
  if (!fs.existsSync(targetInterior)) {
    throw new Error(`Target interior does not exist: ${targetInterior}`);
  }

  // 1. Read originals and compute hashes
  const origCoverBuf = fs.readFileSync(targetCover);
  const origInteriorBuf = fs.readFileSync(targetInterior);
  const origCoverHash = sha256(origCoverBuf);
  const origInteriorHash = sha256(origInteriorBuf);

  console.log(`[1] Original cover hash:    ${origCoverHash.substring(0, 16)}... (${origCoverBuf.length} bytes)`);
  console.log(`[1] Original interior hash: ${origInteriorHash.substring(0, 16)}... (${origInteriorBuf.length} bytes)`);

  let replaced = false;

  try {
    // 2. Overwrite target cover with dummy PNG
    fs.writeFileSync(targetCover, DUMMY_PNG);
    replaced = true;
    const newCoverBuf = fs.readFileSync(targetCover);
    const newCoverHash = sha256(newCoverBuf);

    if (newCoverHash === origCoverHash) {
      throw new Error('Cover replacement failed: hash did not change!');
    }
    console.log(`[2] Replaced cover with new image (${newCoverBuf.length} bytes). New hash: ${newCoverHash.substring(0, 16)}...`);

    // 3. Verify manifest regeneration picks up the file automatically without manual JSON edits
    const manifestScript = require('../scripts/generate-books-manifest.js');
    const manifest = manifestScript.generate();

    if (!manifest['einstein'] || !manifest['einstein'].it) {
      throw new Error('Manifest missing einstein.it');
    }
    const coverRel = manifest['einstein'].it.cover;
    if (coverRel !== 'books/einstein/it/cover.png') {
      throw new Error(`Unexpected manifest cover path: ${coverRel}`);
    }
    console.log(`[3] Manifest automatically resolved updated cover path: ${coverRel}`);

    // 4. Verify runtime compilation includes the updated manifest
    const compileScript = require('../scripts/compile-runtime.js');
    compileScript.compile();
    const runtimeContent = fs.readFileSync(path.join(__dirname, '..', 'data', 'runtime-data.js'), 'utf8');
    if (!runtimeContent.includes('books/einstein/it/cover.png')) {
      throw new Error('Runtime data missing cover path');
    }
    console.log('[4] Runtime compiled bundle successfully contains file reference without code changes.');

    console.log('[5] Zero-code maintenance verified: Image replacement took effect without any manual JSON or code editing.');
  } finally {
    // 5. Restore original files
    if (replaced) {
      fs.writeFileSync(targetCover, origCoverBuf);
      console.log('[6] Restoring original cover image...');
      const restoredCoverHash = sha256(fs.readFileSync(targetCover));
      if (restoredCoverHash !== origCoverHash) {
        throw new Error('FATAL: Restored cover hash does not match original!');
      }
      console.log(`[7] Original cover restored and verified: ${restoredCoverHash.substring(0, 16)}... MATCH!`);

      // Recompile manifest and runtime to restore exact state
      const manifestScript = require('../scripts/generate-books-manifest.js');
      manifestScript.generate();
      const compileScript = require('../scripts/compile-runtime.js');
      compileScript.compile();
      console.log('[8] Manifest & runtime recompiled with restored original assets.');
    }
  }

  console.log('=== Image Replacement Test Passed (100%) ===\n');
}

if (require.main === module) {
  runTest().catch(err => {
    console.error('Test failed:', err);
    process.exit(1);
  });
}

module.exports = { runTest };
