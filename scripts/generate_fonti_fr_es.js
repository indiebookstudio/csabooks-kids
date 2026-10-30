const fs = require('fs');
const path = require('path');

// Titles mapping
const titlesFR = {
  'SC-00': 'Einstein, lumière et micro-ondes',
  'SC-01': 'La pieuvre fait équipe',
  'SC-02': 'Le cacatoès ouvre le robinet',
  'SC-03': 'Les éléphants et leurs appels',
  'SC-04': 'Les orques et l’algue',
  'SC-05': 'La baleine et les bulles',
  'SC-06': 'Les corbeaux savent compter',
  'SC-07': 'Loki dans les abysses',
  'SC-08': 'La chenille masquée',
  'SC-09': 'La plante qu’on n’entend pas',
  'SC-10': 'Le champignon change de chemin',
  'SC-11': 'Des spores dans l’espace',
  'SC-12': 'Des pousses dans la poussière lunaire',
  'SC-13': 'La fougère au super-ADN',
  'SC-14': 'Le piège sous la terre',
  'SC-15': 'Le poisson prend le volant',
  'SC-16': 'Les bourdons qui jouent au ballon',
  'SC-17': 'Le chien et les mots',
  'SC-18': 'Des toilettes pour les veaux',
  'SC-19': 'Le chat et la fente',
  'SC-20': 'La physique des pâtes',
  'SC-21': 'Dinosaures à plumes',
  'SC-22': 'Un dinosaure dans le poulailler',
  'SC-23': 'Peut-on cloner un dinosaure ?',
  'SC-24': 'Un monde ancien gravé dans l’ADN',
  'SC-25': 'Le puissant mégalodon',
  'SC-26': 'Le dodo peut-il revenir ?',
  'SC-27': 'Le tigre de Tasmanie',
  'SC-28': 'Un avenir pour les mammouths ?',
  'SC-29': 'Une souris en manteau de laine',
  'SC-30': 'Le loup géant est-il de retour ?',
  'SC-31': 'Cellules d’hier, petits d’aujourd’hui',
  'SC-32': 'Du bois qui laisse passer la lumière',
  'SC-33': 'Un ressort électrique',
  'SC-34': 'Une trompe de robot',
  'SC-35': 'Des robots en origami',
  'SC-36': 'Un champignon relié à un robot',
  'SC-37': 'Un tout petit robot',
  'SC-38': 'Un robot qui vole comme un insecte',
  'SC-39': 'Une graine avec tire-bouchon',
  'SC-40': 'De la laine de mouton aux dents',
  'SC-41': 'Un saut vers le vol',
  'SC-42': 'Un clone serait-il un autre toi ?',
  'SC-43': 'Le genou bionique',
  'SC-44': 'Aider les personnes à voir',
  'SC-45': 'Des lentilles pour lumière invisible',
  'SC-46': 'Une nouvelle voie pour la parole',
  'SC-47': 'Des sucres sur un astéroïde',
  'SC-48': 'Saturne et ses lunes',
  'SC-49': 'L’histoire d’une planète révélée par la lumière',
  'SC-50': 'Un anneau inattendu',
  'SC-51': 'Des vents à une vitesse folle',
  'SC-52': 'Une comète interstellaire',
  'SC-53': 'Retour sur la Lune',
  'SC-54': 'Une ville sur Mars ?',
  'SC-55': 'La première image d’un trou noir',
  'EX-01': 'Un dollar, un billion'
};

const titlesES = {
  'SC-00': 'Einstein, luz y microondas',
  'SC-01': 'El pulpo hace equipo',
  'SC-02': 'El truco del cacatúa para beber',
  'SC-03': 'Los elefantes y sus llamadas',
  'SC-04': 'Las orcas y su herramienta de algas',
  'SC-05': 'La ballena y su red de burbujas',
  'SC-06': 'Los cuervos saben contar',
  'SC-07': 'Loki en los abismos marinos',
  'SC-08': 'La oruga camuflada',
  'SC-09': 'La planta que no puedes oír',
  'SC-10': 'Un hongo encuentra su camino',
  'SC-11': 'Esporas en el espacio',
  'SC-12': 'Brotes en polvo lunar',
  'SC-13': 'El helecho con ADN gigante',
  'SC-14': 'La trampa bajo tierra',
  'SC-15': 'El pez que conduce un vehículo',
  'SC-16': 'Abejorros jugando a la pelota',
  'SC-17': 'Los perros y sus palabras',
  'SC-18': 'Entrenamiento de aseo para terneros',
  'SC-19': '¿Puede un gato pasar por la rendija?',
  'SC-20': 'La física en los espaguetis',
  'SC-21': 'Dinosaurios con plumas',
  'SC-22': 'Un dinosaurio en el gallinero',
  'SC-23': '¿Se puede clonar un dinosaurio?',
  'SC-24': 'Un mundo antiguo grabado en el ADN',
  'SC-25': 'El temible megalodón',
  'SC-26': '¿Podría volver el dodo?',
  'SC-27': 'El tigre de Tasmania',
  'SC-28': '¿Un futuro para los mamuts?',
  'SC-29': 'Un ratón con abrigo de lana',
  'SC-30': '¿Ha regresado el lobo gigante?',
  'SC-31': 'Células de ayer, cachorros de hoy',
  'SC-32': 'Madera que deja pasar la luz',
  'SC-33': 'Un muelle eléctrico',
  'SC-34': 'Una trompa para robots',
  'SC-35': 'Robots que se pliegan como origami',
  'SC-36': 'Un hongo conectado a un robot',
  'SC-37': 'Un robot diminuto',
  'SC-38': 'Un robot que vuela como un insecto',
  'SC-39': 'Una semilla con sacacorchos',
  'SC-40': 'De la lana de oveja a los dientes',
  'SC-41': 'Un salto hacia el vuelo',
  'SC-42': '¿Un clon sería otro tú?',
  'SC-43': 'La rodilla biónica',
  'SC-44': 'Una ayuda para volver a ver',
  'SC-45': 'Lentes para ver luz invisible',
  'SC-46': 'Un nuevo camino para recuperar la voz',
  'SC-47': 'Azúcares en un asteroide',
  'SC-48': 'Saturno y sus lunas',
  'SC-49': 'La historia de un planeta revelada por la luz',
  'SC-50': 'Un anillo inesperado',
  'SC-51': 'Vientos a velocidad increíble',
  'SC-52': 'Un cometa interestelar',
  'SC-53': 'Regreso a la Luna',
  'SC-54': '¿Una ciudad en Marte?',
  'SC-55': 'La primera imagen de un agujero negro',
  'EX-01': 'Un dólar, un billón'
};

