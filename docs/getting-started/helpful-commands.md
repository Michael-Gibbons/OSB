# Helpful Commands!

## Easily open documentation!

This template uses a lot of 3rd party open source packages to handle different aspects of the application. You will likely need to reference a lot of different documentation during the development process.

Because of this I made this simple package, [doc-me](https://www.npmjs.com/package/@michael.gibbons/doc-me). In the root of your application run:

```
npx doc
```

To get a list of all documentation used in this project. Selecting one will open the documentation in a new tab using your default browser.

![doc-me example](../assets/doc-me.png)

These urls are defined in the root `package.json` file, feel free to add your own as your project grows.

## Delete all old merged branches!

If you're working on a lot of features and you are (correctly) making branches for every feature, once they are merged you will rack up a lot of stale branches. Use the following command to delete all local merged branches.

```
npm run prune-branches
```

To delete all local branches that have been merged already.

## Update npm lock files

Sometimes when updating OSB by merging the most recent version of OSB into your project, lock files can become de-synced. Run this command to regenerate them before committing.

```
npm run update-package-lock
```