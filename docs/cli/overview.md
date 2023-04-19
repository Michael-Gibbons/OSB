# CLI

This template uses the very popular [commander](https://www.npmjs.com/package/commander) and [inquirer](https://www.npmjs.com/package/inquirer) packages to handle the cli creation and usage.

The cli code is located in the `/cli` directory.

The goal of the cli is simply to bootstrap development, if you'd rather not use it you can absolutely do all the processes manually. By viewing these docs and the cli code you can extrapolate what the commands are doing to replicate manually or to build your own integrations relevant to your development process.

```
Command line tool to help bootstrap OSB projects

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  log             Logs out stylized stdout from your OSB application. Used concurrently with the dev script.
  init            Initializes OSB application by creating backend env file and initializing database.
  addon           A series of commands related to addons.
  new             A series of commands related to the creation of resources within OSB.
  help [command]  display help for command
```