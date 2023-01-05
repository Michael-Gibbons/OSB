import { Command } from 'commander';
const program = new Command();

import { exec } from 'child_process';
import fs from 'fs'
import inquirer from 'inquirer';

const ENV_EXAMPLE_PATH = './web/backend/env.example'
const TARGET_ENV_PATH = './web/backend/.env'

const createBackendEnv = async (answers) => {

  const { name } = answers

  console.log("Creating your env in /web/backend")
  await fs.readFile(ENV_EXAMPLE_PATH, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    const result = data.replace(/DATABASE_NAME/g, name)

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
    throw new Error(".env file already exists, I won't overwrite your existing env. You're welcome")
  }

  inquirer
  .prompt([
    {
      type: "input",
      message: "What is your Postgres Database Name? (Note: NOT the schema)",
      name: "name"
    }
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