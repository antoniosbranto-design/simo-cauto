import sharp from 'sharp'
import pngToIco from 'png-to-ico'
import fs from 'node:fs/promises'

const png = await sharp('./build/icon.svg')
  .resize(512, 512)
  .png()
  .toBuffer()

const ico = await pngToIco(png)

await fs.writeFile('./build/icon.ico', ico)

console.log('Icona SIMO.CAUTO creata!')
