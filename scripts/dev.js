import shell from 'shelljs'
import { addonLifecycleHookCommands } from './addons/index.js';

// For every addon in scripts/addons
// Get all dev commands and run them concurrently

const addonDevCommandsFormatted = addonLifecycleHookCommands.map(command => command.dev).filter(command => !!command).map((command) => `"${command}"`).join(" ")

shell.exec(`concurrently --kill-others ${addonDevCommandsFormatted} "npm run osb log" --raw`)