import { Command } from 'commander';
const program = new Command();

import { exec } from 'child_process';
import fs from 'fs'
import inquirer from 'inquirer';

const ENV_EXAMPLE_PATH = './web/backend/env.example'
const TARGET_ENV_PATH = './web/backend/.env'

const createBackendEnv = async (answers) => {

  const { name, userName, userPass, userPort } = answers

  console.log("Creating your env in /web/backend")
  await fs.readFile(ENV_EXAMPLE_PATH, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    let result = data.replace(/DATABASE_NAME/g, name)
    result = result.replace(/DB_USER_NAME/g, userName)
    result = result.replace(/DB_USER_PASSWORD/g, userPass)
    result = result.replace(/DB_PORT/g, userPort)

    fs.writeFile(TARGET_ENV_PATH, result, 'utf8', function (err) {
       if (err) return console.log(err);
    });
  });
  console.log("env created, initializing database")

  console.log(`\n ---------- The following are prisma's logs\n`)
  await exec("npx prisma migrate dev --name init",
  {
    cwd: "./web/backend",
  }, () => {
    console.log(`\n ---------- The above are prisma's logs\n`)
  }).stdout.pipe(process.stdout);

}

const envInit = () => {

  if (fs.existsSync(TARGET_ENV_PATH)) {
    return
  }

  console.log("No backend env file detected initiating first time setup")

  inquirer
  .prompt([
    {
      type: "input",
      message: "What is your Postgres Database Name? (Note: NOT the schema)",
      name: "name",
    },
    {
      type: "input",
      message: "What is your Postgres User Name?",
      name: "userName",
      default: 'postgres'
    },
    {
      type: "input",
      message: "What is your Postgres Database Password?",
      name: "userPass",
      default: 'admin',
    },
    {
      type: "input",
      message: "What is your Postgres Database Port?",
      name: "userPort",
      default: '5432',
    },
  ])
  .then((answers) => {
    createBackendEnv(answers)
  })
}

const init = () => {
  envInit()
}

const initCommand =

program.command('init')
  .description('Initializes OSB application by creating backend env file and initializing database.')
  .action(() => {
    init()
  })

export default initCommand