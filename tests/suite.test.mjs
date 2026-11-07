// Rulează testele PUNCTUM (tests/*.js) pe index.html și iese cu cod ≠ 0 la primul eșec. Necesită playwright + Chrome (NODE_PATH către playwright).
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = path.join(dir, 'index.html');
const env = {...process.env, NODE_PATH: process.env.NODE_PATH || '/opt/npm-tools/node_modules'};
let ok = 0;
for (const t of ['run', 'adversarial', 'a11y', 'contrast', 'data', 'features', 'pwa', 'i18n_cov', 'i18n_deep']) {
  const r = spawnSync('node', [`tests/${t}.js`, html], {cwd: dir, env, encoding: 'utf8', timeout: 580000});
  console.log(`${r.status === 0 ? 'ok' : 'FAIL'} ${t}.js — ${(r.stdout || '').trim().split('\n').pop().slice(0, 100)}`);
  if (r.status !== 0) { console.log((r.stderr || r.stdout || '').slice(-400)); process.exit(1); }
  ok++;
}
console.log(`${ok} ok`);
