import { Command } from 'commander';
const program = new Command();

import newCommand from './commands/new.js'
import removeCommand from './commands/remove.js'

const addonCommand =

program.command('addon')
  .description('A series of commands related to addons.')

addonCommand.addCommand(newCommand)
addonCommand.addCommand(removeCommand)

export default addonCommand