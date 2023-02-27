# Cli Commands

## Installing an addon
To install an addon run the following command, replacing REPO_URL with your addon repository. This should be in the addon's readme file as well.

```
npm run osb addon add REPO_URL
```

This command will clone the addon repository, retrieve each addon fragment, and move them to their correct locations with an `addons` folder for the specific resource.

These changes should be committed to version control as you may need to edit the logic of the addon depending on your app's functionality.

## Removing an addon

To remove an addon, use the following command

```
npm run osb addon remove ADDON_NAME
```

`ADDON_NAME` is just the name of the folder the addon is contained in.

!> Addon dependencies are not uninstalled on addon removal, you may be using common dependencies in different parts of your application so you must manage the dependencies yourself.

## Creating a new addon

Creating a new addon is simple, fork my [example addon repository](https://github.com/Michael-Gibbons/osb-addon-example). Then add it to your OSB app using the following command.

```
npm run osb addon add https://github.com/path/to/your/addon/repo
```

?> I would prefer if you prefix your addon names with `osb-addon-` for cleanliness' sake but its a free country.