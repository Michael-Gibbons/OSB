# OSB Addon File Structure

```
└── OSB Addon File Structure
  └── cli
      ├── your custom files
      └── register.js
  └── scripts
      ├── your custom files
      └── lifecycle-commands.js
  └── frontend
      ├── your custom files
      └── register.js
  └── backend
      ├── your custom files
      └── register.js
  └── extension
      ├── your custom files
      └── package.json with dev and build scripts
```

# Directory Explanation

OSB addons currently have the following directories which accomplish unique objectives. Currently the directories are:

- Cli
- Scripts
- Frontend
- Backend
- Extension

Below are explanations for what the directories do, what problems they solve, and required file(s) for addons to work correctly.

You may also view an example addon repository [here](https://github.com/Michael-Gibbons/osb-addon-example)

## Cli

?> This directory allows your custom addons to inject cli commands into the OSB cli.

The required file for this directory is `register.js`. Within this file you must export a javascript function of the following form:


```js
const register = ({ program }) => {
  // your code here
}

export {
  register
}
```

The `program` paramter represents the [commander](https://www.npmjs.com/package/commander) cli process.
## Scripts

?> This directory allows your custom addons to inject addon-specific scripts into the `dev` and `build` commands. Useful for addons which have a build process or watchers.

The required file for this directory is `lifecycle-commands.js`. Within this file you must export a javascript object of the following form:

```js
const LIFECYCLE_COMMANDS = {
  dev: 'npm run osb your-custom-osb-dev-command',
  build: 'npm run osb your-custom-osb-build-command'
}

export {
  LIFECYCLE_COMMANDS
}
```

## Frontend

?> This directory allows your custom addons inject code to be built into the app's frontend. Since this is run in the browser context, note you will not have access to modules such as `fs`.

The required file for this directory is `register.js`. Within this file you must export a javascript function of the following form:

```js
const register = ({ host }) => {
  // your code here
}

export {
  register
}
```

The `host` parameter represents the string url of the server the frontend code is being compiled from.

## Backend

?> This directory allows your custom addons to inject code to be run on the app's backend.

The required file for this directory is `register.js`. Within this file you must export a javascript function of the following form:

```js
const register = ({ app }) => {
  // your code here
}

export {
  register
}
```

The `app` parameter represents the [express](https://www.npmjs.com/package/express) server object.

## Extension

?> This directory allows your custom addons to inject extension build processes.

There are no required files, as long as your script does not error and compiles into shopify extension code in a root `extensions` directory it should be fine. For an example see [osb-addon-theme-extension-base](https://github.com/Michael-Gibbons/osb-addon-theme-extension-base)