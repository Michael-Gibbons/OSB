# Lifecycle Hooks

I have created an example lifecycle hook structure in `web/backend/lifecycle-hooks/`. Currently there are only 2 lifecycle hooks. `installed` and `uninstalled` which are called when a shop installs/uninstalls respectively.

An example in which you may want to use this is if you need to generate database tables with default values when a store installs your app. For example in this template the `Settings` model is in a *one-to-one* relationship with the `Shop` model, so when a store installs the app we must add the shop to our `Shops` table along with its `Settings`, populated from a default.

Lifecycle hooks are simply functions invoked at specific parts in your application. Nothing special about them other than we are naming them lifecycle hooks.

You may follow this pattern to create custom lifecycle hooks throughout various points in your application. 