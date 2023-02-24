// For every addon in scripts/addons
// Get all lifecycle hook commands

import fs from 'fs'
import path from 'path'

import { fileURLToPath } from 'url';

const ADDONS_PATH = path.dirname(fileURLToPath(import.meta.url));
const results = fs.readdirSync(ADDONS_PATH)
const folders = results.filter(res => fs.lstatSync(path.resolve(ADDONS_PATH, res)).isDirectory())

const addonLifecycleCommands = []
for (const folder of folders) {
  const { LIFECYCLE_COMMANDS } = await import(`./${folder}/lifecycle-commands.js`)
  addonLifecycleCommands.push(LIFECYCLE_COMMANDS)
}

export {
  addonLifecycleCommands
}