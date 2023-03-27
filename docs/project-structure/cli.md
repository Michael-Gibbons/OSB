# CLI

This template uses the very popular [commander](https://www.npmjs.com/package/commander) and [inquirer](https://www.npmjs.com/package/inquirer) packages to handle the cli creation and usage.

Out of the box, the OSB cli has these commands.

## log

This command is typically only invoked concurrently with `npm run dev`. It creates 2 new files, `log.log` and `log-old.log`. The logger service uses these files to log out colorized data from your shopify application.

You can run it yourself of course, but you don't need to as it is done for you in the dev command.

```
npm run osb log
```

## example

This command is purely a code example of how one would create a cli command with subcommands. Feel free to delete or ignore.

The command takes a string argument and a delimiter option and splits the string by the delimiter. In this example `string-manipulation` can refer to a parent command that could have any number of related string manipulation subcommands

```
npm run osb string-manipulation split My:String -- -s :
```

!> Notice the extra `--`. Since this cli is run under a subcommand defined in the package.json, when invoking commands, options MUST be passed after a `--` delimiter.

## help

This command provides a help menu showing all commands.

```
npm run osb help
```

```
npm run osb -- -h
```