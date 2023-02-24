import { Command } from 'commander';
const program = new Command();

import shell from 'shelljs'
import crypto from 'crypto'
import fs from 'fs'
import fse from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLI_PATH = path.resolve(__dirname, '..', '..', '..' )
const CLI_ADDONS_PATH = path.resolve(CLI_PATH, './addons')

const FRONTEND_PATH =  path.resolve(__dirname, '..', '..', '..', '..','./web/frontend')
const FRONTEND_ADDONS_PATH = path.resolve(FRONTEND_PATH, './addons')

const BACKEND_PATH = path.resolve(__dirname, '..', '..', '..', '..','./web/backend')
const BACKEND_ADDONS_PATH = path.resolve(BACKEND_PATH, './addons')

const SCRIPTS_PATH = path.resolve(__dirname, '..', '..', '..', '..')
const SCRIPTS_ADDONS_PATH = path.resolve(SCRIPTS_PATH, 'scripts', 'addons')

const addCommand =

program.command('add')
  .argument('<url>', 'addon repository url')
  .description('Adds an addon from a repository url.')
  .option('--name <name>', 'Custom name for the addon, required to install multiple versions of the same addon')
  .action( async (url, options) => {
    const urlSplit = url.split('/')
    let addonName = (urlSplit[urlSplit.length - 1]).split('.')[0]

    if(options.name){
      addonName = options.name
    }

    const CLI_ADDON_PATH = path.resolve(CLI_ADDONS_PATH, addonName)
    const FRONTEND_ADDON_PATH = path.resolve(FRONTEND_ADDONS_PATH, addonName)
    const BACKEND_ADDON_PATH = path.resolve(BACKEND_ADDONS_PATH, addonName)

    const addonIsInstalled = fs.existsSync(CLI_ADDON_PATH) || fs.existsSync(BACKEND_ADDON_PATH) || fs.existsSync(FRONTEND_ADDON_PATH)
    if(addonIsInstalled){
      throw `ERROR: Addon with the name "${addonName}" is already installed`
    }

    await addAddon(url, addonName)
    fs.rmSync('./tmp', { recursive: true })
  })


const installDependencies = async (destinationPath, packageJson) => {

  if(!packageJson){
    return
  }

  const dependencies = packageJson.dependencies
  const packagesToInstall = []

  for (const dependency in dependencies) {
    if (Object.hasOwnProperty.call(dependencies, dependency)) {
      const version = dependencies[dependency];
      packagesToInstall.push(`${dependency}@${version}`)
    }
  }

  await shell.exec(`cd ${destinationPath} && npm install ${packagesToInstall.join(' ')}`)
}

const installCliDependencies = async (temporaryAddonPath) => {
  const cliPackageJson = await getPackageJson(temporaryAddonPath, 'cli')
  console.log('\nInstalling Cli Dependencies...\n')

  await installDependencies(CLI_PATH, cliPackageJson)
}
const installBackendDependencies = async (temporaryAddonPath) => {
  const backendPackageJson = await getPackageJson(temporaryAddonPath, 'backend')
  console.log('\nInstalling Backend Dependencies...\n')

  await installDependencies(BACKEND_PATH, backendPackageJson)
}
const installFrontendDependencies = async (temporaryAddonPath) => {
  const frontendPackageJson = await getPackageJson(temporaryAddonPath, 'frontend')
  console.log('\nInstalling Frontend Dependencies...\n')

  await installDependencies(FRONTEND_PATH, frontendPackageJson)
}

const copyBackendAddonFragment = (temporaryAddonPath, name) => {
  const TEMP_BACKEND_PATH = `${temporaryAddonPath}/backend`

  if(!fs.existsSync(TEMP_BACKEND_PATH)){
    return
  }

  const NEW_ADDON_BACKEND_DIR = path.resolve(BACKEND_ADDONS_PATH, `./${name}`)
  fs.mkdirSync(NEW_ADDON_BACKEND_DIR);
  copyDir(TEMP_BACKEND_PATH, NEW_ADDON_BACKEND_DIR)
}

