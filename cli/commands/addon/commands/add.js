import { Command } from 'commander';
const program = new Command();

import shell from 'shelljs'
import crypto from 'crypto'
import fs from 'fs'
import fse from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLI_PATH = path.resolve(__dirname, '../../..')
const CLI_ADDONS_PATH = path.resolve(CLI_PATH, 'addons')

const FRONTEND_PATH =  path.resolve(__dirname, '../../../..', 'web', 'frontend')
const FRONTEND_ADDONS_PATH = path.resolve(FRONTEND_PATH, 'addons')

const BACKEND_PATH = path.resolve(__dirname, '../../../..', 'web', 'backend')
const BACKEND_ADDONS_PATH = path.resolve(BACKEND_PATH, 'addons')

const SCRIPTS_PATH = path.resolve(__dirname, '../../../..')
const SCRIPTS_ADDONS_PATH = path.resolve(SCRIPTS_PATH, 'scripts', 'addons')

const EXTENSIONS_SRC_PATH = path.resolve(__dirname, '../../../..', './web/extensions')
const EXTENSIONS_SRC_ADDONS_PATH = path.resolve(EXTENSIONS_SRC_PATH, 'addons')

const addCommand =

program.command('add')
  .argument('<url>', 'addon repository url')
  .description('Adds an addon from a repository url.')
  .option('--name <name>', 'Custom name for the addon, required to install multiple versions of the same addon')
  .action( async (url, options) => {
    const urlSplit = url.split('/')
    let addonName = (urlSplit[urlSplit.length - 1]).split('.')[0]

    if(options.name){
      const sluggedName = options.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '').replace(/^-/, '')
      addonName = sluggedName
    }

    const CLI_ADDON_PATH = path.resolve(CLI_ADDONS_PATH, addonName)
    const FRONTEND_ADDON_PATH = path.resolve(FRONTEND_ADDONS_PATH, addonName)
    const BACKEND_ADDON_PATH = path.resolve(BACKEND_ADDONS_PATH, addonName)

    const addonIsInstalled = fs.existsSync(CLI_ADDON_PATH) || fs.existsSync(BACKEND_ADDON_PATH) || fs.existsSync(FRONTEND_ADDON_PATH)
    if(addonIsInstalled){
      throw `ERROR: Addon with the name "${addonName}" is already installed`
    }

    await addAddon(url, addonName)
    fs.rmSync(path.resolve(process.cwd(), 'tmp'), { recursive: true })
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

const installCliDependencies = async (addonId) => {
  const cliPackageJson = await getPackageJson(addonId, 'cli')

  if(cliPackageJson){
    console.log('\nInstalling Cli Dependencies...\n')
    await installDependencies(CLI_PATH, cliPackageJson)
  }
}
const installBackendDependencies = async (addonId) => {
  const backendPackageJson = await getPackageJson(addonId, 'backend')

  if(backendPackageJson){
    console.log('\nInstalling Backend Dependencies...\n')
    await installDependencies(BACKEND_PATH, backendPackageJson)
  }

}
const installFrontendDependencies = async (addonId) => {
  const frontendPackageJson = await getPackageJson(addonId, 'frontend')

  if(frontendPackageJson){
    console.log('\nInstalling Frontend Dependencies...\n')
    await installDependencies(FRONTEND_PATH, frontendPackageJson)
  }
}

const installExtensionDependencies = async (name) => {
  const destinationPath = path.resolve(EXTENSIONS_SRC_ADDONS_PATH, name)

  if(fs.existsSync(destinationPath)){
    console.log('\nInstalling Extension Dependencies...\n')
    await shell.exec(`cd ${destinationPath} && npm install`)
  }
}

const copyBackendAddonFragment = (temporaryAddonPath, name) => {
  const TEMP_BACKEND_PATH = path.join(temporaryAddonPath, 'backend')

  if(!fs.existsSync(TEMP_BACKEND_PATH)){
    return
  }

  const NEW_ADDON_BACKEND_DIR = path.resolve(BACKEND_ADDONS_PATH, name)
  fs.mkdirSync(NEW_ADDON_BACKEND_DIR);
  copyDir(TEMP_BACKEND_PATH, NEW_ADDON_BACKEND_DIR)
}

const copyFrontendAddonFragment = (temporaryAddonPath, name) => {
  const TEMP_FRONTEND_PATH = path.join(temporaryAddonPath, 'frontend')

  if(!fs.existsSync(TEMP_FRONTEND_PATH)){
    return
  }

  const NEW_ADDON_FRONTEND_DIR = path.resolve(FRONTEND_ADDONS_PATH, name)
  fs.mkdirSync(NEW_ADDON_FRONTEND_DIR);
  copyDir(TEMP_FRONTEND_PATH, NEW_ADDON_FRONTEND_DIR)
}

const copyCliAddonFragment = (temporaryAddonPath, name) => {
  const TEMP_CLI_PATH = path.join(temporaryAddonPath, 'cli')

  if(!fs.existsSync(TEMP_CLI_PATH)){
    return
  }

  const NEW_ADDON_CLI_DIR = path.resolve(CLI_ADDONS_PATH, name)
  fs.mkdirSync(NEW_ADDON_CLI_DIR);
  copyDir(TEMP_CLI_PATH, NEW_ADDON_CLI_DIR)
}

const copyScriptsAddonFragment = (temporaryAddonPath, name) => {
  const TEMP_SCRIPTS_PATH = path.join(temporaryAddonPath, 'scripts')

  if(!fs.existsSync(TEMP_SCRIPTS_PATH)){
    return
  }

  const NEW_ADDON_SCRIPTS_DIR = path.resolve(SCRIPTS_ADDONS_PATH, name)
  fs.mkdirSync(NEW_ADDON_SCRIPTS_DIR);
  copyDir(TEMP_SCRIPTS_PATH, NEW_ADDON_SCRIPTS_DIR)
}

const copyExtensionsSrcAddonFragment = (temporaryAddonPath, name) => {
  const TEMP_EXTENSIONS_PATH = path.join(temporaryAddonPath, 'extension')

  if(!fs.existsSync(TEMP_EXTENSIONS_PATH)){
    return
  }

  const NEW_ADDON_EXTENSIONS_SRC_DIR = path.resolve(EXTENSIONS_SRC_ADDONS_PATH, name)
  fs.mkdirSync(NEW_ADDON_EXTENSIONS_SRC_DIR);
  copyDir(TEMP_EXTENSIONS_PATH, NEW_ADDON_EXTENSIONS_SRC_DIR)

  const themeAppExtensionTomlFile = path.join(NEW_ADDON_EXTENSIONS_SRC_DIR, 'src', 'shopify.theme.extension.toml')

  if(fs.existsSync(themeAppExtensionTomlFile)){
    fs.readFile(themeAppExtensionTomlFile, 'utf-8', function(err, data){
      if (err) throw err;

      const newValue = data.replace('OSB_EXTENSION_NAME', name);

      fs.writeFile(themeAppExtensionTomlFile, newValue, 'utf-8', function (err) {
        if (err) throw err;
      });
    });

  }

  const themeAppExtensionAppBlockEntryPoint = path.join(NEW_ADDON_EXTENSIONS_SRC_DIR, 'src', 'blocks','app-block.liquid')

  if(fs.existsSync(themeAppExtensionAppBlockEntryPoint)){
    fs.readFile(themeAppExtensionAppBlockEntryPoint, 'utf-8', function(err, data){
      if (err) throw err;

      const newValue = data.replace('OSB_EXTENSION_NAME', name);

      fs.writeFile(themeAppExtensionAppBlockEntryPoint, newValue, 'utf-8', function (err) {
        if (err) throw err;
      });
    });

  }
  // TODO, create clauses in here to handle UI and function toml files
}

const copyDir = (src, dest) => {
  try {
    fse.copySync(src, dest, { overwrite: false })
  } catch (err) {
    console.error(err)
  }
}

const deletePackageJsons = (name) => {

  const CLI_ADDON_PATH = path.join(CLI_ADDONS_PATH, name)
  const BACKEND_ADDON_PATH = path.join(BACKEND_ADDONS_PATH, name)
  const FRONTEND_ADDON_PATH = path.join(FRONTEND_ADDONS_PATH, name)

  const pathsToCheck = [CLI_ADDON_PATH, BACKEND_ADDON_PATH, FRONTEND_ADDON_PATH]
  const filesToDelete = ['package.json', 'package-lock.json']

  for ( const pathToCheck of pathsToCheck ){
    for(const file of filesToDelete){
      const filePathToCheck = path.resolve(__dirname, pathToCheck, file)
      if(fs.existsSync(filePathToCheck)){
        fs.unlinkSync(filePathToCheck)
      }
    }
  }
}

const getPackageJson = async (addonId, resource) => {
  const relativeRepoPath = path.join('../../../../', 'tmp', addonId, resource, 'package.json').replace(/\\/g, '/')
  const absoluteRepoPath = path.resolve(__dirname, relativeRepoPath);

  if (!fs.existsSync(absoluteRepoPath)) {
    console.log(`No package.json found for ${resource}, skipping`)
    return
  }

  const { default: packageJson } = await import(relativeRepoPath, {
    assert: {
      type: "json",
    },
  });

  return packageJson
}

const addAddon = async (url, name) => {
  const addonId = crypto.randomUUID()
  const temporaryAddonPath = path.join('tmp', addonId)
  const temporaryAddonPathAbsolute = path.resolve(process.cwd(), 'tmp', addonId)
  shell.exec(`git clone --depth 1 ${url} "${temporaryAddonPathAbsolute}"`)

  await installCliDependencies(addonId)
  await installBackendDependencies(addonId)
  await installFrontendDependencies(addonId)

  copyCliAddonFragment(temporaryAddonPath, name)
  copyBackendAddonFragment(temporaryAddonPath, name)
  copyFrontendAddonFragment(temporaryAddonPath, name)
  copyScriptsAddonFragment(temporaryAddonPath, name)
  copyExtensionsSrcAddonFragment(temporaryAddonPath, name)

  // Extensions must be compiled into code shopify is expecting.
  // therefore dependencies are *NOT* installed at the app level, rather they are installed at the extension src level so they can be compiled into build files.
  await installExtensionDependencies(name)

  deletePackageJsons(name)
}

export default addCommand