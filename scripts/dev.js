import shell from 'shelljs'
import { addonLifecycleCommands } from './addons/index.js';

import fs from 'fs'
import { resolve } from 'path'

// For every addon in scripts/addons
// Get all dev commands and run them concurrently

const addonDevCommandsFormatted = addonLifecycleCommands.map(command => command.dev).filter(command => !!command).map((command) => `"${command}"`).join(" ")

// Deletes HOST.txt file so it can be regenerated
const HOST_TEXT_FILE_PATH = resolve('HOST.txt')

if(fs.existsSync(HOST_TEXT_FILE_PATH)){
  fs.unlink(HOST_TEXT_FILE_PATH, function(err) {
    console.log(err)
  });
}

shell.exec(`concurrently --kill-others ${addonDevCommandsFormatted} "npm run osb log" --raw`)