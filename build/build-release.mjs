
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
)

const pkg = JSON.parse(
  await fs.readFile(path.join(root, 'package.json'), 'utf8')
)

const electronBuilder = path.join(
  root,
  'node_modules',
  'electron-builder',
  'cli.js'
)

function run(args) {
  execFileSync(process.execPath, [electronBuilder, ...args], {
    cwd: root,
    stdio: 'inherit'
  })
}

console.log('\n[1/3] Creazione applicazione...')
run(['--dir'])

console.log('\n[2/3] Applicazione icona...')
execFileSync(
  process.execPath,
  [path.join(root, 'build', 'patch-exe.mjs')],
  { cwd: root, stdio: 'inherit' }
)

console.log('\n[3/3] Creazione installer...')
run([
  '--prepackaged',
  path.join('release', pkg.version, 'win-unpacked')
])

console.log('\nSIMO.CAUTO: BUILD COMPLETATA!')

