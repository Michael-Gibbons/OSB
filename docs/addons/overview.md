# Addons

I've created an Addon system in OSB. Addons in OSB are slightly different than addons in other tools you may be familiar with.

Addons are additional pieces of boilerplate that you don't need in every project but also don't want to code again.

For example, an addon for creating a websocket connection between the frontend and the backend, or a klaviyo integration, or hotkey support.

They can be anything! Be creative! Save time!

## Developing Addons

There are 2 main methods you can employ for addon development.

1. Make changes to your addon in the addon repository -> commit and push those changes -> remove the old version of the addon from OSB, re-add it with those new changes.

2. Make changes directly to your addon within the individual `frontend/addons` `backend/addons` `cli/addons` -> extract those changes manually to your addon repository.

Method 1 is best for small changes, method 2 is best for large changes. But again its a free country do as you please.

## A note about version control

Addons are meant to be additional boilerplate, because of this depending on the business logic of the application you may need to modify or add to the logic of the addon. As such addon files *should be committed to version control*.

This comes with an important caveat. if an addon is updated and you would like to pull the new changes, you must resolve the new changes with your current logic yourself since it relates to the business logic of your application.