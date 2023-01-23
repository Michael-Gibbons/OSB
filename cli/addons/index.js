import fs from 'fs'
import path from 'path'

import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const results = fs.readdirSync(__dirname)
const folders = results.filter(res => fs.lstatSync(path.resolve(__dirname, res)).isDirectory())

const registerCliAddons = async ({ program }) => {
  for (const folder of folders) {
    const { register } = await import(`./${folder}/register.js`)
    register({ program })
  }
}

export {
  registerCliAddons
}