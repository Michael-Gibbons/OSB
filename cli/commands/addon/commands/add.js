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

const addCommand =

program.command('add')
  .argument('<url>', 'addon repository url')
  .description('Adds an addon from a repository url.')
  .action( async (data) => {
    await addAddon(data)
    fs.rmSync('./tmp', { recursive: true })
  })


const installDependencies = async (destinationPath, packageJson) => {
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
  const NEW_ADDON_BACKEND_DIR = path.resolve(BACKEND_ADDONS_PATH, `./${name}`)
  fs.mkdirSync(NEW_ADDON_BACKEND_DIR);
  copyDir(TEMP_BACKEND_PATH, NEW_ADDON_BACKEND_DIR)
}

const copyFrontendAddonFragment = (temporaryAddonPath, name) => {
  const TEMP_FRONTEND_PATH = `${temporaryAddonPath}/frontend`
  const NEW_ADDON_FRONTEND_DIR = path.resolve(FRONTEND_ADDONS_PATH, `./${name}`)
  fs.mkdirSync(NEW_ADDON_FRONTEND_DIR);
  copyDir(TEMP_FRONTEND_PATH, NEW_ADDON_FRONTEND_DIR)
}

const copyCliAddonFragment = (temporaryAddonPath, name) => {
  const TEMP_CLI_PATH = `${temporaryAddonPath}/cli`
  const NEW_ADDON_CLI_DIR = path.resolve(CLI_ADDONS_PATH, `./${name}`)
  fs.mkdirSync(NEW_ADDON_CLI_DIR);
  copyDir(TEMP_CLI_PATH, NEW_ADDON_CLI_DIR)
}

const copyDir = (src, dest) => {
  try {
    fse.copySync(src, dest, { overwrite: false })
  } catch (err) {
    console.error(err)
  }
}

const deletePackageJsons = (name) => {
  fs.unlinkSync(`${CLI_ADDONS_PATH}/${name}/package.json`)
  fs.unlinkSync(`${FRONTEND_ADDONS_PATH}/${name}/package.json`)
  fs.unlinkSync(`${BACKEND_ADDONS_PATH}/${name}/package.json`)
  fs.unlinkSync(`${CLI_ADDONS_PATH}/${name}/package-lock.json`)
  fs.unlinkSync(`${FRONTEND_ADDONS_PATH}/${name}/package-lock.json`)
  fs.unlinkSync(`${BACKEND_ADDONS_PATH}/${name}/package-lock.json`)
}

const getAddonName = async (temporaryAddonPath) => {
  const tmpRepoPath = `../../../../${temporaryAddonPath}/package.json`
  const { default: { name } } = await import(tmpRepoPath, {
    assert: {
      type: "json",
    },
  });

  return name
}

const getPackageJson = async (temporaryAddonPath, resource) => {
  const tmpRepoPath = `../../../../${temporaryAddonPath}/${resource}/package.json`
  const { default: packageJson } = await import(tmpRepoPath, {
    assert: {
      type: "json",
    },
  });

  return packageJson
}

const addAddon = async (data) => {
  const temporaryAddonPath = `./tmp/${crypto.randomUUID()}`

  shell.exec(`git clone --depth 1 ${data} ${temporaryAddonPath}`)

  const name = await getAddonName(temporaryAddonPath)

  await installCliDependencies(temporaryAddonPath)
  await installBackendDependencies(temporaryAddonPath)
  await installFrontendDependencies(temporaryAddonPath)

  copyCliAddonFragment(temporaryAddonPath, name)
  copyBackendAddonFragment(temporaryAddonPath, name)
  copyFrontendAddonFragment(temporaryAddonPath, name)

  deletePackageJsons(name)
}

export default addCommand