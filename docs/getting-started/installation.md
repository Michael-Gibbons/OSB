# Installation

## From Scratch

To create a new shopify app using this template, in your projects folder (no need to create a new directory, it is done for you), run the command:

```
npm init @shopify/app@latest -- --template=https://github.com/Michael-Gibbons/OSB
```

This will use the Shopify cli to create an app under a name you will give it, along with a new git repository.

- `cd` into the named folder you just created.

- `cd` into `web/backend`

- Create a `.env` file in `web/backend`.

- Copy the contents of `web/backend/.env.example` into `.env`

- Input the correct value for `DATABASE_URL`

- Run the following to initialize the database.

```
npx prisma migrate dev --name init
```

`cd ../..`

Verify you have your local redis server running.

Then run the following command to install all required dependencies and register the app with shopify.

```
npm run dev
```

The shopify cli may ask you to authenticate and it will install some packages, typical setup stuff. If any of your environment variables are incorrect an error will be thrown when running the `dev` script, using the [envalid](https://www.npmjs.com/package/envalid) package. Very handy.

Once you fix any errors relating to the environment variables, go to the Shopify Partners admin, click on the app you just created and install it on a test store.

An OAuth menu should appear, accept, wait for the app to load, and viola!

When you're ready commit and push your repository and build the app of your dreams!

## From an existing app

Perhaps the app you are working on is already created and has a repo and you just need to get up and running to add a feature. To do so, clone the existing repository:

```
git clone https://github.com/path/to/your/app/repo.git
```

```
npm install
```

- `cd` into `web/backend`

- Create a `.env` file in `web/backend`.

- Copy the contents of `web/backend/.env.example` into `.env`

- Input the correct value for `DATABASE_URL`

- Run the following to initialize the database.

```
npx prisma migrate dev --name init
```

- `cd ../..`

```
npm run dev
```

The shopify cli should then prompt you for some setup then you should be good to go!