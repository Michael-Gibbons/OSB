# Environment Variables

This package uses the very popular [dotenv](https://www.npmjs.com/package/dotenv) package to handle it's environment variables.

The following is a list of environment variables used in the backend portion of this template and why they are used.

This `.env` file will be created for you in `/web/backend` when you run the dev script for the first time.

| Variable      | Default | Purpose |
| ----------- | ----------- | |
| `PORT` | none | The port for main communication in the app, usually injected by your hosting provider, not created or needed in development. |
| `DATABASE_URL` | none   | Connection string for your postgres database. See the [postgres documentation](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING) to see examples |
| `NODE_ENV`   | `development` | Node env for the application. Allowed values `development`, `staging`, `production`, `test` |
| `REDIS_HOST` | `127.0.0.1` | Host url for your redis instance |
| `REDIS_PORT` | `6379` | Port for your redis instance |
| `REDIS_USER` | none | Username for your redis instance, not necessary for dev |
| `REDIS_PASSWORD` | none | Password for your redis instance, not necessary for dev |
| `LOG_LEVEL` | `info` | Level of log you would like. See [winston](https://www.npmjs.com/package/winston#logging) for more information on log levels.
| `ADMIN_USERNAME` | `admin` | Username for the admin panel |
| `ADMIN_PASSWORD` | `admin` | Password for the admin panel |
| `LOGTAIL_SOURCE_TOKEN` | none | Source token for your [logtail](https://betterstack.com/logtail) account

!> Shopify also injects the following environment variables using the shopify-cli

| Variable      | Default | Purpose |
| ----------- | ----------- | |
| `SHOPIFY_API_KEY` | none | Shopify Authentication |
| `SHOPIFY_API_SECRET` | none | Shopify Authentication |
| `SCOPES` | `write_products, write_orders, write_customers` | Access scopes for your application, see [Shopify's access scopes](https://shopify.dev/api/usage/access-scopes)
| `HOST` | none | The url of your application, provided by shopify during dev using ngrok, provided by your hosting solution in production.
| `BACKEND_PORT` | random | Shopify will choose a random available port to communicate with the app's backend |
| `FRONTEND_PORT` | random | Shopify will choose a random available port between to communicate with the app's frontend |

!> Edit your application's scopes in the `shopify.app.toml` file