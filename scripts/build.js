import shell from 'shelljs'
import { addonLifecycleHookCommands } from './addons/index.js';

// For every addon in scripts/addons
// Get all build commands and run before shopify's build

for (const addonLifecycleHookCommand of addonLifecycleHookCommands) {
  const command = addonLifecycleHookCommand.build

  if(command){
    await shell.exec(command, {async:true});
  }
}