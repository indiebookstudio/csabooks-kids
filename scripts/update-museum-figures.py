# -*- coding: utf-8 -*-
"""
scripts/update-museum-figures.py
Updates bonus/<lang>/museo/app.js across all 4 languages (IT, EN, FR, ES)
for both assets/einstein and accesso/4dcbbaee2e69a278e4e59eab50430ccc.
"""

import os
import re
import json
import subprocess

DATA = {
    "it": {
        "zoomLabelPrefix": "Ingrandimento:",
        "closeLabel": "Chiudi",
        "room1_alt": "Orche che interagiscono con un tratto di alga nel Mare di Salish",
        "room4_alt": "Confronto evolutivo tra dinosauri teropodi e uccelli moderni",
        "room6_alt": "Interfaccia tecnologica di assistenza vocale e trasmissione dei segnali",
        "room2": {
            "figureTitle": "La felce con il DNA gigantesco",
            "figureAlt": "Confronto visivo schematico tra il genoma umano e il DNA di Tmesipteris oblanceolata",
            "artNotice": "Illustrazione schematica a scopo didattico, non fotografia scientifica. Per i dati ufficiali consulta lo studio SC-13.",
            "figureCaptionHtml": (
                '<div class="figure-box">'
                '<h4 class="figure-box-title">Confronto del genoma (valori 1C)</h4>'
                '<div class="data-compare">'
                '<div class="data-row"><span class="data-label">Essere umano:</span><strong class="data-val">circa 3,10 miliardi di coppie di basi</strong></div>'
                '<div class="data-row"><span class="data-label"><em>Tmesipteris oblanceolata</em>:</span><strong class="data-val">circa 160,45 miliardi di coppie di basi</strong></div>'
                '</div>'
                '<p class="data-note">Il confronto si riferisce al genoma aploide (quantità 1C). Una quantità di DNA oltre 50 volte superiore non implica maggiore intelligenza, complessità o superiorità evolutiva: la dimensione del genoma non misura la complessità di un organismo vivente.</p>'
                '<p class="data-disclaimer"><em>Nota metodologica:</em> l’illustrazione ha valore puramente schematico ed educativo; le proporzioni visive non sono in scala molecolare reale.</p>'
                '</div>'
            )
        },
        "room3": {
            "figureTitle": "Il pesce e il veicolo",
            "figureAlt": "Schema della catena tecnologica del veicolo guidato dal comportamento del pesce rosso",
            "artNotice": "Schema illustrativo della catena robotica. Per il filmato e l’articolo originale vedi lo studio SC-15.",
            "figureSource": {
                "code": "SC-15",
                "title": "Fish-operated vehicle: studio comportamentale",
                "url": "https://doi.org/10.1016/j.bbr.2021.113711"
            },
            "figureCaptionHtml": (
                '<div class="figure-box">'
                '<h4 class="figure-box-title">Come funziona il veicolo (catena di comando)</h4>'
                '<ol class="step-list">'
                '<li><strong>1. Il pesce nuota:</strong> il pesce rosso si muove all’interno della vasca d’acqua trasparente.</li>'
                '<li><strong>2. La telecamera rileva la posizione:</strong> una telecamera inquadra la vasca e rileva la posizione e l’orientamento del pesce.</li>'
                '<li><strong>3. Il computer converte i dati in comandi:</strong> un computer elabora le informazioni e le converte in comandi di movimento.</li>'
                '<li><strong>4. Il sistema motorizzato muove le ruote:</strong> i motori muovono le ruote facendo avanzare il veicolo nella direzione scelta.</li>'
                '</ol>'
                '<p class="data-note"><strong>Precisazione scientifica:</strong> il pesce non guida direttamente le ruote con un volante; il comportamento dipende dal sistema tecnologico progettato dai ricercatori per trasformare il nuoto in spostamento su terra.</p>'
                '</div>'
            )
        },
        "room5": {
            "figureTitle": "Il micelio e il robot",
            "figureAlt": "Schema del robot bioibrido azionato dai segnali elettrici del micelio fungino",
            "artNotice": "Interpretazione grafica del sistema bioibrido. Per lo studio originale consulta SC-25.",
            "figureCaptionHtml": (
                '<div class="figure-box">'
                '<h4 class="figure-box-title">Dal micelio al movimento (catena bioibrida)</h4>'
                '<ol class="step-list">'
                '<li><strong>1. Il micelio presenta attività elettrica:</strong> la rete sotterranea del fungo genera impulsi bioelettrici misurabili.</li>'
                '<li><strong>2. Gli elettrodi rilevano i segnali:</strong> piccoli sensori registrano le variazioni di voltaggio biologico.</li>'
                '<li><strong>3. Un circuito elettronico li interpreta:</strong> la scheda traduce i segnali biologici in comandi digitali.</li>'
                '<li><strong>4. Il sistema controlla il robot:</strong> gli attuatori meccanici muovono le zampe o le ruote del robot.</li>'
                '</ol>'
                '<p class="data-note"><strong>Precisazione scientifica:</strong> questo non significa che il fungo possieda intenzioni coscienti o guidi autonomamente come un essere umano; il robot risponde a segnali biologici elaborati da un circuito artificiale.</p>'
                '</div>'
            )
        },
        "room7": {
            "figureTitle": "La ricostruzione di M87*",
            "figureAlt": "Schema artistico della rete Event Horizon Telescope e della ricostruzione dell’immagine di M87*",
            "artNotice": "Schema artistico didattico: non è la fotografia ufficiale EHT. L’immagine scientifica originale è consultabile alla fonte SC-48.",
            "figureSource": {
                "code": "SC-48",
                "title": "ESO / EHT Collaboration — prima immagine del buco nero M87*",
                "url": "https://www.eso.org/public/images/eso1907a/"
            },
            "figureCaptionHtml": (
                '<div class="figure-box">'
                '<h4 class="figure-box-title">Dalla Terra a M87*: ricostruire l’invisibile</h4>'
                '<ol class="step-list">'
                '<li><strong>1. Diversi radiotelescopi raccolgono osservazioni:</strong> strumenti sincronizzati in vari punti della Terra osservano la stessa regione del cosmo.</li>'
                '<li><strong>2. I dati vengono sincronizzati e combinati:</strong> orologi atomici e potenti computer allineano le registrazioni mediante interferometria (VLBI).</li>'
                '<li><strong>3. L’elaborazione ricostruisce l’immagine:</strong> gli algoritmi combinano le misure permettendo di ricostruire l’immagine della regione del buco nero M87*.</li>'
                '</ol>'
                '<p class="data-note"><strong>Nota metodologica:</strong> l’illustrazione fornita è uno schema artistico ed educativo per comprendere il metodo, NON l’immagine scientifica originale dell’Event Horizon Telescope (EHT).</p>'
                '</div>'
            )
        }
    },
    "en": {
        "zoomLabelPrefix": "Enlargement:",
        "closeLabel": "Close",
        "room1_alt": "Orcas interacting with kelp in the Salish Sea",
        "room4_alt": "Evolutionary link between theropod dinosaurs and modern birds",
        "room6_alt": "Technological vocal assistance and signal transmission interface",
        "room2": {
            "figureTitle": "The Fern with the Giant DNA",
            "figureAlt": "Schematic visual comparison between the human genome and the DNA of Tmesipteris oblanceolata",
            "artNotice": "Schematic illustration for educational purposes, not a scientific photograph. For official data, see study SC-13.",
            "figureCaptionHtml": (
                '<div class="figure-box">'
                '<h4 class="figure-box-title">Genome Comparison (1C values)</h4>'
                '<div class="data-compare">'
                '<div class="data-row"><span class="data-label">Human being:</span><strong class="data-val">approx. 3.10 billion base pairs</strong></div>'
                '<div class="data-row"><span class="data-label"><em>Tmesipteris oblanceolata</em>:</span><strong class="data-val">approx. 160.45 billion base pairs</strong></div>'
                '</div>'
                '<p class="data-note">This comparison refers to the haploid genome (1C value). Having over 50 times more DNA does not imply greater intelligence, biological complexity, or evolutionary superiority: genome size does not measure an organism’s complexity.</p>'
                '<p class="data-disclaimer"><em>Methodological note:</em> this illustration is purely schematic and educational; visual proportions are not to actual molecular scale.</p>'
                '</div>'
            )
        },
        "room3": {
            "figureTitle": "The Fish and the Vehicle",
            "figureAlt": "Diagram of the robotic technology chain of the fish-operated vehicle",
            "artNotice": "Illustrative diagram of the robotic system. For the original paper and video, see study SC-15.",
            "figureSource": {
                "code": "SC-15",
                "title": "Fish-operated vehicle: behavioural study",
                "url": "https://doi.org/10.1016/j.bbr.2021.113711"
            },
            "figureCaptionHtml": (
                '<div class="figure-box">'
                '<h4 class="figure-box-title">How the vehicle works (command chain)</h4>'
                '<ol class="step-list">'
                '<li><strong>1. The fish swims:</strong> the goldfish moves freely inside the transparent water tank.</li>'
                '<li><strong>2. A camera detects position:</strong> an overhead camera tracks the fish’s position and orientation in real time.</li>'
                '<li><strong>3. A computer converts data into commands:</strong> an onboard computer translates movement vectors into steering instructions.</li>'
                '<li><strong>4. The motorized system drives the wheels:</strong> electric motors turn the wheels, propelling the vehicle in the intended direction.</li>'
                '</ol>'
                '<p class="data-note"><strong>Scientific clarification:</strong> the fish does not directly steer the wheels with a steering wheel; its movement is mediated and translated by the robotic interface engineered by researchers.</p>'
                '</div>'
            )
        },
        "room5": {
            "figureTitle": "Mycelium and the Robot",
            "figureAlt": "Diagram of the biohybrid robot powered by fungal mycelium electrical signals",
            "artNotice": "Graphic interpretation of the biohybrid prototype. For the original study, see SC-25.",
            "figureCaptionHtml": (
                '<div class="figure-box">'
                '<h4 class="figure-box-title">From mycelium to movement (biohybrid chain)</h4>'
                '<ol class="step-list">'
                '<li><strong>1. Mycelium exhibits electrical activity:</strong> the fungal underground network generates measurable bioelectrical spikes.</li>'
                '<li><strong>2. Electrodes detect signals:</strong> tiny sensors record changes in biological voltage.</li>'
                '<li><strong>3. An electronic circuit interprets them:</strong> dedicated hardware converts biological pulses into digital control signals.</li>'
                '<li><strong>4. The system drives the robot:</strong> actuators respond by moving the robot’s legs or wheels.</li>'
                '</ol>'
                '<p class="data-note"><strong>Scientific clarification:</strong> this does not mean the fungus possesses conscious intentions or drives autonomously like a human; the robot moves in response to biological signals processed by an artificial circuit.</p>'
                '</div>'
            )
        },
        "room7": {
            "figureTitle": "The Reconstruction of M87*",
            "figureAlt": "Artistic diagram of the Event Horizon Telescope network and the reconstruction of M87*",
            "artNotice": "Artistic educational diagram: this is not the official EHT photograph. The genuine scientific image is available via source SC-48.",
            "figureSource": {
                "code": "SC-48",
                "title": "ESO / EHT Collaboration — first image of black hole M87*",
                "url": "https://www.eso.org/public/images/eso1907a/"
            },
            "figureCaptionHtml": (
                '<div class="figure-box">'
                '<h4 class="figure-box-title">From Earth to M87*: Imaging the Invisible</h4>'
                '<ol class="step-list">'
                '<li><strong>1. Multiple radio telescopes collect observations:</strong> synchronized instruments worldwide observe the same celestial region simultaneously.</li>'
                '<li><strong>2. Data is synchronized and combined:</strong> atomic clocks and supercomputers align recordings through interferometry (VLBI).</li>'
                '<li><strong>3. Computational processing reconstructs the image:</strong> algorithms process the measurements to reconstruct the image of the region around black hole M87*.</li>'
                '</ol>'
                '<p class="data-note"><strong>Methodological note:</strong> the illustration provided is an artistic educational diagram to explain the method, NOT the official scientific photograph from the Event Horizon Telescope (EHT).</p>'
                '</div>'
            )
        }
    },
    "fr": {
        "zoomLabelPrefix": "Agrandissement :",
        "closeLabel": "Fermer",
        "room1_alt": "Orques manipulant une tige de kelp dans la mer des Salish",
        "room4_alt": "Lien évolutif entre dinosaures théropodes et oiseaux modernes",
        "room6_alt": "Interface technologique d'assistance vocale et transmission des signaux",
        "room2": {
            "figureTitle": "La fougère au génome gigantesque",
            "figureAlt": "Comparaison visuelle schématique entre le génome humain et l’ADN de Tmesipteris oblanceolata",
            "artNotice": "Illustration schématique à visée pédagogique, non une photographie scientifique. Pour consulter les données officielles, voir l’étude SC-13.",
            "figureCaptionHtml": (
                '<div class="figure-box">'
                '<h4 class="figure-box-title">Comparaison du génome (valeurs 1C)</h4>'
                '<div class="data-compare">'
                '<div class="data-row"><span class="data-label">Être humain :</span><strong class="data-val">environ 3,10 milliards de paires de bases</strong></div>'
                '<div class="data-row"><span class="data-label"><em>Tmesipteris oblanceolata</em> :</span><strong class="data-val">environ 160,45 milliards de paires de bases</strong></div>'
                '</div>'
                '<p class="data-note">Cette comparaison porte sur le génome haploïde (valeur 1C). Une quantité d’ADN plus de 50 fois supérieure n’implique ni plus d’intelligence, ni complexité accrue, ni supériorité évolutive : la taille du génome ne mesure pas la complexité d’un organisme vivant.</p>'
                '<p class="data-disclaimer"><em>Note méthodologique :</em> cette illustration a une vocation purement schématique et éducative ; les proportions visuelles ne sont pas à l’échelle moléculaire réelle.</p>'
                '</div>'
            )
        },
        "room3": {
            "figureTitle": "Le poisson et le véhicule",
            "figureAlt": "Schéma de la chaîne technologique du véhicule actionné par le poisson rouge",
            "artNotice": "Schéma illustratif du système robotique. Pour consulter la vidéo et l’étude originales, voir la référence SC-15.",
            "figureSource": {
                "code": "SC-15",
                "title": "Fish-operated vehicle : étude comportementale",
                "url": "https://doi.org/10.1016/j.bbr.2021.113711"
            },
            "figureCaptionHtml": (
                '<div class="figure-box">'
                '<h4 class="figure-box-title">Fonctionnement du véhicule (chaîne de commande)</h4>'
                '<ol class="step-list">'
                '<li><strong>1. Le poisson nage :</strong> le poisson rouge évolue librement dans son aquarium transparent.</li>'
                '<li><strong>2. Une caméra détecte sa position :</strong> une caméra filme le bassin et suit en permanence l’orientation et la position de l’animal.</li>'
                '<li><strong>3. Un ordinateur convertit les données en commandes :</strong> l’ordinateur de bord traduit ces trajectoires en ordres de déplacement.</li>'
                '<li><strong>4. Le système motorisé actionne les roues :</strong> les moteurs font tourner les roues, déplaçant le véhicule terrestre dans la direction choisie.</li>'
                '</ol>'
                '<p class="data-note"><strong>Précision scientifique :</strong> le poisson ne tient pas de volant et ne conduit pas consciemment le véhicule ; son déplacement dépend du dispositif technologique conçu par les chercheurs pour traduire la nage en trajectoire terrestre.</p>'
                '</div>'
            )
        },
        "room5": {
            "figureTitle": "Le mycélium et le robot",
            "figureAlt": "Schéma du robot biohybride actionné par les signaux électriques du mycélium fongique",
            "artNotice": "Interprétation graphique du système biohybride. Pour consulter la publication originale, voir SC-25.",
            "figureCaptionHtml": (
                '<div class="figure-box">'
                '<h4 class="figure-box-title">Du mycélium au mouvement (chaîne biohybride)</h4>'
                '<ol class="step-list">'
                '<li><strong>1. Le mycélium présente une activité électrique :</strong> le réseau souterrain du champignon génère des impulsions bioélectriques mesurables.</li>'
                '<li><strong>2. Les électrodes captent les signaux :</strong> de minuscules capteurs enregistrent les variations de tension biologique.</li>'
                '<li><strong>3. Un circuit électronique les interprète :</strong> une interface matérielle traduit ces influx biologiques en ordres numériques.</li>'
                '<li><strong>4. Le système contrôle le robot :</strong> les actionneurs mécaniques font bouger les pattes ou roues du robot biohybride.</li>'
                '</ol>'
                '<p class="data-note"><strong>Précision scientifique :</strong> cela ne signifie pas que le champignon possède une conscience ou guide le robot de manière intentionnelle ; le robot réagit aux signaux biologiques décodés par un circuit électronique artificiel.</p>'
                '</div>'
            )
        },
        "room7": {
            "figureTitle": "La reconstruction de M87*",
            "figureAlt": "Schéma artistique du réseau Event Horizon Telescope et de la reconstruction de l’image de M87*",
            "artNotice": "Schéma artistique pédagogique : ce n’est pas la photographie officielle de l’EHT. L’image scientifique authentique est accessible via la source SC-48.",
            "figureSource": {
                "code": "SC-48",
                "title": "ESO / EHT Collaboration — première image du trou noir M87*",
                "url": "https://www.eso.org/public/images/eso1907a/"
            },
            "figureCaptionHtml": (
                '<div class="figure-box">'
                '<h4 class="figure-box-title">De la Terre à M87* : imager l’invisible</h4>'
                '<ol class="step-list">'
                '<li><strong>1. Plusieurs radiotélescopes recueillent des observations :</strong> des instruments synchronisés répartis sur Terre observent en même temps la même région de l’espace.</li>'
                '<li><strong>2. Les données sont synchronisées et combinées :</strong> des horloges atomiques et de puissants ordinateurs alignent les mesures par interférométrie (VLBI).</li>'
                '<li><strong>3. Le traitement numérique reconstitue l’image :</strong> des algorithmes traitent les données et permettent de reconstituer l’image de la région entourant le trou noir M87*.</li>'
                '</ol>'
                '<p class="data-note"><strong>Note méthodologique :</strong> l’illustration fournie est un schéma artistique et éducatif pour expliquer la méthode, et NON la photographie scientifique officielle de l’Event Horizon Telescope (EHT).</p>'
                '</div>'
            )
        }
    },
    "es": {
        "zoomLabelPrefix": "Ampliación:",
        "closeLabel": "Cerrar",
        "room1_alt": "Orcas interactuando con un fragmento de alga en el mar de Salish",
        "room4_alt": "Vínculo evolutivo entre dinosaurios terópodos y aves modernas",
        "room6_alt": "Interfaz tecnológica de asistencia vocal y transmisión de señales",
        "room2": {
            "figureTitle": "El helecho con el ADN gigantesco",
            "figureAlt": "Comparación visual esquemática entre el genoma humano y el ADN de Tmesipteris oblanceolata",
            "artNotice": "Ilustración esquemática con fines educativos, no fotografía científica. Para los datos oficiales, consulta el estudio SC-13.",
            "figureCaptionHtml": (
                '<div class="figure-box">'
                '<h4 class="figure-box-title">Comparación del genoma (valores 1C)</h4>'
                '<div class="data-compare">'
                '<div class="data-row"><span class="data-label">Ser humano:</span><strong class="data-val">aprox. 3,10 mil millones de pares de bases</strong></div>'
                '<div class="data-row"><span class="data-label"><em>Tmesipteris oblanceolata</em>:</span><strong class="data-val">aprox. 160,45 mil millones de pares de bases</strong></div>'
                '</div>'
                '<p class="data-note">La comparación se refiere al genoma haploide (valor 1C). Tener más de 50 veces más ADN no implica mayor inteligencia, complejidad biológica ni superioridad evolutiva: el tamaño del genoma no mide la complejidad de un organismo vivo.</p>'
                '<p class="data-disclaimer"><em>Nota metodológica:</em> la ilustración tiene una finalidad meramente esquemática y divulgativa; las proporciones visuales no están a escala molecular real.</p>'
                '</div>'
            )
        },
        "room3": {
            "figureTitle": "El pez y el vehículo",
            "figureAlt": "Esquema de la cadena tecnológica del vehículo accionado por el pez dorado",
            "artNotice": "Esquema ilustrativo del sistema robótico. Para el vídeo y el artículo original, consulta el estudio SC-15.",
            "figureSource": {
                "code": "SC-15",
                "title": "Fish-operated vehicle: estudio del comportamiento",
                "url": "https://doi.org/10.1016/j.bbr.2021.113711"
            },
            "figureCaptionHtml": (
                '<div class="figure-box">'
                '<h4 class="figure-box-title">Cómo funciona el vehículo (cadena de control)</h4>'
                '<ol class="step-list">'
                '<li><strong>1. El pez nada:</strong> el pez dorado se desplaza libremente dentro del tanque de agua transparente.</li>'
                '<li><strong>2. Una cámara detecta la posición:</strong> una cámara cenital graba el tanque y rastrea continuamente la posición y orientación del pez.</li>'
                '<li><strong>3. Una computadora convierte los datos en órdenes:</strong> un ordenador de a bordo traduce el movimiento en órdenes de dirección y velocidad.</li>'
                '<li><strong>4. El sistema motorizado mueve las ruedas:</strong> los motores accionan las ruedas haciendo avanzar el vehículo en la dirección señalada.</li>'
                '</ol>'
                '<p class="data-note"><strong>Aclaración científica:</strong> el pez no maneja un volante ni conduce de forma deliberada; el desplazamiento depende del sistema tecnológico diseñado por los investigadores para transformar el nado en traslación terrestre.</p>'
                '</div>'
            )
        },
        "room5": {
            "figureTitle": "El micelio y el robot",
            "figureAlt": "Esquema del robot biohíbrido accionado por las señales eléctricas del micelio fúngico",
            "artNotice": "Interpretación gráfica del sistema biohíbrido. Para el artículo científico original, consulta SC-25.",
            "figureCaptionHtml": (
                '<div class="figure-box">'
                '<h4 class="figure-box-title">Del micelio al movimiento (cadena biohíbrida)</h4>'
                '<ol class="step-list">'
                '<li><strong>1. El micelio presenta actividad eléctrica:</strong> la red subterránea del hongo genera impulsos bioeléctricos medibles.</li>'
                '<li><strong>2. Los electrodos captan las señales:</strong> diminutos sensores registran las variaciones de potencial biológico.</li>'
                '<li><strong>3. Un circuito electrónico las interpreta:</strong> una placa especializada traduce los impulsos biológicos en órdenes digitales.</li>'
                '<li><strong>4. El sistema controla el robot:</strong> los actuadores mecánicos mueven las patas o ruedas del robot biohíbrido.</li>'
                '</ol>'
                '<p class="data-note"><strong>Aclaración científica:</strong> esto no significa que el hongo posea intenciones conscientes ni conduzca de manera autónoma como un ser humano; el robot reacciona ante señales biológicas procesadas por un circuito artificial.</p>'
                '</div>'
            )
        },
        "room7": {
            "figureTitle": "La reconstrucción de M87*",
            "figureAlt": "Esquema artístico de la red Event Horizon Telescope y de la reconstrucción de la imagen de M87*",
            "artNotice": "Esquema artístico educativo: no es la fotografía oficial de la EHT. La imagen científica original puede consultarse en la fuente SC-48.",
            "figureSource": {
                "code": "SC-48",
                "title": "ESO / EHT Collaboration — primera imagen del agujero negro M87*",
                "url": "https://www.eso.org/public/images/eso1907a/"
            },
            "figureCaptionHtml": (
                '<div class="figure-box">'
                '<h4 class="figure-box-title">De la Tierra a M87*: capturar lo invisible</h4>'
                '<ol class="step-list">'
                '<li><strong>1. Varios radiotelescopios recogen observaciones:</strong> instrumentos sincronizados en distintos puntos de la Tierra observan simultáneamente la misma región cósmica.</li>'
                '<li><strong>2. Los datos se sincronizan y combinan:</strong> relojes atómicos y supercomputadoras alinean las grabaciones mediante interferometría (VLBI).</li>'
                '<li><strong>3. El procesamiento reconstruye la imagen:</strong> potentes algoritmos procesan las medidas permitiendo reconstruir la imagen de la región del agujero negro M87*.</li>'
                '</ol>'
                '<p class="data-note"><strong>Nota metodológica:</strong> la imagen mostrada es un esquema artístico y educativo para comprender el método, NO la fotografía científica original del Event Horizon Telescope (EHT).</p>'
                '</div>'
            )
        }
    }
}

