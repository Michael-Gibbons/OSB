import { Command } from 'commander';
const program = new Command();

// IMPORTANT: Since this cli is run under a sub command defined in the package.json, when invoking commands options MUST be passed after a `--` delimiter.

// Generalized example
// npm run osb <COMMAND> <SUBCOMMANDS> <ARGUMENTS> -- -option1 1 -option2 2 -option3 3

import logCommand from './log.js';
import initCommand from './init.js';
import addonCommand from './commands/addon/addon.js';

import { registerCliAddons } from './addons/index.js';

program
  .name('osb')
  .usage("[global options] command")
  .description('Command line tool to help bootstrap OSB projects')
  .version('0.1.0');

program.addCommand(logCommand)
program.addCommand(initCommand)
program.addCommand(addonCommand)

await registerCliAddons({ program })

program.configureHelp()

program.parse()