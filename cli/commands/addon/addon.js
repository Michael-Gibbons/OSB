import { Command } from 'commander';
const program = new Command();

import removeCommand from './commands/remove.js'
import addCommand from './commands/add.js';

const addonCommand =

program.command('addon')
  .description('A series of commands related to addons.')

addonCommand.addCommand(removeCommand)
addonCommand.addCommand(addCommand)

export default addonCommand