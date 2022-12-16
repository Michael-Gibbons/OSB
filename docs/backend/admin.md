# Admin Routes

Is your app really an app without an admin panel?

I thought so

So I've added some useful admin routes so you can check in on your application. Feel free to add more as your application grows

## Authentication

You don't want just anyone accessing your admin panel right? That's why your admin routes are protected by [express-basic-auth](https://www.npmjs.com/package/express-basic-auth)

When someone attempts to go to a route prefixed with `/api/admin` it will prompt the user for a username and password defined in your `.env` file, keep this a secret for obvious reasons.

## Api documentation

There are many benefits to using the Open Api framework in this template, you can offload your api to a 3rd party with the api-spec that is created, you are protecting yourself from bugs by ensuring a consistent API response for all your routes, and you can auto-magically generate api documentation for the routes.

Going to `/api/admin/api-docs` will hit the `/api/api-docs` endpoint created by [express-openapi](https://www.npmjs.com/package/express-openapi) and use the returned JSON to create api documentation for all the routes you have made during development. This is useful for multiple people working on the same application who don't know the ins and outs of routes they themselves did not create.

The UI is created by [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)

## Bullboard

As covered in the redis section, going to `/api/admin/queues` will give you a UI to visualize your current queues and their recent jobs, as well as errors they may have thrown if those jobs failed. This is useful for when jobs aren't behaving the way you expect them to, you will be able to see exactly which job failed and the data that made it fail.

The UI is created by [bull-board](https://github.com/felixmosh/bull-board)

