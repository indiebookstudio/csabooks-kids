const fs = require('fs');

const pages = [
  'index.html', 'about.html', 'cantiere.html', 'catalogo.html',
  'characters.html', 'colorare.html', 'fano.html', 'scienza.html',
  'scuola.html', '404.html'
];

pages.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const regex = /<([a-z0-9]+)([^>]*)>([^<]+)<\/\1>/gi;
  let match;
  const list = [];
  while ((match = regex.exec(content)) !== null) {
    const tag = match[1].toLowerCase();
    const attrs = match[2];
    const text = match[3].trim();
    if (['script', 'style', 'svg', 'path', 'title'].includes(tag)) continue;
    if (!text || /^[0-9\s.,–—:\/\\()@#+*&%$!?-]+$/.test(text)) continue;
    if (attrs.includes('data-i18n')) continue;
    if (['Marco Salucci', 'Clara Musicco', 'Otto', 'Benny', 'Rudy', 'Leo', 'Bruno', 'Nina', 'Rino', 'Home', 'CSA Books 4 Kids', 'Kids', '4 Kids', 'IT', 'EN', 'DE', 'FR', 'ES', 'NL', 'PL', 'SE', 'JP', 'Italiano', 'English', 'Deutsch', 'Français', 'Español', 'Nederlands', 'Polski', 'Svenska', '日本語'].includes(text)) continue;
    if (text.includes('@csabooks') || text.includes('csabooks.kids@gmail.com') || text.includes('Spotify')) continue;
    if (['Email', 'Instagram', 'TikTok', 'YouTube', '★★★★★', '🌟', '🎨', '🤝', '🧭', '🔬', '🐙', '📱', '🧩'].includes(text)) continue;

    const line = content.slice(0, match.index).split('\n').length;
    list.push({ line, tag, text });
  }
  console.log('\n=================== ' + file + ' (' + list.length + ') ===================');
  list.forEach(item => console.log('[L' + item.line + '] <' + item.tag + '>: ' + item.text));
});
