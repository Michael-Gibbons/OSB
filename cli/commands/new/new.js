import { Command } from 'commander';
const program = new Command();

import endpointCommand from './commands/endpoint.js'

const newCommand =

program.command('new')
  .description('A series of commands related to the creation of resources within OSB.')

newCommand.addCommand(endpointCommand)

export default newCommand