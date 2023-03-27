# Installation

## From Scratch

To create a new shopify app using this template, in your projects folder (no need to create a new directory, it is done for you), run the commands:

---

```
npm init @shopify/app@latest -- --template=https://github.com/Michael-Gibbons/OSB
```

This command will download the template and prompt you for the name of your app. Once it's done, `cd` into the new directory.

---

```
npm run dev
```

This command will prompt you for your Postgres local database and schema names, create an env file in `/web/backend`, and initialize the database.

Once the database is set up, the shopify dev command is run which installs your app. The shopify cli may ask you to authenticate and it will install some packages, typical setup stuff. If any of your environment variables are incorrect an error will be thrown when running the `dev` script, using the [envalid](https://www.npmjs.com/package/envalid) package. Very handy.

Once you fix any errors relating to the environment variables, go to the Shopify Partners admin, click on the app you just created and install it on a test store.

An OAuth menu should appear, accept, wait for the app to load, and viola!

When you're ready commit and push your repository and build the app of your dreams!

## From an existing app

Perhaps the app you are working on is already created and has a repo, and you just need to get up and running to add a feature.
If so you don't need me repeating what these commands do, see the above.

Clone the existing repository:

```
git clone https://github.com/path/to/your/app/repo.git
```

```
npm install
```

```
npm run dev
```