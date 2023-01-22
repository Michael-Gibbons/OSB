import { Command } from 'commander';
const program = new Command();

import newCommand from './commands/new.js'

const addonCommand =

program.command('addon')
  .description('A series of commands related to addons.')

addonCommand.addCommand(newCommand)

export default addonCommand