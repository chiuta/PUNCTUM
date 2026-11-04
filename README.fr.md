# PUNCTUM

_atlas des thérapies par points : acupuncture, acupression, moxibustion, ventouses, auriculothérapie, réflexologie et plus_

**Version 2.1 · Dernière mise à jour: 2026-11-04**

[Română](README.ro.md) · [English](README.en.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

PUNCTUM est une application **HTML en un seul fichier**, qui fonctionne **hors ligne** — sans compte, sans suivi, sans serveur. Ouvrez `punctum.html` dans n'importe quel navigateur.

## Contenu

- **410 points** sur 14 méridiens et points extra, avec localisation, actions, précautions, sens du nom et statut de vérification (texte OMS / ≥ 2 sources / non vérifié)
- **60 variantes** (acupuncture, acupression, moxibustion, ventouses, gua sha, laser, TENS, auriculothérapie, réflexologie, shiatsu, tuina, pratiques controversées) avec étapes, durée, sécurité et niveau de preuve honnête
- **Cartes SVG interactives** (corps, main, pied, oreille) avec filtre par méridien et recherche par code
- **Index de 60 affections** avec signaux d'alerte, points et variantes ; **routines personnelles** (création, séance guidée, impression, export/import)
- **Cours** en 6 niveaux / 24 leçons, **quiz** de plus de 200 questions, **cartes mémoire** à répétition espacée (Leitner), glossaire, guide de mesure (cun)
- **8 langues** : ro, en, fr, it, es, pt, de, hu · thème clair/sombre · clavier et lecteur d'écran · impression · **PWA** installable

## Preuves et sécurité

L'application est **éducative** et ne remplace ni diagnostic ni traitement médical. Les niveaux de preuve sont affichés honnêtement (de « modérés » à « aucune preuve ») ; les pratiques controversées sont signalées comme telles. Les localisations suivent la norme OMS WPRO 2008, mais le texte complet de l'OMS n'a pas pu être consulté pour tous les méridiens ; le statut de chaque point est visible dans l'application et résumé dans la page **Références**. Voir `research/` pour l'audit complet et les affirmations non confirmées.

## Utilisation

Ouvrez `dist/punctum.html` (ou servez `dist/pwa/` en HTTPS pour l'installer comme application). La progression (cours, cartes, routines) est enregistrée localement dans le navigateur.

## Développement

Source modulaire dans `src/` ; `python3 build.py` assemble le fichier unique. Tests : `NODE_PATH=/opt/npm-tools/node_modules node tests/run.js dist/punctum.html`, `tests/a11y.js`, `tests/i18n_cov.js`. PWA : `node tools/make_pwa.js <version>`.

## Licence et soutien

Licence MIT · © 2026 Alexandru-Ionuț Chiuță (Alexio). Pour soutenir le projet : [Buy Me a Coffee](https://buymeacoffee.com/echo.of.the.strings).
