/**
 * Comprehensive injection of interactive event handler texts, clues, quiz feedback,
 * and tree/sample callbacks into EN, FR, and ES for all 7 Einstein animations.
 */
const fs = require('fs');
const path = require('path');

const TARGET_TREES = [
  'assets/einstein/bonus',
  'accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus'
];

function applyTranslations(filePath, lang, anim) {
  let c = fs.readFileSync(filePath, 'utf8');

  // -------------------------------------------------------------
  // 02.Felce.DNA
  // -------------------------------------------------------------
  if (anim === '02.Felce.DNA') {
    if (lang === 'en') {
      c = c.replace(/announce\('Il DNA della felce si srotola\. Guarda il righello\.'\);/g, "announce('The fern DNA unrolls. Watch the scale ruler.');");
      c = c.replace(/announce\('Oltre cento metri: questa felce contiene oltre cinquanta volte più DNA di noi\.'\);/g, "announce('Over one hundred meters: this fern holds more than 50 times more DNA than humans.');");
      c = c.replace(/\$\('ratio-note'\)\.textContent=S\.measured\?'Oltre 50 volte più DNA · confronto alla stessa scala':S\.measuring\?'La felce continua…':'Quanto sarà lungo quello della felce\?';/g,
        `$('ratio-note').textContent=S.measured?'Over 50 times more DNA · comparison at same scale':S.measuring?'The fern DNA keeps going…':'How long will the fern DNA be?';`);
      c = c.replace(/announce\('Viaggio automatico avviato\. Puoi metterlo in pausa in qualsiasi momento\.'\);/g, "announce('Automated tour started. You can pause it anytime.');");
      c = c.replace(/S\.top\?'Frontale':'Dall’alto'/g, "S.top?'Front view':'Top view'");
      c = c.replace(/S\.top\?'Passa alla vista frontale':'Passa alla vista dall’alto'/g, "S.top?'Switch to front view':'Switch to top view'");
      c = c.replace(/enabled\?'Disattiva i suoni':'Attiva i suoni'/g, "enabled?'Mute audio':'Turn on sound'");
      c = c.replace(/aria-label="Quale affermazione è corretta\?"/g, 'aria-label="Which statement is correct?"');
    } else if (lang === 'fr') {
      c = c.replace(/announce\('Il DNA della felce si srotola\. Guarda il righello\.'\);/g, "announce('L’ADN de la fougère se déroule. Regarde la règle graduée.');");
      c = c.replace(/announce\('Oltre cento metri: questa felce contiene oltre cinquanta volte più DNA di noi\.'\);/g, "announce('Plus de cent mètres : cette fougère contient plus de cinquante fois plus d’ADN que nous.');");
      c = c.replace(/\$\('ratio-note'\)\.textContent=S\.measured\?'Oltre 50 volte più DNA · confronto alla stessa scala':S\.measuring\?'La felce continua…':'Quanto sarà lungo quello della felce\?';/g,
        `$('ratio-note').textContent=S.measured?'Plus de 50 fois plus d’ADN · comparaison à la même échelle':S.measuring?'La fougère continue…':'Quelle sera la longueur de l’ADN de la fougère ?';`);
      c = c.replace(/announce\('Viaggio automatico avviato\. Puoi metterlo in pausa in qualsiasi momento\.'\);/g, "announce('Parcours automatique démarré. Tu peux faire une pause à tout moment.');");
      c = c.replace(/S\.top\?'Frontale':'Dall’alto'/g, "S.top?'Vue frontale':'Vue de dessus'");
      c = c.replace(/S\.top\?'Passa alla vista frontale':'Passa alla vista dall’alto'/g, "S.top?'Passer en vue frontale':'Passer en vue de dessus'");
      c = c.replace(/enabled\?'Disattiva i suoni':'Attiva i suoni'/g, "enabled?'Couper le son':'Activer le son'");
      c = c.replace(/aria-label="Quale affermazione è corretta\?"/g, 'aria-label="Quelle affirmation est correcte ?"');
    } else if (lang === 'es') {
      c = c.replace(/announce\('Il DNA della felce si srotola\. Guarda il righello\.'\);/g, "announce('El ADN del helecho se desenrolla. Observa la regla graduada.');");
      c = c.replace(/announce\('Oltre cento metri: questa felce contiene oltre cinquanta volte più DNA di noi\.'\);/g, "announce('Más de cien metros: este helecho contiene más de 50 veces más ADN que nosotros.');");
      c = c.replace(/\$\('ratio-note'\)\.textContent=S\.measured\?'Oltre 50 volte più DNA · confronto alla stessa scala':S\.measuring\?'La felce continua…':'Quanto sarà lungo quello della felce\?';/g,
        `$('ratio-note').textContent=S.measured?'Más de 50 veces más ADN · comparación a la misma escala':S.measuring?'El helecho continúa…':'¿Cuánto medirá el ADN del helecho?';`);
      c = c.replace(/announce\('Viaggio automatico avviato\. Puoi metterlo in pausa in qualsiasi momento\.'\);/g, "announce('Recorrido automático iniciado. Puedes pausarlo en cualquier momento.');");
      c = c.replace(/S\.top\?'Frontale':'Dall’alto'/g, "S.top?'Vista frontal':'Vista superior'");
      c = c.replace(/S\.top\?'Passa alla vista frontale':'Passa alla vista dall’alto'/g, "S.top?'Cambiar a vista frontal':'Cambiar a vista superior'");
      c = c.replace(/enabled\?'Disattiva i suoni':'Attiva i suoni'/g, "enabled?'Silenciar':'Activar sonido'");
      c = c.replace(/aria-label="Quale affermazione è corretta\?"/g, 'aria-label="¿Qué afirmación es correcta?"');
    }
  }

  // -------------------------------------------------------------
  // 03.Pesce.Veicolo
  // -------------------------------------------------------------
  if (anim === '03.Pesce.Veicolo') {
    if (lang === 'en') {
      c = c.replace(/aria-label="Quale dato aiuta a valutare l’apprendimento\?"/g, 'aria-label="Which measurement helps evaluate learning?"');
      c = c.replace(/<button data-answer="evidence">Tempo e bersagli raggiunti in più prove<\/button>/g, '<button data-answer="evidence">Time and targets reached across repeated trials</button>');
      c = c.replace(/<button data-answer="wheels">Il numero di ruote del veicolo<\/button>/g, '<button data-answer="wheels">The total number of wheels on the vehicle</button>');
      c = c.replace(/\$\('story-title'\)\.textContent='Servono più prove per capire se impara\勃;/, "$('story-title').textContent='Repeated trials are needed to evaluate learning.';");
      c = c.replace(/\$\('story-title'\)\.textContent='Servono più prove per capire se impara\.';/, "$('story-title').textContent='Repeated trials are needed to evaluate learning.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Il pesce può orientarsi in una situazione nuova\. Per capire se migliora, <strong>confrontiamo più prove<\/strong>\.';/, "$('story-text').innerHTML='The goldfish navigates a novel terrestrial environment. To verify learning, researchers <strong>compare multiple trials</strong>.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Esatto! Tempi e bersagli raggiunti, osservati in più prove, aiutano a valutare l’apprendimento\勃;/, "$('feedback').textContent='Correct! Travel times and target arrivals across trials demonstrate behavioral adaptation.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Esatto! Tempi e bersagli raggiunti, osservati in più prove, aiutano a valutare l’apprendimento\.';/, "$('feedback').textContent='Correct! Travel times and target arrivals across trials demonstrate behavioral adaptation.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Il numero di ruote descrive il veicolo\. Per studiare il pesce servono misure delle sue prestazioni in prove ripetute\勃;/, "$('feedback').textContent='Wheel count only describes mechanics. To test animal cognition, scientists measure navigation performance over repeated trials.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Il numero di ruote descrive il veicolo\. Per studiare il pesce servono misure delle sue prestazioni in prove ripetute\.';/, "$('feedback').textContent='Wheel count only describes mechanics. To test animal cognition, scientists measure navigation performance over repeated trials.';");
    } else if (lang === 'fr') {
      c = c.replace(/aria-label="Quale dato aiuta a valutare l’apprendimento\?"/g, 'aria-label="Quelle donnée aide à évaluer l’apprentissage ?"');
      c = c.replace(/<button data-answer="evidence">Tempo e bersagli raggiunti in più prove<\/button>/g, '<button data-answer="evidence">Temps et cibles atteintes sur plusieurs essais</button>');
      c = c.replace(/<button data-answer="wheels">Il numero di ruote del veicolo<\/button>/g, '<button data-answer="wheels">Le nombre de roues du véhicule</button>');
      c = c.replace(/\$\('story-title'\)\.textContent='Servono più prove per capire se impara\.';/, "$('story-title').textContent='Plusieurs essais sont requis pour évaluer l’apprentissage.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Il pesce può orientarsi in una situazione nuova\. Per capire se migliora, <strong>confrontiamo più prove<\/strong>\.';/, "$('story-text').innerHTML='Le poisson s’oriente dans un milieu inédit. Pour mesurer les progrès, les chercheurs <strong>comparent plusieurs essais</strong>.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Esatto! Tempi e bersagli raggiunti, osservati in più prove, aiutano a valutare l’apprendimento\.';/, "$('feedback').textContent='Exact ! Les temps de trajet et les cibles atteintes lors d’essais répétés permettent de quantifier l’apprentissage.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Il numero di ruote descrive il veicolo\. Per studiare il pesce servono misure delle sue prestazioni in prove ripetute\.';/, "$('feedback').textContent='Le nombre de roues caractérise la machine. Pour étudier l’animal, il faut mesurer ses performances sur plusieurs parcours répétés.';");
    } else if (lang === 'es') {
      c = c.replace(/aria-label="Quale dato aiuta a valutare l’apprendimento\?"/g, 'aria-label="¿Qué dato ayuda a evaluar el aprendizaje?"');
      c = c.replace(/<button data-answer="evidence">Tempo e bersagli raggiunti in più prove<\/button>/g, '<button data-answer="evidence">Tiempos y metas alcanzadas en múltiples pruebas</button>');
      c = c.replace(/<button data-answer="wheels">Il numero di ruote del veicolo<\/button>/g, '<button data-answer="wheels">El número de ruedas del vehículo</button>');
      c = c.replace(/\$\('story-title'\)\.textContent='Servono più prove per capire se impara\.';/, "$('story-title').textContent='Hacen falta múltiples pruebas para valorar el aprendizaje.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Il pesce può orientarsi in una situazione nuova\. Per capire se migliora, <strong>confrontiamo più prove<\/strong>\.';/, "$('story-text').innerHTML='El pez se orienta en un entorno nuevo. Para comprobar mejoras, los científicos <strong>comparan múltiples pruebas</strong>.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Esatto! Tempi e bersagli raggiunti, osservati in più prove, aiutano a valutare l’apprendimento\.';/, "$('feedback').textContent='¡Exacto! El tiempo y las metas logradas en pruebas repetidas permiten evaluar la navegación espacial.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Il numero di ruote descrive il veicolo\. Per studiare il pesce servono misure delle sue prestazioni in prove ripetute\.';/, "$('feedback').textContent='El número de ruedas describe el chasis. Para estudiar al pez se precisan mediciones de rendimiento en ensayos repetidos.';");
    }
  }

  // -------------------------------------------------------------
  // 04.Uccelli.Dinosauri
  // -------------------------------------------------------------
  if (anim === '04.Uccelli.Dinosauri') {
    if (lang === 'en') {
      c = c.replace(/\$\('story-title'\)\.textContent='Sei rilievi\. Un indizio di penne\.';/g, "$('story-title').textContent='Six bone nodes: quill knob evidence.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Questi piccoli rilievi corrispondono a <strong>punti di attacco delle penne<\/strong>, confrontabili con quelli degli uccelli attuali\勃;/g, "$('story-text').innerHTML='These distinct bone bumps are <strong>quill knobs (feather attachment points)</strong>, identical to those found on modern flying birds.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Questi piccoli rilievi corrispondono a <strong>punti di attacco delle penne<\/strong>, confrontabili con quelli degli uccelli attuali\.';/g, "$('story-text').innerHTML='These distinct bone bumps are <strong>quill knobs (feather attachment points)</strong>, identical to those found on modern flying birds.';");
      c = c.replace(/\$\('detail-badge'\)\.textContent='SEI PUNTI DI ATTACCO · SULL’ULNA';/g, "$('detail-badge').textContent='SIX ATTACHMENT POINTS · ON ULNA BONE';");
      c = c.replace(/\$\('story-title'\)\.textContent='Le ossa possono raccontare le piume\.';/g, "$('story-title').textContent='Fossil bones reveal plumage evidence.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Le penne qui sono illustrative\. L’osso è un indizio della loro presenza: <strong>non rivela l’intero piumaggio né i suoi colori<\/strong>\.';/g, "$('story-text').innerHTML='These feathers are illustrative. Bone markings confirm feather presence but <strong>do not reveal plumage colors or full body coverage</strong>.';");
      c = c.replace(/const copy=\[null,\['Partiamo dagli antenati comuni\.','L’albero collega i gruppi attraverso <strong>antenati comuni<\/strong>\. Il punto di partenza non è un T\. rex\.'\],\['La parentela si divide in rami\.','T\. rex e Velociraptor occupano rami estinti\. Gli uccelli sono <strong>un altro ramo dei teropodi<\/strong>\.'\],\['Il ramo degli uccelli arriva a noi\.','Alcune linee di uccelli superarono l’estinzione di 66 milioni di anni fa\. <strong>Il pollo appartiene a quel ramo vivente\.<\/strong>'\],?\]\[step\];/g,
        `const copy=[null,['Starting from common ancestors.','The phylogenetic tree unites groups through <strong>shared ancestors</strong>. The root is not a T. rex.'],['Lineages branch into distinct evolutionary trees.','T. rex and Velociraptor represent extinct theropod branches. Modern birds form <strong>another living theropod lineage</strong>.'],['The avian branch thrives into the present day.','Certain bird lineages survived the mass extinction 66 million years ago. <strong>The domestic chicken belongs to that living dinosaur branch.</strong>']][step];`);
      c = c.replace(/\$\('story-title'\)\.textContent='I dinosauri sono ancora tra noi\.';/g, "$('story-title').textContent='Dinosaurs still walk and fly among us.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Ogni uccello è un <strong>dinosauro aviano<\/strong>\. Il pollo e il T\. rex hanno antenati comuni, su rami diversi\.';/g, "$('story-text').innerHTML='Every living bird is an <strong>avian dinosaur</strong>. Chickens and T. rex share ancient common theropod ancestors on separate branches.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Esatto! Il ramo degli uccelli fa parte dei dinosauri e arriva fino a oggi\.';/g, "$('feedback').textContent='Correct! The avian lineage is part of the theropod tree and flourishes today.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Il T\. rex è su un altro ramo\. Pollo e T\. rex condividono antenati comuni: uno non deriva dall’altro\.';/g, "$('feedback').textContent='T. rex sits on an extinct branch. Chickens and T. rex share deep common ancestors; one did not evolve from the other.';");
    } else if (lang === 'fr') {
      c = c.replace(/\$\('story-title'\)\.textContent='Sei rilievi\. Un indizio di penne\.';/g, "$('story-title').textContent='Six reliefs : l’empreinte de plumes.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Questi piccoli rilievi corrispondono a <strong>punti di attacco delle penne<\/strong>, confrontabili con quelli degli uccelli attuali\.';/g, "$('story-text').innerHTML='Ces petits reliefs correspondent à des <strong>points d’ancrage des rémiges (papilles ulnaires)</strong>, semblables à ceux des oiseaux actuels.';");
      c = c.replace(/\$\('detail-badge'\)\.textContent='SEI PUNTI DI ATTACCO · SULL’ULNA';/g, "$('detail-badge').textContent='SIX POINTS D’ATTACHE · SUR L’ULNA';");
      c = c.replace(/\$\('story-title'\)\.textContent='Le ossa possono raccontare le piume\.';/g, "$('story-title').textContent='Les fossiles dévoilent le plumage.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Le penne qui sono illustrative\. L’osso è un indizio della loro presenza: <strong>non rivela l’intero piumaggio né i suoi colori<\/strong>\.';/g, "$('story-text').innerHTML='Les plumes ici sont illustratives. L’os prouve leur présence mais <strong>ne révèle ni l’ensemble du plumage ni ses couleurs exactes</strong>.';");
      c = c.replace(/const copy=\[null,\['Partiamo dagli antenati comuni\.','L’albero collega i gruppi attraverso <strong>antenati comuni<\/strong>\. Il punto di partenza non è un T\. rex\.'\],\['La parentela si divide in rami\.','T\. rex e Velociraptor occupano rami estinti\. Gli uccelli sono <strong>un altro ramo dei teropodi<\/strong>\.'\],\['Il ramo degli uccelli arriva a noi\.','Alcune linee di uccelli superarono l’estinzione di 66 milioni di anni fa\. <strong>Il pollo appartiene a quel ramo vivente\.<\/strong>'\],?\]\[step\];/g,
        `const copy=[null,['Partons des ancêtres communs.','L’arbre généalogique relie les espèces par des <strong>ancêtres communs</strong>. Le point d’origine n’est pas un T. rex.'],['La parenté se divise en rameaux distincts.','T. rex et Vélociraptor occupent des branches éteintes. Les oiseaux représentent <strong>un autre rameau de théropodes</strong>.'],['Le rameau aviaire parvient jusqu’à nous.','Des lignées d’oiseaux ont survécu à la grande extinction il y a 66 millions d’années. <strong>La poule fait partie de cette branche vivante.</strong>']][step];`);
      c = c.replace(/\$\('story-title'\)\.textContent='I dinosauri sono ancora tra noi\.';/g, "$('story-title').textContent='Les dinosaures sont toujours parmi nous.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Ogni uccello è un <strong>dinosauro aviano<\/strong>\. Il pollo e il T\. rex hanno antenati comuni, su rami diversi\.';/g, "$('story-text').innerHTML='Tout oiseau moderne est un <strong>dinosaure aviaire</strong>. La poule et le T. rex partagent des ancêtres communs sur des rameaux frères.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Esatto! Il ramo degli uccelli fa parte dei dinosauri e arriva fino a oggi\.';/g, "$('feedback').textContent='Exact ! Le rameau des oiseaux appartient aux dinosaures théropodes et perdure de nos jours.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Il T\. rex è su un altro ramo\. Pollo e T\. rex condividono antenati comuni: uno non deriva dall’altro\.';/g, "$('feedback').textContent='Le T. rex est sur une branche éteinte. Poule et T. rex partagent des ancêtres communs : l’un ne descend pas directement de l’autre.';");
    } else if (lang === 'es') {
      c = c.replace(/\$\('story-title'\)\.textContent='Sei rilievi\. Un indizio di penne\.';/g, "$('story-title').textContent='Seis nódulos: huella de plumas fósiles.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Questi piccoli rilievi corrispondono a <strong>punti di attacco delle penne<\/strong>, confrontabili con quelli degli uccelli attuali\.';/g, "$('story-text').innerHTML='Estos pequeños nódulos son <strong>papilas ulnares (puntos de anclaje de plumas)</strong>, comparables a los de las aves modernas.';");
      c = c.replace(/\$\('detail-badge'\)\.textContent='SEI PUNTI DI ATTACCO · SULL’ULNA';/g, "$('detail-badge').textContent='SEIS PUNTOS DE INSERCIÓN · EN LA ULNA';");
      c = c.replace(/\$\('story-title'\)\.textContent='Le ossa possono raccontare le piume\.';/g, "$('story-title').textContent='Los fósiles revelan el plumaje.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Le penne qui sono illustrative\. L’osso è un indizio della loro presenza: <strong>non rivela l’intero piumaggio né i suoi colori<\/strong>\.';/g, "$('story-text').innerHTML='Las plumas son ilustrativas. El hueso demuestra su presencia pero <strong>no revela los colores exactos ni la cobertura completa</strong>.';");
      c = c.replace(/const copy=\[null,\['Partiamo dagli antenati comuni\.','L’albero collega i gruppi attraverso <strong>antenati comuni<\/strong>\. Il punto di partenza non è un T\. rex\.'\],\['La parentela si divide in rami\.','T\. rex e Velociraptor occupano rami estinti\. Gli uccelli sono <strong>un altro ramo dei teropodi<\/strong>\.'\],\['Il ramo degli uccelli arriva a noi\.','Alcune linee di uccelli superarono l’estinzione di 66 milioni di anni fa\. <strong>Il pollo appartiene a quel ramo vivente\.<\/strong>'\],?\]\[step\];/g,
        `const copy=[null,['Partimos de ancestros comunes.','El árbol evolutivo conecta linajes mediante <strong>ancestros compartidos</strong>. El punto de partida no es un T. rex.'],['El parentesco se divide en ramas distintas.','T. rex y Velociraptor ocupan ramas extintas. Las aves actuales forman <strong>otra rama de dinosaurios terópodos</strong>.'],['La rama aviar florece hasta nuestros días.','Algunos linajes de aves sobrevivieron a la extinción hace 66 millones de años. <strong>La gallina pertenece a esa rama viva.</strong>']][step];`);
      c = c.replace(/\$\('story-title'\)\.textContent='I dinosauri sono ancora tra noi\.';/g, "$('story-title').textContent='Los dinosaurios siguen entre nosotros.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Ogni uccello è un <strong>dinosauro aviano<\/strong>\. Il pollo e il T\. rex hanno antenati comuni, su rami diversi\.';/g, "$('story-text').innerHTML='Cualquier ave moderna es un <strong>dinosaurio aviar</strong>. La gallina y el T. rex comparten ancestros comunes en ramas evolutivas hermanas.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Esatto! Il ramo degli uccelli fa parte dei dinosauri e arriva fino a oggi\.';/g, "$('feedback').textContent='¡Exacto! La rama de las aves forma parte del grupo de los dinosaurios y llega hasta hoy.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Il T\. rex è su un altro ramo\. Pollo e T\. rex condividono antenati comuni: uno non deriva dall’altro\.';/g, "$('feedback').textContent='El T. rex está en una rama extinta. Gallina y T. rex comparten ancestros comunes: una no desciende directamente del otro.';");
    }
  }

  // -------------------------------------------------------------
  // 05.Fungo.Robot
  // -------------------------------------------------------------
  if (anim === '05.Fungo.Robot') {
    if (lang === 'en') {
      c = c.replace(/const checks=\[S\.seenTrials\.has\('natural'\)\?'Spontanea ✓':'Spontanea',S\.seenTrials\.has\('uv'\)\?'UV ✓':'UV',S\.seenTrials\.has\('off'\)\?'Scollegata ✓':'Scollegata'\];/g,
        "const checks=[S.seenTrials.has('natural')?'Spontaneous ✓':'Spontaneous',S.seenTrials.has('uv')?'UV light ✓':'UV light',S.seenTrials.has('off')?'Disconnected ✓':'Disconnected'];");
      c = c.replace(/\$\('story-title'\)\.textContent='Vivente \+ macchina = bioibrido\.';/g, "$('story-title').textContent='Living tissue + machine = biohybrid robot.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Il micelio produce segnali\. <strong>L’interfaccia li elabora<\/strong> e comanda i motori: il collegamento è progettato\.';/g, "$('story-text').innerHTML='Mycelium produces bioelectric pulses. <strong>The electronic interface decodes them</strong> to drive motors: a symbiotic engineered link.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Esatto! Gli elettrodi rilevano; l’elettronica traduce il segnale in comandi\.';/g, "$('feedback').textContent='Correct! Electrodes capture pulses; the electronic circuitry translates bio-signals into mechanical drive commands.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Gli elettrodi raccolgono il segnale\. Per comandare i motori serve anche l’interfaccia che lo elabora\.';/g, "$('feedback').textContent='Electrodes only gather electrical spikes. To control robot motors, specialized processing hardware is essential.';");
    } else if (lang === 'fr') {
      c = c.replace(/const checks=\[S\.seenTrials\.has\('natural'\)\?'Spontanea ✓':'Spontanea',S\.seenTrials\.has\('uv'\)\?'UV ✓':'UV',S\.seenTrials\.has\('off'\)\?'Scollegata ✓':'Scollegata'\];/g,
        "const checks=[S.seenTrials.has('natural')?'Spontanée ✓':'Spontanée',S.seenTrials.has('uv')?'Lumière UV ✓':'Lumière UV',S.seenTrials.has('off')?'Déconnectée ✓':'Déconnectée'];");
      c = c.replace(/\$\('story-title'\)\.textContent='Vivente \+ macchina = bioibrido\.';/g, "$('story-title').textContent='Tissu vivant + machine = robot biohybride.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Il micelio produce segnali\. <strong>L’interfaccia li elabora<\/strong> e comanda i motori: il collegamento è progettato\.';/g, "$('story-text').innerHTML='Le mycélium produit des signaux bioélectriques. <strong>L’interface électronique les décode</strong> pour commander les moteurs.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Esatto! Gli elettrodi rilevano; l’elettronica traduce il segnale in comandi\.';/g, "$('feedback').textContent='Exact ! Les électrodes captent les signaux ; le circuit électronique les traduit en commandes motrices.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Gli elettrodi raccolgono il segnale\. Per comandare i motori serve anche l’interfaccia che lo elabora\.';/g, "$('feedback').textContent='Les électrodes captent simplement l’impulsion. Pour guider un robot, une interface de traitement est indispensable.';");
    } else if (lang === 'es') {
      c = c.replace(/const checks=\[S\.seenTrials\.has\('natural'\)\?'Spontanea ✓':'Spontanea',S\.seenTrials\.has\('uv'\)\?'UV ✓':'UV',S\.seenTrials\.has\('off'\)\?'Scollegata ✓':'Scollegata'\];/g,
        "const checks=[S.seenTrials.has('natural')?'Espontánea ✓':'Espontánea',S.seenTrials.has('uv')?'Luz UV ✓':'Luz UV',S.seenTrials.has('off')?'Desconectada ✓':'Desconectada'];");
      c = c.replace(/\$\('story-title'\)\.textContent='Vivente \+ macchina = bioibrido\.';/g, "$('story-title').textContent='Ser vivo + máquina = robot biohíbrido.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Il micelio produce segnali\. <strong>L’interfaccia li elabora<\/strong> e comanda i motori: il collegamento è progettato\.';/g, "$('story-text').innerHTML='El micelio emite pulsos bioeléctricos. <strong>La interfaz electrónica los procesa</strong> para accionar los motores.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Esatto! Gli elettrodi rilevano; l’elettronica traduce il segnale in comandi\.';/g, "$('feedback').textContent='¡Exacto! Los electrodos detectan las señales; la electrónica convierte esos datos en órdenes de movimiento.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Gli elettrodi raccolgono il segnale\. Per comandare i motori serve anche l’interfaccia che lo elabora\.';/g, "$('feedback').textContent='Los electrodos solo recogen los impulsos. Para dirigir motores hace falta una interfaz de procesamiento informático.';");
    }
  }

  // -------------------------------------------------------------
  // 06.Ginocchio.Bionico
  // -------------------------------------------------------------
  if (anim === '06.Ginocchio.Bionico') {
    if (lang === 'en') {
      c = c.replace(/aria-label="Che cosa possiamo concludere dal piccolo studio\?"/g, 'aria-label="What can we conclude from this initial study?"');
      c = c.replace(/\$\('story-title'\)\.textContent='Una strada da studiare, persona per persona\.';/g, "$('story-title').textContent='A medical pathway requiring individualized study.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Il risultato è promettente\. Servono <strong>studi più ampi<\/strong>, valutazioni individuali e riabilitazione\.';/g, "$('story-text').innerHTML='The outcome is highly promising. Further progress requires <strong>larger cohorts</strong>, personalized assessments, and dedicated therapy.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Esatto! Pochi partecipanti aiutano a esplorare una soluzione; non dimostrano che sia adatta a tutti\.';/g, "$('feedback').textContent='Correct! A small trial cohort validates feasibility without claiming universal applicability immediately.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Uno studio piccolo non basta per estendere il risultato a ogni persona\. La soluzione richiede procedure specialistiche e altre verifiche\.';/g, "$('feedback').textContent='A small pilot study cannot be generalized to everyone immediately. Specialized surgical protocols and wider clinical trials are necessary.';");
    } else if (lang === 'fr') {
      c = c.replace(/aria-label="Che cosa possiamo concludere dal piccolo studio\?"/g, 'aria-label="Que pouvons-nous conclure de cette étude pilote ?"');
      c = c.replace(/\$\('story-title'\)\.textContent='Una strada da studiare, persona per persona\.';/g, "$('story-title').textContent='Une avancée à étudier, personne par personne.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Il risultato è promettente\. Servono <strong>studi più ampi<\/strong>, valutazioni individuali e riabilitazione\.';/g, "$('story-text').innerHTML='Les résultats sont prometteurs. Des <strong>études cliniques plus vastes</strong>, des évaluations personnalisées et de la rééducation sont nécessaires.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Esatto! Pochi partecipanti aiutano a esplorare una soluzione; non dimostrano che sia adatta a tutti\.';/g, "$('feedback').textContent='Exact ! Un groupe restreint permet de tester le concept sans prétendre qu’il convienne d’emblée à chaque patient.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Uno studio piccolo non basta per estendere il risultato a ogni persona\. La soluzione richiede procedure specialistiche e altre verifiche\.';/g, "$('feedback').textContent='Une étude pilote ne permet pas de généraliser d’office. Ce dispositif nécessite un protocole chirurgical précis et d’autres vérifications.';");
    } else if (lang === 'es') {
      c = c.replace(/aria-label="Che cosa possiamo concludere dal piccolo studio\?"/g, 'aria-label="¿Qué podemos concluir de este estudio piloto?"');
      c = c.replace(/\$\('story-title'\)\.textContent='Una strada da studiare, persona per persona\.';/g, "$('story-title').textContent='Un avance médico a estudiar caso por caso.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Il risultato è promettente\. Servono <strong>studi più ampi<\/strong>, valutazioni individuali e riabilitazione\.';/g, "$('story-text').innerHTML='El resultado es prometedor. Se precisan <strong>estudios más extensos</strong>, valoraciones individuales y rehabilitación adecuada.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Esatto! Pochi partecipanti aiutano a esplorare una soluzione; non dimostrano che sia adatta a tutti\.';/g, "$('feedback').textContent='¡Exacto! Un grupo reducido sirve para validar el concepto sin implicar que sea aplicable de inmediato a todas las personas.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Uno studio piccolo non basta per estendere il risultato a ogni persona\. La soluzione richiede procedure specialistiche e altre verifiche\.';/g, "$('feedback').textContent='Un estudio piloto no permite generalizar a cualquier paciente. Requiere cirugías avanzadas y ensayos clínicos más amplios.';");
    }
  }

  // -------------------------------------------------------------
  // 07.Buco.Nero
  // -------------------------------------------------------------
  if (anim === '07.Buco.Nero') {
    if (lang === 'en') {
      c = c.replace(/setStatus\('Collega i quattro gruppi di strumenti'\);/g, "setStatus('Connect all four telescope arrays');");
      c = c.replace(/\$\('sample-name'\)\.textContent='Scegli quante misure confrontare';/g, "$('sample-name').textContent='Choose measurement sampling density';");
      c = c.replace(/\$\('story-title'\)\.textContent='Sette strumenti\. Cinque luoghi\. Una squadra\.';/g, "$('story-title').textContent='Seven instruments. Five locations. One team.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Le osservazioni di M87\* del 2017 coinvolsero <strong>sette strumenti in cinque siti<\/strong>\. Ora passiamo dai segnali ai dati\.';/g, "$('story-text').innerHTML='The 2017 M87* observations linked <strong>seven radio observatories across five world regions</strong>. Now let us turn signals into imaging data.';");
      c = c.replace(/\$\('sample-name'\)\.textContent=mode==='few'\?'Pochi campioni · informazioni mancanti':'Più campioni · più vincoli';/g,
        "$('sample-name').textContent=mode==='few'?'Sparse coverage · missing data gaps':'Denser sampling · constrained reconstruction';");
      c = c.replace(/\$\('story-title'\)\.textContent=mode==='few'\?'Con poche misure manca molta informazione\.':'Più misure aiutano a vincolare la ricostruzione\.';/g,
        "$('story-title').textContent=mode==='few'?'Few measurements leave extensive data gaps.':'More baselines constrain the image reconstruction.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML=mode==='few'\?'Il modello conserva soltanto alcuni campioni\. Le strutture spurie mostrano perché <strong>ricostruire non è semplicemente scattare<\/strong>\.':'Nel modello l’anello risulta più riconoscibile\. Per l’immagine reale servirono anche <strong>calibrazione, algoritmi e controlli indipendenti<\/strong>\.';/g,
        "$('story-text').innerHTML=mode==='few'?'Sparse sampling creates spurious imaging artifacts: <strong>reconstructing is not simply snapping a photo</strong>.':'With denser sampling, the ring emerges clearly. Creating the real image required <strong>calibration, independent algorithms, and blinded cross-checks</strong>.';");
      c = c.replace(/\$\('story-title'\)\.textContent='La rete ha reso osservabile l’ombra\.';/g, "$('story-title').textContent='The synchronized array revealed the black hole shadow.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Strumenti lontani, dati combinati e <strong>molti controlli<\/strong>: un risultato della collaborazione\.';/g, "$('story-text').innerHTML='Distant radio dishes, combined petabytes, and <strong>rigorous cross-checks</strong>: a triumph of global scientific collaboration.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Esatto! L’immagine è ricostruita da osservazioni radio, poi rappresentata in colore\.';/g, "$('feedback').textContent='Correct! The image was synthesized from radio wave observations and rendered in false-color representation.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Gli strumenti sono rimasti sulla Terra\. L’immagine è stata ricostruita combinando segnali radio di una rete\.';/g, "$('feedback').textContent='The telescopes stayed on Earth. The image was reconstructed by synchronizing atomic-clocked radio signals across the globe.';");
      c = c.replace(/text:'ALMA e APEX · due strumenti nel deserto di Atacama'/g, "text:'ALMA & APEX · two facilities in the Atacama Desert'");
      c = c.replace(/text:'SMA e JCMT · due strumenti a Maunakea'/g, "text:'SMA & JCMT · two observatories on Maunakea'");
      c = c.replace(/text:'SMT in Arizona · LMT in Messico'/g, "text:'SMT in Arizona · LMT in Mexico'");
      c = c.replace(/text:'IRAM 30 metri · Pico Veleta'/g, "text:'IRAM 30-meter telescope · Pico Veleta, Spain'");
      c = c.replace(/aria-label="Collega i gruppi di radiotelescopi del 2017"/g, 'aria-label="Connect the 2017 radio telescope arrays"');
      c = c.replace(/aria-label="Leggi l’immagine ufficiale"/g, 'aria-label="Inspect features of the official image"');
      c = c.replace(/aria-label="Come è stata ottenuta l’immagine di M87\?"/g, 'aria-label="How was the M87* black hole image captured?"');
    } else if (lang === 'fr') {
      c = c.replace(/setStatus\('Collega i quattro gruppi di strumenti'\);/g, "setStatus('Connecte les quatre observatoires de la Terre');");
      c = c.replace(/\$\('sample-name'\)\.textContent='Scegli quante misure confrontare';/g, "$('sample-name').textContent='Choisis la densité de mesures à comparer';");
      c = c.replace(/\$\('story-title'\)\.textContent='Sette strumenti\. Cinque luoghi\. Una squadra\.';/g, "$('story-title').textContent='Sept instruments. Cinq sites. Une équipe mondiale.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Le osservazioni di M87\* del 2017 coinvolsero <strong>sette strumenti in cinque siti<\/strong>\. Ora passiamo dai segnali ai dati\.';/g, "$('story-text').innerHTML='Les observations de 2017 ont mobilisé <strong>sept radiotélescopes répartis sur cinq sites</strong>. Passons maintenant des ondes aux données visuelles.';");
      c = c.replace(/\$\('sample-name'\)\.textContent=mode==='few'\?'Pochi campioni · informazioni mancanti':'Più campioni · più vincoli';/g,
        "$('sample-name').textContent=mode==='few'?'Échantillonnage réduit · données manquantes':'Échantillonnage dense · reconstruction guidée';");
      c = c.replace(/\$\('story-title'\)\.textContent=mode==='few'\?'Con poche misure manca molta informazione\.':'Più misure aiutano a vincolare la ricostruzione\.';/g,
        "$('story-title').textContent=mode==='few'?'Avec peu de mesures, de grandes lacunes subsistent.':'Davantage de données affinent la reconstruction.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML=mode==='few'\?'Il modello conserva soltanto alcuni campioni\. Le strutture spurie mostrano perché <strong>ricostruire non è semplicemente scattare<\/strong>\.':'Nel modello l’anello risulta più riconoscibile\. Per l’immagine reale servirono anche <strong>calibrazione, algoritmi e controlli indipendenti<\/strong>\.';/g,
        "$('story-text').innerHTML=mode==='few'?'Un échantillonnage épars crée des artéfacts : <strong>reconstruire ne consiste pas à prendre une photo<\/strong>.':'Avec plus de données, l’anneau apparaît nettement. Pour la vraie image, il a fallu <strong>calibration, algorithmes et contrôles indépendants<\/strong>.';");
      c = c.replace(/\$\('story-title'\)\.textContent='La rete ha reso osservabile l’ombra\.';/g, "$('story-title').textContent='Le réseau synchronisé a révélé l’ombre du trou noir.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Strumenti lontani, dati combinati e <strong>molti controlli<\/strong>: un risultato della collaborazione\.';/g, "$('story-text').innerHTML='Des antennes réparties sur la planète, des pétaoctets de données et des <strong>vérifications indépendantes<\/strong> : un exploit collectif.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Esatto! L’immagine è ricostruita da osservazioni radio, poi rappresentata in colore\.';/g, "$('feedback').textContent='Exact ! L’image est reconstituée à partir d’ondes radioélectriques puis mise en fausses couleurs.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Gli strumenti sono rimasti sulla Terra\. L’immagine è stata ricostruita combinando segnali radio di una rete\.';/g, "$('feedback').textContent='Les télescopes sont restés sur Terre. L’image a été reconstruite en combinant les ondes captées à l’échelle planétaire.';");
      c = c.replace(/text:'ALMA e APEX · due strumenti nel deserto di Atacama'/g, "text:'ALMA et APEX · deux observatoires dans le désert d’Atacama'");
      c = c.replace(/text:'SMA e JCMT · due strumenti a Maunakea'/g, "text:'SMA et JCMT · deux télescopes au sommet du Maunakea'");
      c = c.replace(/text:'SMT in Arizona · LMT in Messico'/g, "text:'SMT en Arizona · LMT au Mexique'");
      c = c.replace(/text:'IRAM 30 metri · Pico Veleta'/g, "text:'Télescope IRAM de 30 mètres · Pico Veleta, Espagne'");
      c = c.replace(/aria-label="Collega i gruppi di radiotelescopi del 2017"/g, 'aria-label="Connecter les radiotélescopes de 2017"');
      c = c.replace(/aria-label="Leggi l’immagine ufficiale"/g, 'aria-label="Explorer l’image officielle"');
      c = c.replace(/aria-label="Come è stata ottenuta l’immagine di M87\?"/g, 'aria-label="Comment a été obtenue l’image de M87* ?"');
    } else if (lang === 'es') {
      c = c.replace(/setStatus\('Collega i quattro gruppi di strumenti'\);/g, "setStatus('Conecta las cuatro estaciones de radiotelescopios');");
      c = c.replace(/\$\('sample-name'\)\.textContent='Scegli quante misure confrontare';/g, "$('sample-name').textContent='Elige la densidad de medidas a comparar';");
      c = c.replace(/\$\('story-title'\)\.textContent='Sette strumenti\. Cinque luoghi\. Una squadra\.';/g, "$('story-title').textContent='Siete instrumentos. Cinco ubicaciones. Un equipo mundial.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Le osservazioni di M87\* del 2017 coinvolsero <strong>sette strumenti in cinque siti<\/strong>\. Ora passiamo dai segnali ai dati\.';/g, "$('story-text').innerHTML='Las observaciones de 2017 conectaron <strong>siete radiotelescopios en cinco sitios clave</strong>. Pasemos ahora de las ondas a la reconstrucción visual.';");
      c = c.replace(/\$\('sample-name'\)\.textContent=mode==='few'\?'Pochi campioni · informazioni mancanti':'Più campioni · più vincoli';/g,
        "$('sample-name').textContent=mode==='few'?'Muestreo disperso · lagunas de información':'Muestreo denso · reconstrucción delimitada';");
      c = c.replace(/\$\('story-title'\)\.textContent=mode==='few'\?'Con poche misure manca molta informazione\.':'Più misure aiutano a vincolare la ricostruzione\.';/g,
        "$('story-title').textContent=mode==='few'?'Con pocas medidas quedan amplias lagunas de datos.':'Más observaciones definen mejor la imagen.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML=mode==='few'\?'Il modello conserva soltanto alcuni campioni\. Le strutture spurie mostrano perché <strong>ricostruire non è semplicemente scattare<\/strong>\.':'Nel modello l’anello risulta più riconoscibile\. Per l’immagine reale servirono anche <strong>calibrazione, algoritmi e controlli indipendenti<\/strong>\.';/g,
        "$('story-text').innerHTML=mode==='few'?'Un muestreo disperso genera artefactos: <strong>reconstruir no es tomar una foto instantánea<\/strong>.':'Con más datos el anillo surge claramente. Para la imagen real se precisaron <strong>calibraciones, algoritmos y comprobaciones a ciegas<\/strong>.';");
      c = c.replace(/\$\('story-title'\)\.textContent='La rete ha reso osservabile l’ombra\.';/g, "$('story-title').textContent='La red sincronizada hizo visible la sombra.';");
      c = c.replace(/\$\('story-text'\)\.innerHTML='Strumenti lontani, dati combinati e <strong>molti controlli<\/strong>: un risultato della collaborazione\.';/g, "$('story-text').innerHTML='Antenas distantes, petabytes coordinados y <strong>múltiples comprobaciones independientes</strong>: un logro de la cooperación internacional.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Esatto! L’immagine è ricostruita da osservazioni radio, poi rappresentata in colore\.';/g, "$('feedback').textContent='¡Exacto! La imagen se sintetizó a partir de ondas de radio y se coloreó para su visualización.';");
      c = c.replace(/\$\('feedback'\)\.textContent='Gli strumenti sono rimasti sulla Terra\. L’immagine è stata ricostruita combinando segnali radio di una rete\.';/g, "$('feedback').textContent='Los telescopios no salieron de la Tierra. La imagen se logró combinando señales de radio sincronizadas con relojes atómicos.';");
      c = c.replace(/text:'ALMA e APEX · due strumenti nel deserto di Atacama'/g, "text:'ALMA y APEX · dos observatorios en el desierto de Atacama'");
      c = c.replace(/text:'SMA e JCMT · due strumenti a Maunakea'/g, "text:'SMA y JCMT · dos telescopios en Maunakea'");
      c = c.replace(/text:'SMT in Arizona · LMT in Messico'/g, "text:'SMT en Arizona · LMT en México'");
      c = c.replace(/text:'IRAM 30 metri · Pico Veleta'/g, "text:'Telescopio IRAM de 30 metros · Pico Veleta, España'");
      c = c.replace(/aria-label="Collega i gruppi di radiotelescopi del 2017"/g, 'aria-label="Conectar las redes de radiotelescopios de 2017"');
      c = c.replace(/aria-label="Leggi l’immagine ufficiale"/g, 'aria-label="Analizar la imagen oficial"');
      c = c.replace(/aria-label="Come è stata ottenuta l’immagine di M87\?"/g, 'aria-label="¿Cómo se obtuvo la imagen del agujero negro M87*?"');
    }
  }

  fs.writeFileSync(filePath, c, 'utf8');
}

let count = 0;
TARGET_TREES.forEach(tree => {
  ['en', 'fr', 'es'].forEach(lang => {
    ['02.Felce.DNA', '03.Pesce.Veicolo', '04.Uccelli.Dinosauri', '05.Fungo.Robot', '06.Ginocchio.Bionico', '07.Buco.Nero'].forEach(anim => {
      const p = path.join(tree, lang, 'animazioni', anim, 'index.html');
      if (fs.existsSync(p)) {
        applyTranslations(p, lang, anim);
        count++;
      }
    });
  });
});

console.log(`✅ Injected interactive event translations across ${count} animation files!`);
