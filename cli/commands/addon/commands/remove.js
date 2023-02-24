import { Command } from 'commander';
const program = new Command();

import fs from 'fs'
import fse from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLI_ADDONS_PATH = path.resolve(__dirname, '../../..', 'addons')
const FRONTEND_ADDONS_PATH = path.resolve(__dirname, '../../../..', 'web', 'frontend', 'addons')
const BACKEND_ADDONS_PATH = path.resolve(__dirname, '../../../..', 'web', 'backend', 'addons')
const SCRIPTS_ADDONS_PATH = path.resolve(__dirname, '../../../..', 'scripts', 'addons')
const EXTENSIONS_ADDONS_PATH = path.resolve(__dirname, '../../../..', 'web', 'extensions', 'addons')

const newCommand =

program.command('remove')
  .description('Deletes an addon by name')
  .argument('addon', 'addon name')
  .action((data) => {
    removeAddon(data)
  });

const removeDir = (dir) => {
  try {
    fs.rmSync(dir, { recursive: true })
  } catch (err) {
    // Intentionally no log here, if the directory doesn't exist that is fine
  }
}

const removeCliAddonFragment = (name) => {
  const ADDON_CLI_DIR = path.resolve(CLI_ADDONS_PATH, name)
  removeDir(ADDON_CLI_DIR)
}

const removeFrontendAddonFragment = (name) => {
  const ADDON_FRONTEND_DIR = path.resolve(FRONTEND_ADDONS_PATH, name)
  removeDir(ADDON_FRONTEND_DIR)
}

const removeBackendAddonFragment = (name) => {
  const ADDON_BACKEND_DIR = path.resolve(BACKEND_ADDONS_PATH, name)
  removeDir(ADDON_BACKEND_DIR)
}

const removeScriptsAddonFragment = (name) => {
  const ADDON_SCRIPTS_DIR = path.resolve(SCRIPTS_ADDONS_PATH, name)
  removeDir(ADDON_SCRIPTS_DIR)
}

const removeExtensionsAddonFragment = (name) => {
  const ADDON_EXTENSION_DIR = path.resolve(EXTENSIONS_ADDONS_PATH, name)
  removeDir(ADDON_EXTENSION_DIR)
}

const removeAddon = (name) => {
  const sluggedName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '').replace(/^-/, '')
  removeCliAddonFragment(sluggedName)
  removeFrontendAddonFragment(sluggedName)
  removeBackendAddonFragment(sluggedName)
  removeScriptsAddonFragment(sluggedName)
  removeExtensionsAddonFragment(sluggedName)
}

export default newCommand