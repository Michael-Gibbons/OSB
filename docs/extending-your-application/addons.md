# Addons

I've created an Addon system in OSB. Addons in OSB are slightly different than addons in other tools you may be familiar with.

Addons are additional pieces of boilerplate that you don't need in every project but also don't want to code again.

For example, an addon for creating a websocket connection between the frontend and the backend, or a klaviyo integration, or hotkey support.

They can be anything! Be creative! Save time!

## Addon Structure

The structure of an addon is simple, I have created an example addon [here](https://github.com/Michael-Gibbons/osb-addon-example).

As you can see, there are `backend`, `frontend`, and `cli` folders. Each of these folders contain a `register.js` file, and an `index.js` file.

The addon project structure can be anything, the only thing that matters is that all your important logic resolves inside those files.

Think of each of these 3 folders as completely separate entities because they are.

The cli code is run at the root application level.
The backend code is run at `web/backend` at the server level
The frontend code is run at `web/frontend` at the browser level.

!> Important to remember here that since the frontend code is run at the browser level you won't have access to server side nodejs tools like `fs` since they do not make sense within the browser context.

### register.js

This file must export a `register` function. Depending on the context in which the register file is for (backend, frontend, or cli), it will have different arguments passed to it. You may modify those arguments and those modifications will carry over to the main application.

| Context | Arguments |
|-|-|
| Cli | The commander `program` instance for the main cli. |
| Backend | The express `app` |
| Frontend | The app's `host` |

As time goes on I'm sure I will add new arguments to these register functions and you may too, simply pass in your data to the `registerBackendAddons`, `registerFrontendAddons`, or `registerCliAddons` functions.


### index.js

This file is for exporting utilities for use in the main application. Simply import and export any resources required for your addon and use them within OSB as one would usually do with an index.js file.

For example:

```js
 // web/backend/addons/index.js, web/frontend/addons/index.js, cli/addons/index.js

 export { mySuperCoolAddonMethod }
```

```js
  import { mySuperCoolAddonMethod } from 'path/to/addons/your-addon/index.js'
```


## Creating a new addon

Creating a new addon is simple, fork my [example addon repository](https://github.com/Michael-Gibbons/osb-addon-example). Then add it to your OSB app using the following command.

```
npm run osb addon add https://github.com/path/to/your/addon/repo
```

?> I would prefer if you prefix your addon names with `osb-addon-` for cleanliness' sake but its a free country.

## Removing an addon

To remove an addon, use the following command

```
npm run osb addon remove ADDON_NAME
```

`ADDON_NAME` is just the name of the folder the addon is contained in.

!> Addon dependencies are not uninstalled on addon removal, you may be using common dependencies in different parts of your application so you must manage the dependencies yourself.

## Developing Addons

There are 2 main methods you can employ for addon development.

1. Make changes to your addon in the addon repository -> commit and push those changes -> remove the old version of the addon from OSB, re-add it with those new changes.

2. Make changes directly to your addon within the individual `frontend/addons` `backend/addons` `cli/addons` -> extract those changes manually to your addon repository.

Method 1 is best for small changes, method 2 is best for large changes. But again its a free country do as you please.

## A note about version control

Addons are meant to be additional boilerplate, because of this depending on the business logic of the application you may need to modify or add to the logic of the addon. As such addon files *should be committed to version control*.

This comes with an important caveat. if an addon is updated and you would like to pull the new changes, you must resolve the new changes with your current logic yourself since it relates to the business logic of your application.