const copyFrontendAddonFragment = (temporaryAddonPath, name) => {
  const TEMP_FRONTEND_PATH = `${temporaryAddonPath}/frontend`

  if(!fs.existsSync(TEMP_FRONTEND_PATH)){
    return
  }

  const NEW_ADDON_FRONTEND_DIR = path.resolve(FRONTEND_ADDONS_PATH, `./${name}`)
  fs.mkdirSync(NEW_ADDON_FRONTEND_DIR);
  copyDir(TEMP_FRONTEND_PATH, NEW_ADDON_FRONTEND_DIR)
}

const copyCliAddonFragment = (temporaryAddonPath, name) => {
  const TEMP_CLI_PATH = `${temporaryAddonPath}/cli`

  if(!fs.existsSync(TEMP_CLI_PATH)){
    return
  }

  const NEW_ADDON_CLI_DIR = path.resolve(CLI_ADDONS_PATH, `./${name}`)
  fs.mkdirSync(NEW_ADDON_CLI_DIR);
  copyDir(TEMP_CLI_PATH, NEW_ADDON_CLI_DIR)
}

const copyScriptsAddonFragment = (temporaryAddonPath, name) => {
  const TEMP_SCRIPTS_PATH = `${temporaryAddonPath}/scripts`

  if(!fs.existsSync(TEMP_SCRIPTS_PATH)){
    return
  }

  const NEW_ADDON_SCRIPTS_DIR = path.resolve(SCRIPTS_ADDONS_PATH, `./${name}`)
  fs.mkdirSync(NEW_ADDON_SCRIPTS_DIR);
  copyDir(TEMP_SCRIPTS_PATH, NEW_ADDON_SCRIPTS_DIR)
}

const copyDir = (src, dest) => {
  try {
    fse.copySync(src, dest, { overwrite: false })
  } catch (err) {
    console.error(err)
  }
}

const deletePackageJsons = (name) => {
  const CLI_ADDON_PATH = `${CLI_ADDONS_PATH}/${name}`
  const BACKEND_ADDON_PATH = `${BACKEND_ADDONS_PATH}/${name}`
  const FRONTEND_ADDON_PATH = `${FRONTEND_ADDONS_PATH}/${name}`

  if(fs.existsSync(`${CLI_ADDON_PATH}/package.json`)){
    fs.unlinkSync(`${CLI_ADDON_PATH}/package.json`)
  }

  if(fs.existsSync(`${CLI_ADDON_PATH}/package-lock.json`)){
    fs.unlinkSync(`${CLI_ADDON_PATH}/package-lock.json`)
  }

  if(fs.existsSync(`${BACKEND_ADDON_PATH}/package.json`)){
    fs.unlinkSync(`${BACKEND_ADDON_PATH}/package.json`)
  }

  if(fs.existsSync(`${BACKEND_ADDON_PATH}/package-lock.json`)){
    fs.unlinkSync(`${BACKEND_ADDON_PATH}/package-lock.json`)
  }

  if(fs.existsSync(`${FRONTEND_ADDON_PATH}/package.json`)){
    fs.unlinkSync(`${FRONTEND_ADDON_PATH}/package.json`)
  }

  if(fs.existsSync(`${FRONTEND_ADDON_PATH}/package-lock.json`)){
    fs.unlinkSync(`${FRONTEND_ADDON_PATH}/package-lock.json`)
  }
}

const getPackageJson = async (temporaryAddonPath, resource) => {
  const tmpRepoPath = `../../../../${temporaryAddonPath}/${resource}/package.json`

  if (!fs.existsSync(tmpRepoPath)) {
    console.log(`No package.json found for ${resource}, skipping`)
    return
  }

  const { default: packageJson } = await import(tmpRepoPath, {
    assert: {
      type: "json",
    },
  });

  return packageJson
}

const addAddon = async (url, name) => {
  const temporaryAddonPath = `./tmp/${crypto.randomUUID()}`

  shell.exec(`git clone --depth 1 ${url} ${temporaryAddonPath}`)

  await installCliDependencies(temporaryAddonPath)
  await installBackendDependencies(temporaryAddonPath)
  await installFrontendDependencies(temporaryAddonPath)

  copyCliAddonFragment(temporaryAddonPath, name)
  copyBackendAddonFragment(temporaryAddonPath, name)
  copyFrontendAddonFragment(temporaryAddonPath, name)
  copyScriptsAddonFragment(temporaryAddonPath, name)
  // copy extensions addon fragment

  deletePackageJsons(name)
}

export default addCommand