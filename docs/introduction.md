# Project Structure

It would be perfectly reasonable (and correct) to think of this template as 2 separate applications. One representing the frontend, one representing the backend.
Shopify agrees, as they have built their cli in such a way to implement this.

When running the dev script, the shopify cli reads the `shopify.web.toml` files to determine which scripts to run. The frontend application runs a [vitejs](https://vitejs.dev/) server, and the backend application runs an [express](https://expressjs.com/) server which connects to the vite server.

# Important dependencies

This project is named OSB, a shorthand for Opinionated Shopify app Boiler, but also a reference to [Oriented strand board](https://en.wikipedia.org/wiki/Oriented_strand_board) which is made by gluing together many pieces of wood scrap. This project consolidates every piece of full stack app development I've learned in my career thus far, and many important open source packages to create it, hence OSB.

This is not an exhaustive list of dependencies (those are covered in their own sections), rather these are the main highlights of this template.

## Backend


| Dependency   | Why It's used      |
|----------|:-------------:|
| [express](https://expressjs.com/) |  Core of the template, creates an HTTP web server. |
| [prisma](https://www.prisma.io/) |    The template's ORM, used to interact with your database   |
| [bullmq](https://docs.bullmq.io/) | Built on top of redis, used to create a job/worker environment. |
| [express-openapi](https://www.npmjs.com/package/express-openapi) | Used to enforce a JSON:API specification |
| [winston](https://www.npmjs.com/package/winston) | Used for transporting development and production logs |

## Frontend

| Dependency   | Why It's used      |
|----------|:-------------:|
| [react](https://reactjs.org/) |  Core of the frontend, gives a toolkit to create a reactive UI |
| [@shopify/polaris](https://polaris.shopify.com/) | Shopify's UI framework for App creation |
| [react-query](https://react-query-v3.tanstack.com/overview) | Handling of server side state to be conveyed to the UI |