function translateNotes(note, lang) {
  if (!note) return '';
  if (lang === 'fr') {
    return note
      .replace(/Fonti integrative disponibili/g, 'Sources complémentaires disponibles')
      .replace(/Integrative sources available/g, 'Sources complémentaires disponibles')
      .replace(/Stampa pagina web - estratto introduttivo/g, 'Impression page web - extrait introductif')
      .replace(/Stampa pagina web/g, 'Impression page web')
      .replace(/PDF originale/g, 'PDF original')
      .replace(/Original PDF/g, 'PDF original')
      .replace(/Correzione autori/g, 'Correction des auteurs')
      .replace(/Author correction/g, 'Correction des auteurs')
      .replace(/Il sito Forbes blocca l’acquisizione integrale automatica: il PDF conserva titolo, firma, data e apertura del comunicato recuperati dall’indice web pubblico\. Non è un articolo scientifico e non ha un abstract\. Le fonti dei calcoli sono nei quattro PDF integrativi EX-01\./g,
        'Le site Forbes bloque l’acquisition intégrale automatique : le PDF conserve le titre, la signature, la date et l’ouverture du communiqué issus de l’index web public. Il ne s’agit pas d’un article scientifique et il ne comporte pas d’abstract. Les sources des calculs figurent dans les quatre PDF complémentaires EX-01.');
  } else if (lang === 'es') {
    return note
      .replace(/Fonti integrative disponibili/g, 'Fuentes complementarias disponibles')
      .replace(/Integrative sources available/g, 'Fuentes complementarias disponibles')
      .replace(/Stampa pagina web - estratto introduttivo/g, 'Impresión página web - extracto introductorio')
      .replace(/Stampa pagina web/g, 'Impresión página web')
      .replace(/PDF originale/g, 'PDF original')
      .replace(/Original PDF/g, 'PDF original')
      .replace(/Correzione autori/g, 'Corrección de los autores')
      .replace(/Author correction/g, 'Corrección de los autores')
      .replace(/Il sito Forbes blocca l’acquisizione integrale automatica: il PDF conserva titolo, firma, data e apertura del comunicato recuperati dall’indice web pubblico\. Non è un articolo scientifico e non ha un abstract\. Le fonti dei calcoli sono nei quattro PDF integrativi EX-01\./g,
        'El sitio Forbes bloquea la descarga completa automática: el PDF conserva el título, la firma, la fecha y el inicio del comunicado recuperados del índice público web. No es un artículo científico ni contiene abstract. Las fuentes de los cálculos se encuentran en los cuatro PDF complementarios EX-01.');
  }
  return note;
}

function parseCSVLine(line) {
  let row = [];
  let inQuotes = false;
  let field = '';
  for (let c = 0; c < line.length; c++) {
    const ch = line[c];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      row.push(field);
      field = '';
    } else {
      field += ch;
    }
  }
  row.push(field);
  return row;
}

function escapeCSVField(str) {
  if (!str) return '';
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const itContent = fs.readFileSync('assets/einstein/content/fonti_it.csv', 'utf8').trim().split('\n');
const header = itContent[0];

function generate(lang, titlesMap) {
  const outLines = [header];
  for (let i = 1; i < itContent.length; i++) {
    const row = parseCSVLine(itContent[i]);
    const code = row[0];
    const category = row[2];
    const citation = row[3];
    const url = row[4];
    const rawNote = row[5] || '';
    
    const title = titlesMap[code] || row[1];
    const note = translateNotes(rawNote, lang);
    
    const fields = [code, title, category, citation, url, note];
    outLines.push(fields.map(escapeCSVField).join(','));
  }
  return outLines.join('\n') + '\n';
}

const frCSV = generate('fr', titlesFR);
const esCSV = generate('es', titlesES);

fs.writeFileSync('assets/einstein/content/fonti_fr.csv', frCSV, 'utf8');
fs.writeFileSync('assets/einstein/content/fonti_es.csv', esCSV, 'utf8');

console.log('✅ Created content/fonti_fr.csv and content/fonti_es.csv successfully!');
