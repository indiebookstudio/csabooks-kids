const https = require('https');

function check() {
  https.get('https://api.github.com/repos/indiebookstudio/csabooks-kids/actions/runs/44386608934', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
      try {
        const json = JSON.parse(d);
        console.log(`[${new Date().toISOString()}] Status: ${json.status} | Conclusion: ${json.conclusion}`);
        if (json.status === 'completed') {
          process.exit(json.conclusion === 'success' ? 0 : 1);
        } else {
          setTimeout(check, 10000);
        }
      } catch(e) {
        console.error(e);
        setTimeout(check, 10000);
      }
    });
  }).on('error', () => setTimeout(check, 10000));
}

check();
