import fs from 'fs'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const RESOURCE_SCHEMAS_LOCATION = '../schemas/resources/'
const dirPath = path.resolve(__dirname, RESOURCE_SCHEMAS_LOCATION);

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const buildSchemaDependencies = async () => {
  const files = fs.readdirSync(dirPath)

  const dependencies = {}

  for (const file of files) {
    const moduleImportUrl = pathToFileURL(path.resolve(dirPath, file))
    const { default: schemaModule } = await import(moduleImportUrl);

    // get file name, remove extension, convert to lower case, remove 'schema', capitalize first letter
    const rawName = file.split('.')[0].toLowerCase().replace('schema', '')
    const name = capitalizeFirstLetter(rawName)

    dependencies[name] = schemaModule
  }

  return dependencies
}


export default buildSchemaDependencies