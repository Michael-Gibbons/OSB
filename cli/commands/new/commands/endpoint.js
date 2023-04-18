import { Command } from 'commander';
const program = new Command();

import fs from 'fs'
import path from 'path'

const TEMPLATES_PATH = path.join(process.cwd(), '/cli/commands/new/templates')

const BACKEND_API_PATH = path.join(process.cwd(), '/web/backend/api/v1')

import { copyFileFromTemplate } from '../../../util/index.js';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const endpointCommand =
program.command('endpoint')
  .description('Creates a new CRUD endpoint.')
  .action((data) => {
    const pluralizedName = 'dogs'.toLowerCase()
    const capitalizedPluralName = capitalizeFirstLetter(pluralizedName)
    const singularName = pluralizedName.substring(0, pluralizedName.length - 1); // Naive implementation, I didn't want to add an entire package to pluralize.
    const capitalizedSingularName = capitalizeFirstLetter(singularName)

    const isExternalEndpoint = true

    const COLLECTION_TEMPLATE = path.join(TEMPLATES_PATH, 'COLLECTION_TEMPLATE.js')
    const newCollectionEndpoint = path.join(BACKEND_API_PATH, `/paths/${pluralizedName}.js`)

    const SINGLETON_TEMPLATE = path.join(TEMPLATES_PATH, 'SINGLETON_TEMPLATE.js')
    const newSingletonEndpoint = path.join(BACKEND_API_PATH, `/paths/${pluralizedName}/{id}.js`)

    const SINGLETON_PATH = path.join(BACKEND_API_PATH, `/paths/${pluralizedName}`);

    if (!fs.existsSync(SINGLETON_PATH)){
      fs.mkdirSync(SINGLETON_PATH);
    }else{
      throw new Error(`"${pluralizedName}" directory already exists.`)
    }

    const delimiters = [
      {
        from: "__LOWERCASE_PLURALIZED_NAME__",
        to: pluralizedName
      },
      {
        from: "__UPPERCASE_PLURALIZED_NAME__",
        to: capitalizedPluralName
      },
      {
        from: "__LOWERCASE_SINGULAR__NAME",
        to: singularName
      },
      {
        from: "__UPPERCASE_SINGULAR_NAME__",
        to: capitalizedSingularName
      },
      {
        from: "__IS_EXTERNAL_ENDPOINT__",
        to: isExternalEndpoint
      }
    ]

    copyFileFromTemplate(COLLECTION_TEMPLATE, newCollectionEndpoint, delimiters)

    copyFileFromTemplate(SINGLETON_TEMPLATE, newSingletonEndpoint, delimiters)

    const INPUT_SCHEMA_TEMPLATE = path.join(TEMPLATES_PATH, 'INPUT_SCHEMA_TEMPLATE.js')
    const newInputSchema = path.join(BACKEND_API_PATH, `/schemas/inputs/${capitalizedPluralName}Input.js`)

    copyFileFromTemplate(INPUT_SCHEMA_TEMPLATE, newInputSchema, delimiters)

    const SERVICE_TEMPLATE = path.join(TEMPLATES_PATH, 'SERVICE_TEMPLATE.js')
    const newService = path.join(BACKEND_API_PATH, `/services/${pluralizedName}Service.js`)

    copyFileFromTemplate(SERVICE_TEMPLATE, newService, delimiters)

  });

export default endpointCommand