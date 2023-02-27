import shell from 'shelljs'
import { addonLifecycleCommands } from './addons/index.js';

// For every addon in scripts/addons
// Get all build commands and run before shopify's build

for (const addonLifecycleCommand of addonLifecycleCommands) {
  const command = addonLifecycleCommand.build

  if(command){
    await shell.exec(command, {async:true});
  }
}