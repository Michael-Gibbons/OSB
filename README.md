![OSB Logo](/logo.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)

> V2 OF THIS BOILER IS CURRENTLY IN DEVELOPMENT, improvements include shopify cli v3, prisma, cli, and addon infrastructure. Use that information as you will.

> This framework is under active development, I believe it is in a usable state, however caution should be used.

This is an opinionated, full stack, sample app to help developers bootstrap their Shopify app development.

It expands upon [Shopify's Express App Template](https://github.com/Shopify/shopify-app-template-node).

## Why?

Shopify is a large company that has clients using a very diverse set of technical tools. As such if they want to make developer tools, they are forced to make them unopinionated to account for a very wide variety of uses. This forces developers to reinvent the wheel so-to-speak to make relatively simple full stack applications.

Luckily I am just a guy, so I have no such obligations.

## Why should I use it?

This framework, if you agree with its design decisions, adds the following functionality:

**Functional**

- Database pattern
- Custom session storage
- Client side routing
- Client and server side state management
- Development and production logging
- Redis queuing for high I/O requests
- GQL rate limiting
- UUID indexed error handling
- API client pattern
- Automatic webhook re-registration on ngrok url change
- GDPR webhook pattern for public app registration
- Unit testing

**UI/Ease of use additions**

- Pattern for loading state, banners, contextual save bar, modals, and the top bar
- Pattern for adding pages in the navigation and resources
- Entry point for overriding Polaris CSS
- Service injection design pattern

## Short rough demo

https://www.loom.com/share/05f6e968485349e0a00422b75a0596d4

## Tech Stack and Important Packages

The following is a list of the resources used by [Shopify's Express App Template](https://github.com/Shopify/shopify-app-template-node), links to their documentation, and a description on why they are used.

| Resource                                                            | Why its used                                              |
| ------------------------------------------------------------------- | --------------------------------------------------------- |
| [@apollo/client](https://www.apollographql.com/docs/react/)         | Fetching a shop's GQL data directly from the app frontend |
| [@shopify/polaris](https://polaris.shopify.com/components)          | Creating a Shopify-Compliant App UI                       |
| [@shopify/shopify-api](https://github.com/Shopify/shopify-api-node) | Making requests to the Shopify API                        |
| [React](https://reactjs.org/docs/getting-started.html)              | Foundation for frontend UI                                |
| [Express](https://expressjs.com/en/starter/installing.html)         | Foundation for web application                            |
| [dotenv](https://www.npmjs.com/package/dotenv)                      | Safely using sensitive api keys                           |
| [vitest](https://vitest.dev/guide/)                                 | Unit testing                                              |
| [supertest](https://www.npmjs.com/package/supertest)                | Unit testing                                              |

There are other resources used of course, which can be found in the package.json, but these are the main resources developers should be concerned with.

---

The following is a list of **additional packages and resources** added by this framework
|Resource| Why its used |
|--|--|
|[axios](https://axios-http.com/docs/intro) | To create API clients easily able to interact with the server and multiple 3rd parties.
| [bullmq](https://docs.bullmq.io/) | To manage Queues and Workers for high I/O Requests
| [react-router-dom](https://reactrouter.com/docs/en/v6) | Client side routing
| [sequelize](https://sequelize.org/docs/v6/getting-started/) | Database ORM
| [sequelize-cli](https://sequelize.org/docs/v6/other-topics/migrations/) | Helpful cli commands
| [sequelize-mig](https://www.npmjs.com/package/sequelize-mig) | Automatic generation of sequelize migrations from models
| [react-redux](https://redux.js.org/introduction/getting-started) | Client side state management
| [react-query](https://react-query.tanstack.com/overview) | Server side state management
| [react-error-boundary](https://github.com/bvaughn/react-error-boundary) | Gracefully handling client side errors
| [winston](https://github.com/winstonjs/winston) | Logging
| [chalk](https://www.npmjs.com/package/chalk) | log beautification
| [JSON-chalkify](https://www.npmjs.com/package/json-chalkify) | log beautification

## Requirements

This framework comes with a database pattern and redis queuing pattern out of the box. Because of that a database server and a redis server is required (if you choose to use redis). This framework uses `mysql2` so the following instructions are for that, however the process should be similar for any database dialect.

> Environment variable `USE_REDIS` can be set to `false` if you do not require it, this removes the need for a redis server

| Tool                                                         | Why its used                              |
| ------------------------------------------------------------ | ----------------------------------------- |
| [MySQL Workbench](https://www.mysql.com/products/workbench/) | To create a local database server         |
| [Redis](https://redis.io/docs/getting-started/)              | To create a local redis server (optional) |

## Installation

1. Follow the instructions for [Shopify's Express App Template](https://github.com/Shopify/shopify-app-template-node) to produce Shopify's sample app.
2. Replace the app directory's contents with this framework **with the exception of .shopify-cli.yml**. Your yml file should look something like:

```
---
project_type:  node
organization_id:  XXXXXX
```

> `organization_id` may not be present based on the account you're logged into with the shopify cli

> If you're not using the shopify cli, you may not need this file at all

## Environment Variables

The following is a list of environment variables with an example value and their purpose. Also listed in `.env.example`

> The following keys are randomly generated for documentation purposes, not used by any actual store because putting that in a readme would be blasphemous.

> This framework uses AWS cloudwatch for logs, it was chosen since many applications will fall within the free tier. So the env variables prefixed with `AWS` are for that. Feel free to replace it with your own logging strategy.

| Enviornment Variable           | Example Value                                                                                                   | Purpose                                                                                                                                                                 |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SHOPIFY_API_KEY`              | `576173c8f9a6gd1432e783623d1b550f`                                                                              | API key                                                                                                                                                                 |
| `SHOPIFY_API_SECRET`           | `f357df651e765674e9c98f27a2ad26h`                                                                               | API secret                                                                                                                                                              |
| `SHOP`                         | `myshop.myshopify.com`                                                                                          | Added by shopify cli, unused currently. `shop` knowledge has been dedicated to the `shop` database model to account for multiple stores accessing the app.              |
| `SCOPES`                       | `write_products+write_customers+...`                                                                            | `+` separated list of [Shopify API Access Scopes](https://shopify.dev/api/usage/access-scopes). `+` is used because AWS does not allow commas in enviornment variables. |
| `HOST`                         | `https://1c9e5948bd72.ngrok.io`                                                                                 | Hosted instance of application, ngrok, AWS, digital ocean, heroku, etc. **Must be https**. Required by shopify.                                                         |
| `DB_NAME`                      | `my-cool-db`                                                                                                    | **Local** database name                                                                                                                                                 |
| `DB_USER`                      | `michael`                                                                                                       | **Local** database user                                                                                                                                                 |
| `DB_PASSWORD`                  | `securePassword123`                                                                                             | **Local** database user password                                                                                                                                        |
| `DB_HOST`                      | `127.0.0.1`                                                                                                     | **Local** database host                                                                                                                                                 |
| `DB_PORT`                      | `3306`                                                                                                          | **Local** database port                                                                                                                                                 |
| `STAGING_DB_NAME`              | `my-cool-db`                                                                                                    | **Staging** database name                                                                                                                                               |
| `STAGING_DB_USER`              | `michael`                                                                                                       | **Staging** database user                                                                                                                                               |
| `STAGING_DB_PASSWORD`          | `securePassword123`                                                                                             | **Staging** database user password                                                                                                                                      |
| `STAGING_DB_HOST`              | `my-database-connection-string`                                                                                 | **Staging** database host                                                                                                                                               |
| `STAGING_DB_PORT`              | `3306`                                                                                                          | **Staging** database port                                                                                                                                               |
| `PROD_DB_NAME`                 | `my-cool-db`                                                                                                    | **Production** database name                                                                                                                                            |
| `PROD_DB_USER`                 | `michael`                                                                                                       | **Production** database user                                                                                                                                            |
| `PROD_DB_PASSWORD`             | `securePassword123`                                                                                             | **Production** database user password                                                                                                                                   |
| `PROD_DB_HOST`                 | `my-database-connection-string`                                                                                 | **Production** database host                                                                                                                                            |
| `PROD_DB_PORT`                 | `3306`                                                                                                          | **Production** database port                                                                                                                                            |
| `LOG_DB_QUERIES`               | `true` or `false`                                                                                               | Whether db commands should be logged to the console.                                                                                                                    |
| `USE_REDIS`                    | `true` or `false`                                                                                               | Whether redis will be used or not, if false the other redis variables are not required                                                                                  |
| `REDIS_HOST`                   | `127.0.0.1`                                                                                                     | **Local** redis host                                                                                                                                                    |
| `REDIS_PORT`                   | `6379`                                                                                                          | **Local** redis port                                                                                                                                                    |
| `STAGING_REDIS_HOST`           | `my-staging-redis-endpoint`                                                                                     | **Staging** redis host                                                                                                                                                  |
| `STAGING_REDIS_PORT`           | `6379`                                                                                                          | **Staging** redis port                                                                                                                                                  |
| `PROD_REDIS_HOST`              | `my-production-redis-endpoint`                                                                                  | **Production** redis host                                                                                                                                               |
| `PROD_REDIS_PORT`              | `6379`                                                                                                          | **Production** redis port                                                                                                                                               |
| `NODE_ENV`                     | `development`, `staging`, `production`                                                                          | Node env to use, determines which of the above keys are used for their respective resources.                                                                            |
| `LOG_LEVEL`                    | [winston](https://github.com/winstonjs/winston) log level. `error`, `warn`, `info`, `debug`, `verbose`, `silly` | Determines what logs should show when using the `logger` service.                                                                                                       |
| `FORCE_COLOR`                  | `1`                                                                                                             | Log beautification                                                                                                                                                      |
| `AWS_LOG_GROUP_NAME`           | `my-super-cool-log-group`                                                                                       | AWS Cloudwatch requirement                                                                                                                                              |
| `AWS_CLOUDWATCH_ACCESS_KEY_ID` | `AKIAGGAXKHGT3QPLBB4G`                                                                                          | AWS Cloudwatch requirement                                                                                                                                              |
| `AWS_CLOUDWATCH_SECRET`        | `HxGJhiO7lzPv/FEpNQZf6...`                                                                                      | AWS Cloudwatch requirement                                                                                                                                              |
| `AWS_REGION`                   | `us-west-1`                                                                                                     | AWS Cloudwatch requirement                                                                                                                                              |

## Recommended Development Pattern

The following is the development pattern I landed on, feel free to use or modify it.

- A production application is created with automatic deployments linked to the `main` branch
- A staging application is created with automatic deployments linked to a `staging` branch
- Each developer creates an application for their own development.

For example if we were building `My Cool Application` we would have the following apps in the shopify admin:

`My Cool Application` (production)
`My Cool Application Staging`
`My Cool Application Development Michael`
`My Cool Application Development Matt`
`My Cool Application Development Bree`

The development applications would be connected to the developer's local database/redis servers and the staging and production applications would be hosted on some platform, AWS, Heroku, Digital Ocean, etc.

When the developer finishes a feature, it is merged and deployed into `staging`, the feature is then tested by QA, then `staging` is merged into `main` which deploys to production.

## Local development

Once the developer has set up their local database server and local redis server (optional), it should be as simple as `shopify app serve`. An ngrok tunnel will be created which points to your local application.

> Tip: If your ngrok url is not updating in the env, run `shopify app tunnel stop` then `shopify app serve`. This is a bug with the current shopify-cli and paid ngrok accounts.

## Hosting

The easiest way to host a Shopify application is with [Heroku](https://www.heroku.com/) or [DigitalOcean](https://www.digitalocean.com/) because they give you an https instance out of the box, which shopify requires to embded your app in the admin. However some of you may want to host on [AWS](https://aws.amazon.com/) for cost, scalability, or integration with other AWS services. So the following is a general guildline on how to host on AWS since it does not give you an https endpoint by default.

1. Register a domain for your app with [Route53](https://aws.amazon.com/route53/)
2. Create an SSL certificate for your domain using [AWS Certificate Manager](https://aws.amazon.com/certificate-manager/)
3. Set up a [CopePipeline](https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html) to handle continuous deployments from the `main` or `staging` branch
4. Create an [Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) instance for your application.
5. Point your Elastic Beanstalk application to your domain with the SSL certificate
6. If using Redis, you may want to use [AWS Elasticache](https://aws.amazon.com/elasticache/) for your redis server.

For more detailed information see the [AWS Documentation](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/configuring-https.html)

## Development Tips

- Install the [Redux dev tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) extension
- Very rarely you may need to override Polaris styles, you can do this in:
  `/utils/css/polaris-overrides.css` Try to avoid this if possible.
- Install a CSS edit extension and add the following rule:

```
.v4POK {
 display: none !important;
}
```

This will hide the "Store Transfer Disabled" banner which partially covers up the react-query dev tools.

## Known Issues

There is a syntax error warning involving the `a` tags in the admin navigiation. This is because Polaris does not allow null values for parent link destinations so `false` was used so parent links would not navigate if they did not have a destination.

## OSB

### Database Models

The following are the database models, located in `db/models`, added by this framework and why they are used.
|Model| Purpose |
|--|--|
| Session | Storage of shopify sessions. |
| Shop | Storage of all the installed shop urls along with their long term (offline) access token. |
| Webhooks | A comma separated string of all shopify webhooks being registered and the url the webhook is registered to. Changing the `HOST` env variable will trigger a wipe and re-instantiation of these webhooks. The `HOST` env variable is changed by the Shopify CLI when the application is restarted, this allows for automatic reregistration of webhooks. |

> Tip: If some functionality is in response to a user action, use the access token from the shopify session. Otherwise if its on a cron or webhook, use the `longTermAccessToken` in the `Shop` mode

### Redis

If you are making a private app for a single shop, redis is most likely not needed.

As the number of requests hitting the server increases, or as the time taken for your logic processing increases, your response time becomes more and more important to avoid timeouts occurring on one request while processing another.

Using redis to queue our jobs allows us to respond to webhooks immediately rather than processing the business logic at the time of request (which may take too long). Simply add the webhook payload to the queue, and send a 200 response.

One shop usually does not have the throughput required to overload a small server, hence my recommendation of redis not being needed for single shop apps.

This framework uses [bullmq](https://docs.bullmq.io/) to manage queuing. If you'd like a usage example see the `redis` directory of this repository.

### State Management

#### Client Side State Management - Redux

This framework uses the [Redux Ducks Pattern](https://medium.com/@matthew.holman/what-is-redux-ducks-46bcb1ad04b7) to manage its types, actions, and reducers. Which is essentially a method of organizing redux code by **resource** rather than type, action, and reducer.

The following is a list of redux resources added by this framework and their purpose:
| Resource | Purpose |
|--|--|
| `app` | States for polaris loading, modal, toasts, banners, navigation, save bar, etc. All app level client side information. |
| `settings` | A JSON object populated by a call to the `/settings` route on app mount. This is where you would put your user settings for the app retrieved from a database. Example: `darkMode: true` |
| `example` | An example of a redux resource in use. |
| `asyncExample` | An example of a redux resource populated asynchronously (likely you won't need this since we're using React Query to manage server side state) |

#### Server Side State Management - React Query

This framework uses [React Query](https://react-query.tanstack.com/) (an excellent package), to manage server side state. The elegance of this package is in its `query key`, a unique identifier for each query. This allows the package to cache and optimize each request.

If you have multiple components using the same server data the query key allows only one request to be made and the data delivered to all those components via cache.

If you find yourself making the same query many times for many different components, you may want to extract that logic into a hook.

For example lets say we have an endpoint which gives us user permissions for our app, if we need to use that data in many different components it may be prudent to extract the react-query call into a `usePermissions` custom hook.

### Routes

The following is a list of endpoints included in the framework.

#### API

The purpose of this directory is to establish a pattern for adding API resources.

The `api` directory has a versioned api route `/api/v1` for an example resource see `/routes/api/v1/resourceExample.js`

#### Log

This directory contains a `/log` route. When the client side has an error, that error information is handled with [react-error-boundary](https://github.com/bvaughn/react-error-boundary) which sends that error information to our server side `logger` service. Explained in the "Services" section below.

#### Settings

This is a route which returns shop-level app settings(or at least, this is where you would send those settings). This route is queried on initial app mount.

Examples of shop-level app settings

- Light theme or Dark theme
- Notification email address
- Store logo

> Helpful Tip: The Shopify user session, which contains the `shop` parameter which you will likely need to query against your database, is stored in the response object for every request using the `verifyRequest` middleware. `res.locals.shopify.session`

#### Webhooks

This directory is used to set Shopify webhooks or other 3rd party webhooks.

##### GDPR Webhooks

GDPR webhooks are for data privacy compliance. When your app receives these webhooks from Shopify it must perform the specified action of returning user data, erasing user data, or erasing shop data.

See [Shopify's Documentation](https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks) for more information about mandatory webhooks.

#### Shopify webhooks

Shopify webhooks can be handled in the framework by adding to the `shopifyWebhooks` array in `/webhooks/shopify/index.js`

The array accepts objects containing a shopify webhook `topic` and a webhook `handler`

```js
const shopifyWebhooks = [
  {
    topic: "APP_UNINSTALLED",
    handler: appUninstalledHandler,
  },
  {
    topic: "ORDERS_CREATE",
    handler: ordersCreateHandler,
  },
];
```

The handlers are then registered and the webhook topics stored in the Webhooks database model. If this array or the host differs from the values defined in the database, all user sessions are deleted (since the app needs to go through auth again to register the webhooks), then webhooks are updated using the **store's offline access token.**

### Unit Testing

This framework follows Shopify's suggestion of using [vitest](https://vitest.dev/guide/) and [supertest](https://www.npmjs.com/package/supertest), the default test suites can be run using `npm run test`

> Note: Test suites use the development database and redis server, if you'd like to use separate test servers, just create the env variables for it and replace the variable names in `/db/config/config.js` and `/redis/index.js`

### Services

This framework uses a service injection design pattern. Everything relating to business logic or 3rd parties should likely be a service. Those services are then imported into the application as needed.

The following is a list of services the framework provides by default:

#### Clients

This service is designed for 2 things:

1. To provide an easy way to send authenticated requests to the server from the client.
2. To provide an easy way to interact with other 3rd party APIs

You interact with the server using the `serverClient`. For example lets say we want to retrieve a list of users from our database and list them to the client. We would need to make a `/users` endpoint and make a `GET` request to that endpoint from the client to the server, then endpoint then most likely uses a database service to query the database. We are leveraging `axios` to make API clients.

**Usage:**

```js
import { createServerClient } from "../../services/clients";

const serverClientOptions = {
  useLoading: true,
  axios: {
    baseURL: "",
  },
};
const serverClient = createServerClient(serverClientOptions);

serverClient.get("/myRoute").then(({ data }) => console.log(data)); // Axios instance
```

The following are a list of options for the `serverClient` and their purpose
|Option| Value | Purpose |
|--|--|--|
| useLoading | Boolean | If the app's visual loading state should be toggled
| axios | axios options | a passthrough parameter to axios

##### Example API client usage

```js
// services/clients/exampleClient.js
import axios from "axios";

const exampleClient = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

export default exampleClient;
```

#### Logger

The logger service returns a [winston](https://github.com/winstonjs/winston) logger.

This service is designed for 2 things

1. Send logs to your preferred logging service
2. Print development logs in a user-friendly format

Depending on the `NODE_ENV` environment variable the logging service will either export a `devLogger` which formats and colorizes the logs for the console or a `prodLogger` which has a log stream connection to your preferred logging service, by default AWS Cloudwatch.

**Usage:**

```js
import logger from "../../services/logger/index.js";

logger.silly("silly billy");
logger.verbose("very verbose yes");
logger.debug("my super cool debug");
logger.info("my super cool info");
logger.warn("my super cool warning");
logger.error("my super cool error", {
  someError: "hey this is some error data",
});
```

> The environment variable `LOG_LEVEL` determines which of these actually get printed to the console. See winston documentation for more examples of log levels.

#### Client Logger

The client logger service is an extension of our logging service, but for use on the client side/frontend portion of the app. This allows us to gracefully handle app crashes and log the error information.

This service sends the log information to the `/log` endpoint discussed in the Routes section. The `/log` routes then handles the logs using our `logger` service since it's now a server side operation.

The usage is the same as the server side logger, however you **only** have access to the functions shown above because it is **not** a winston logger instance, it simply an object with the same function names for ease of use. All this logger does is deliver the log level, error message, and error metadata to the real winston logger server side.

### Frontend/UI

The following are frontend features given by the framework

#### Navigation

This framework uses [react-router-dom](https://reactrouter.com/docs/en/v6) to handle client side routing.

`AppNavigation.jsx` handles the frontend navigation using Shopify Polaris' `Navigation` component
`AppRoutes.jsx` handles the react-router routes for all needed resources.

Very often one needs to update both of these components to add one resource. The actual route and the means to navigate to it from the side bar. Because of that, the routes are extracted into `RouteDefinitions.jsx` as the source of truth.

There are 2 arrays you can modify to create new routes, `NAVIGATION_ROUTES` and `OTHER_ROUTES`.

`NAVIGATION_ROUTES`are the routes which literally appear in the Polaris sidebar navigation.
`OTHER_ROUTES` are the routes which need to exist, but are not in the navigation. `/users/:id` for example.

> See src/components/navigation/RouteDefintions.jsx for full implementation.

#### Pages

`pages` is simply a directory where one would store the top level component for a page. For example `/about` would likely render the `<About/>` component, or `/` for `<Home/>`

#### Test Components

The following are helpful test components that show you how to use the built-in functionality as well as performing common app tasks within the framework:

| Component               | What it demonstrates                                              |
| ----------------------- | ----------------------------------------------------------------- |
| `BannerTest`            | How to use the app level Banner                                   |
| `ContextualSaveBarTest` | How to use the contextual save bar                                |
| `ErrorTest`             | How your app responds to errors                                   |
| `LoadingTest`           | How to toggle the app level loading state                         |
| `ModalTest`             | How to use the app level modal                                    |
| `RateLimitTest`         | How GQL requests get rate limited when query points are exhausted |
| `ReduxTest`             | How to modify redux state                                         |
| `ServerRequestsTest`    | How to send authenticated requests to your server                 |
| `ToastTest`             | How to use the app level Toast                                    |

#### Error handling

Errors are handled by [react-error-boundary](https://github.com/bvaughn/react-error-boundary).
The `<ErrorBoundary/>` component is inside the app `Frame`. By placing the boundary here we are able to render an error ui to the user, and run a function when the application errors.

When the application errors we:

1. Generate a UUID for the error
2. Display the UUID to the user (`AppError.jsx`)
3. Pass the UUID and error to our `/log` endpoint explained in the Routes section

This allows the user to follow up with app support and have an exact UUID which points to an error log in your preferred logging service.
