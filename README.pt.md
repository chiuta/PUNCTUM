# PUNCTUM

_atlas das terapias por pontos: acupuntura, acupressão, moxabustão, ventosas, auriculoterapia, reflexologia e mais_

**Versão 2.3 · Última atualização: 2026-11-04**

[Română](README.ro.md) · [English](README.en.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

O PUNCTUM é uma aplicação **HTML de ficheiro único** que funciona **offline** — sem conta, sem rastreio, sem servidores. Abra `punctum.html` em qualquer navegador.

## O que contém

- **410 pontos** em 14 meridianos mais pontos extra, com localização, ações, precauções, significado do nome e estado de verificação (texto OMS / ≥ 2 fontes / por verificar)
- **60 variantes** (acupuntura, acupressão, moxabustão, ventosas, gua sha, laser, TENS, auriculoterapia, reflexologia, shiatsu, tuina, práticas controversas) com passos, duração, segurança e um nível de evidência honesto
- **Mapas SVG interativos** (corpo, mão, pé, orelha) com filtro por meridiano e pesquisa por código
- **Índice de 60 afeções** com sinais de alarme, pontos e variantes; **rotinas pessoais** (criar, sessão guiada, imprimir, exportar/importar)
- **Curso** de 6 níveis / 24 lições, **quiz** com mais de 200 perguntas, **flashcards** com repetição espaçada (Leitner), glossário, guia de medidas (cun)
- **8 idiomas**: ro, en, fr, it, es, pt, de, hu · tema claro/escuro · teclado e leitor de ecrã · impressão · **PWA** instalável

## Evidência e segurança

A aplicação é **educativa** e não substitui o diagnóstico nem o tratamento médico. Os níveis de evidência são apresentados com honestidade (de «moderada» a «sem evidência»); as práticas controversas são assinaladas como tal. As localizações seguem a norma OMS WPRO 2008, mas o texto completo da OMS não pôde ser consultado para todos os meridianos; o estado de cada ponto é visível na app e resumido na página **Referências**. Consulte `research/` para a auditoria completa e as afirmações por confirmar.

## Utilização

Abra `dist/punctum.html` (ou sirva `dist/pwa/` por HTTPS para a instalar como app). O progresso (curso, flashcards, rotinas) é guardado localmente no navegador.

## Desenvolvimento

Código modular em `src/`; `python3 build.py` monta o ficheiro único. Testes: `NODE_PATH=/opt/npm-tools/node_modules node tests/run.js dist/punctum.html`, `tests/a11y.js`, `tests/i18n_cov.js`. PWA: `node tools/make_pwa.js <versão>`.

## Licença e apoio

Licença MIT · © 2026 Alexandru-Ionuț Chiuță (Alexio). Para apoiar o projeto: [Buy Me a Coffee](https://buymeacoffee.com/echo.of.the.strings).
