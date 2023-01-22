import fs from 'fs'
import path from 'path'

const FOLDER_PATH = './cli/addons'

const results = fs.readdirSync(FOLDER_PATH)
const folders = results.filter(res => fs.lstatSync(path.resolve(FOLDER_PATH, res)).isDirectory())

const registerCliAddons = async () => {
  for (const folder of folders) {
    const { register } = await import(`./${folder}/register.js`)
    register()
  }
}

export {
  registerCliAddons
}