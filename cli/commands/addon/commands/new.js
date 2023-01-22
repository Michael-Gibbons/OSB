import { Command } from 'commander';
const program = new Command();

import inquirer from 'inquirer';

import fs from 'fs'
import fse from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TEMPLATES_PATH = path.resolve(__dirname, '..', '..', '..', './templates/addon')
const CLI_ADDONS_PATH = path.resolve(__dirname, '..', '..', '..', './addons')
const FRONTEND_ADDONS_PATH = path.resolve(__dirname, '..', '..', '..', '..','./web/frontend', './addons')
const BACKEND_ADDONS_PATH = path.resolve(__dirname, '..', '..', '..', '..','./web/backend', './addons')

const newCommand =

program.command('new')
  .description('Create a new addon from a template defined in /cli/templates')
  .action(() => {
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of your new addon?",
        name: "name",
        validate: (name) => {

          if(!name.length){
            return 'Name cannot be empty'
          }

          const sluggedName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '').replace(/^-/, '')

          const NEW_ADDON_CLI_DIR = path.resolve(CLI_ADDONS_PATH, `./${sluggedName}`)

          if(fs.existsSync(NEW_ADDON_CLI_DIR)){
            throw new Error(`An addon with the name: ${sluggedName} already exists in the cli directory.`)
          }

          const NEW_ADDON_FRONTEND_DIR = path.resolve(FRONTEND_ADDONS_PATH, `./${sluggedName}`)
          if(fs.existsSync(NEW_ADDON_FRONTEND_DIR)){
            throw new Error(`An addon with the name: ${sluggedName} already exists in the frontend directory.`)
          }

          const NEW_ADDON_BACKEND_DIR = path.resolve(BACKEND_ADDONS_PATH, `./${sluggedName}`)
          if(fs.existsSync(NEW_ADDON_BACKEND_DIR)){
            throw new Error(`An addon with the name: ${sluggedName} already exists in the backend directory.`)
          }

          return true

        }
      }
    ])
    .then(({name}) => {
      createNewAddon(name)
    })
  });


const copyDir = (src, dest) => {
  try {
    fse.copySync(src, dest, { overwrite: false })
  } catch (err) {
    console.error(err)
  }
}

const createCliAddonFragment = (name) => {
  const NEW_ADDON_CLI_DIR = path.resolve(CLI_ADDONS_PATH, `./${name}`)

  fs.mkdirSync(NEW_ADDON_CLI_DIR);

  const CLI_TEMPLATES = path.resolve(TEMPLATES_PATH, './cli');
  copyDir(CLI_TEMPLATES, NEW_ADDON_CLI_DIR)
}

const createFrontendAddonFragment = (name) => {
  const NEW_ADDON_FRONTEND_DIR = path.resolve(FRONTEND_ADDONS_PATH, `./${name}`)

  fs.mkdirSync(NEW_ADDON_FRONTEND_DIR);

  const FRONTEND_TEMPLATES = path.resolve(TEMPLATES_PATH, './frontend');
  copyDir(FRONTEND_TEMPLATES, NEW_ADDON_FRONTEND_DIR)
}

const createBackendAddonFragment = (name) => {
  const NEW_ADDON_BACKEND_DIR = path.resolve(BACKEND_ADDONS_PATH, `./${name}`)

  fs.mkdirSync(NEW_ADDON_BACKEND_DIR);

  const BACKEND_TEMPLATES = path.resolve(TEMPLATES_PATH, './backend');
  copyDir(BACKEND_TEMPLATES, NEW_ADDON_BACKEND_DIR)
}

const createNewAddon = (name) => {
  const sluggedName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '').replace(/^-/, '')
  createCliAddonFragment(sluggedName)
  createFrontendAddonFragment(sluggedName)
  createBackendAddonFragment(sluggedName)
}

export default newCommand