def update_app_js(filepath, lang):
    with open(filepath, 'r', encoding='utf-8') as f:
        code = f.read()

    # 1. Update asset helper with cache buster
    code = re.sub(
        r'const A = name => `assets/\${name}\.webp`;',
        r'const A = name => `assets/${name}.webp?v=20261103`;',
        code
    )

    # 2. Extract ROOMS json
    m = re.search(r'const ROOMS = (\[[\s\S]*?\]);\s*\nconst main', code)
    if not m:
        raise ValueError(f"Could not find ROOMS in {filepath}")
    rooms_raw = m.group(1)
    rooms = json.loads(rooms_raw)

    ld = DATA[lang]

    for r in rooms:
        rid = r["id"]
        # Generic alts
        if rid == 1:
            r["side"]["figureAlt"] = ld["room1_alt"]
            r["side"]["figureTitle"] = r["side"]["title"]
        elif rid == 4:
            r["side"]["figureAlt"] = ld["room4_alt"]
            r["side"]["figureTitle"] = r["side"]["title"]
        elif rid == 6:
            r["side"]["figureAlt"] = ld["room6_alt"]
            r["side"]["figureTitle"] = r["side"]["title"]
        elif rid == 2:
            r["side"]["figureTitle"] = ld["room2"]["figureTitle"]
            r["side"]["figureAlt"] = ld["room2"]["figureAlt"]
            r["side"]["figureCaptionHtml"] = ld["room2"]["figureCaptionHtml"]
            r["side"]["artNotice"] = ld["room2"]["artNotice"]
        elif rid == 3:
            r["side"]["figureTitle"] = ld["room3"]["figureTitle"]
            r["side"]["figureAlt"] = ld["room3"]["figureAlt"]
            r["side"]["figureCaptionHtml"] = ld["room3"]["figureCaptionHtml"]
            r["side"]["artNotice"] = ld["room3"]["artNotice"]
            r["side"]["figureSource"] = ld["room3"]["figureSource"]
        elif rid == 5:
            r["side"]["figureTitle"] = ld["room5"]["figureTitle"]
            r["side"]["figureAlt"] = ld["room5"]["figureAlt"]
            r["side"]["figureCaptionHtml"] = ld["room5"]["figureCaptionHtml"]
            r["side"]["artNotice"] = ld["room5"]["artNotice"]
        elif rid == 7:
            r["side"]["figureTitle"] = ld["room7"]["figureTitle"]
            r["side"]["figureAlt"] = ld["room7"]["figureAlt"]
            r["side"]["figureCaptionHtml"] = ld["room7"]["figureCaptionHtml"]
            r["side"]["artNotice"] = ld["room7"]["artNotice"]
            r["side"]["figureSource"] = ld["room7"]["figureSource"]

    new_rooms_json = json.dumps(rooms, indent=2, ensure_ascii=False)
    code = code[:m.start(1)] + new_rooms_json + code[m.end(1):]

    # 3. Update side exhibit in renderRoom
    # Replace ${img(r.sideArt,r.side.title)} with wrapped figure and localized alt + caption
    old_aside_pattern = r'\$\{img\(r\.sideArt,r\.side\.title\)\}'
    new_aside_snippet = (
        '<div class="side-figure-wrap">${img(r.sideArt, r.side.figureAlt || r.side.figureTitle || r.side.title)}'
        '${r.side.figureCaptionHtml ? `<div class="figure-explanation">${r.side.figureCaptionHtml}</div>` : ""}</div>'
    )
    if re.search(old_aside_pattern, code):
        code = re.sub(old_aside_pattern, new_aside_snippet, code)

    # 4. Update openZoom function to support figureTitle, figureAlt, figureCaptionHtml and figureSource
    old_zoom_pattern = r'function openZoom\(id\)\{[\s\S]*?modal\.querySelector\(\'\.icon-button\'\)\?\.focus\(\);\}'
    zoom_label = ld["zoomLabelPrefix"]
    close_lbl = ld["closeLabel"]
    new_zoom_func = (
        f'function openZoom(id){{const r=ROOMS[id-1];if(!r)return;'
        f'const zoomTitle=r.side.figureTitle||r.side.title;'
        f'const zoomAlt=r.side.figureAlt||zoomTitle;'
        f'modal.innerHTML=`<div class="modal-card" role="dialog" aria-modal="true" aria-label="{zoom_label} ${{esc(zoomTitle)}}">'
        f'<div class="modal-header"><h2>${{esc(zoomTitle)}}</h2>'
        f'<button data-act="close" class="icon-button" aria-label="{close_lbl}">×</button></div>'
        f'<div style="margin:17px 0"><img src="${{A(r.sideArt)}}" style="display:block;width:100%;max-height:57vh;object-fit:contain;border-radius:16px;background:#092032" alt="${{esc(zoomAlt)}}"></div>'
        f'${{r.side.figureCaptionHtml ? `<div class="figure-modal-caption">${{r.side.figureCaptionHtml}}</div>` : `<p>${{esc(r.side.desc)}}</p>`}}'
        f'<p class="art-notice">${{esc(r.side.artNotice||"Figura illustrativa, non fotografia dello studio. Per vedere il materiale originale apri la fonte.")}}</p>'
        f'${{sourceHtml(r.side.figureSource||r.side.source)}}</div>`;'
        f'modal.hidden=false;document.body.style.overflow="hidden";modal.querySelector(".icon-button")?.focus();}}'
    )

    code = re.sub(old_zoom_pattern, new_zoom_func, code)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(code)
    print(f"Successfully updated {filepath} ({lang})")

def main():
    bases = ['assets/einstein', 'accesso/4dcbbaee2e69a278e4e59eab50430ccc']
    langs = ['it', 'en', 'fr', 'es']

    for b in bases:
        for l in langs:
            fp = f"{b}/bonus/{l}/museo/app.js"
            update_app_js(fp, l)

            # Syntax check using node
            res = subprocess.run(['node', '--check', fp], capture_output=True, text=True)
            if res.returncode != 0:
                print(f"SYNTAX ERROR in {fp}: {res.stderr}")
                exit(1)
            else:
                print(f"  [OK] Syntax check passed: {fp}")

if __name__ == '__main__':
    main()
