# PUNCTUM

_atlas de terapias por puntos: acupuntura, acupresión, moxibustión, ventosas, auriculoterapia, reflexología y más_

**Versión 2.3 · Última actualización: 2026-11-04**

[Română](README.ro.md) · [English](README.en.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

PUNCTUM es una aplicación **HTML de un solo archivo** que funciona **sin conexión** — sin cuenta, sin rastreo, sin servidores. Abre `punctum.html` en cualquier navegador.

## Qué contiene

- **410 puntos** en 14 meridianos más puntos extra, con localización, acciones, precauciones, significado del nombre y estado de verificación (texto OMS / ≥ 2 fuentes / sin verificar)
- **60 variantes** (acupuntura, acupresión, moxibustión, ventosas, gua sha, láser, TENS, auriculoterapia, reflexología, shiatsu, tuina, prácticas controvertidas) con pasos, duración, seguridad y un nivel de evidencia honesto
- **Mapas SVG interactivos** (cuerpo, mano, pie, oreja) con filtro por meridiano y búsqueda por código
- **Índice de 60 afecciones** con señales de alarma, puntos y variantes; **rutinas personales** (crear, sesión guiada, imprimir, exportar/importar)
- **Curso** de 6 niveles / 24 lecciones, **quiz** de más de 200 preguntas, **tarjetas** con repetición espaciada (Leitner), glosario, guía de medidas (cun)
- **8 idiomas**: ro, en, fr, it, es, pt, de, hu · tema claro/oscuro · teclado y lector de pantalla · impresión · **PWA** instalable

## Evidencia y seguridad

La aplicación es **educativa** y no sustituye el diagnóstico ni el tratamiento médico. Los niveles de evidencia se muestran con honestidad (de «moderada» a «sin evidencia»); las prácticas controvertidas se señalan como tales. Las localizaciones siguen el estándar OMS WPRO 2008, pero no se pudo consultar el texto completo de la OMS para todos los meridianos; el estado de cada punto es visible en la app y se resume en la página **Referencias**. Consulta `research/` para la auditoría completa y las afirmaciones no confirmadas.

## Uso

Abre `dist/punctum.html` (o sirve `dist/pwa/` por HTTPS para instalarla como app). El progreso (curso, tarjetas, rutinas) se guarda localmente en el navegador.

## Desarrollo

Código modular en `src/`; `python3 build.py` ensambla el archivo único. Pruebas: `NODE_PATH=/opt/npm-tools/node_modules node tests/run.js dist/punctum.html`, `tests/a11y.js`, `tests/i18n_cov.js`. PWA: `node tools/make_pwa.js <versión>`.

## Licencia y apoyo

Licencia MIT · © 2026 Alexandru-Ionuț Chiuță (Alexio). Para apoyar el proyecto: [Buy Me a Coffee](https://buymeacoffee.com/echo.of.the.strings).
