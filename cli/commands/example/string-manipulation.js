import { Command } from 'commander';
const program = new Command();

import subcommand from './commands/subcommandExample.js'

// IMPORTANT: Since this cli is run under a subcommand defined in the package.json, when invoking commands, options MUST be passed after a `--` delimiter.

// Example
// npm run osb string-manipulation split My:String -- -s :

// Generalized example
// npm run osb <COMMAND> <SUBCOMMANDS> <ARGUMENTS> -- -option1 1 -option2 2 -option3 3

const stringManipulationCommand =

program.command('string-manipulation')
  .description('Split a string into substrings and display as an array')

stringManipulationCommand.addCommand(subcommand)// Important to attach this to the current command "stringManipulationCommand", not "program" itself.

export default stringManipulationCommand