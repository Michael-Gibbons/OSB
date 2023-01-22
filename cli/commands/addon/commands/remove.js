import { Command } from 'commander';
const program = new Command();

import fs from 'fs'
import fse from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLI_ADDONS_PATH = path.resolve(__dirname, '..', '..', '..', './addons')
const FRONTEND_ADDONS_PATH = path.resolve(__dirname, '..', '..', '..', '..','./web/frontend', './addons')
const BACKEND_ADDONS_PATH = path.resolve(__dirname, '..', '..', '..', '..','./web/backend', './addons')

const newCommand =

program.command('remove')
  .description('Deletes an addon by name')
  .argument('addon', 'addon name')
  .action((data) => {
    removeAddon(data)
  });

const removeDir = (dir) => {
  try {
    fs.rmdirSync(dir, { recursive: true })
  } catch (err) {
    console.error(`Error while deleting ${dir}.`)
  }
}

const removeCliAddonFragment = (name) => {
  const ADDON_CLI_DIR = path.resolve(CLI_ADDONS_PATH, `./${name}`)
  removeDir(ADDON_CLI_DIR)
}

const removeFrontendAddonFragment = (name) => {
  const ADDON_FRONTEND_DIR = path.resolve(FRONTEND_ADDONS_PATH, `./${name}`)
  removeDir(ADDON_FRONTEND_DIR)
}

const removeBackendAddonFragment = (name) => {
  const ADDON_BACKEND_DIR = path.resolve(BACKEND_ADDONS_PATH, `./${name}`)
  removeDir(ADDON_BACKEND_DIR)
}

const removeAddon = (name) => {
  const sluggedName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '').replace(/^-/, '')
  removeCliAddonFragment(sluggedName)
  removeFrontendAddonFragment(sluggedName)
  removeBackendAddonFragment(sluggedName)
}

export default newCommand