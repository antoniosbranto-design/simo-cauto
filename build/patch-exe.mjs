
import { rcedit } from 'rcedit'
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

const exePath = path.join(
  root,
  'release',
  pkg.version,
  'win-unpacked',
  'SIMO.CAUTO.exe'
)

const iconPath = path.join(root, 'build', 'icon.ico')

await fs.access(exePath)
await fs.access(iconPath)

await rcedit(exePath, {
  icon: iconPath,
  'version-string': {
    CompanyName: 'SIMO.CAUTO',
    FileDescription: 'SIMO.CAUTO',
    ProductName: 'SIMO.CAUTO',
    InternalName: 'SIMO.CAUTO',
    OriginalFilename: 'SIMO.CAUTO.exe'
  },
  'file-version': `${pkg.version}.0`,
  'product-version': `${pkg.version}.0`
})

console.log('Icona SIMO.CAUTO applicata correttamente!')



