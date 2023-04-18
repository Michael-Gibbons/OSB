import { Command } from 'commander';
const program = new Command();

import path from 'path'

const TEMPLATES_PATH = path.join(process.cwd(), '/cli/commands/new/templates')

import { copyFileFromTemplate } from '../../../util/index.js';

const endpointCommand =
program.command('endpoint')
  .description('Creates a new CRUD endpoint.')
  .action((data) => {
    const NAME = 'dogs'

    const input = path.join(TEMPLATES_PATH, 'test.js')
    const output = path.join(TEMPLATES_PATH, 'output.js')

    copyFileFromTemplate(input, output, {from: "__DELIMITER__", to: "SuperCoolNewThing"})
  });

export default endpointCommand