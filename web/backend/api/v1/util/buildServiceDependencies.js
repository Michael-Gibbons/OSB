import fs from 'fs'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const RESOURCE_SCHEMAS_LOCATION = '../services/'
const dirPath = path.resolve(__dirname, RESOURCE_SCHEMAS_LOCATION);

const buildServiceDependencies = async () => {
  const files = fs.readdirSync(dirPath)

  const dependencies = {}

  for (const file of files) {
    const moduleImportUrl = pathToFileURL(path.resolve(dirPath, file))
    const { default: schemaModule } = await import(moduleImportUrl);

    // get file name, remove extension
    const name = file.split('.')[0]

    dependencies[name] = schemaModule
  }

  return dependencies
}

export default buildServiceDependencies