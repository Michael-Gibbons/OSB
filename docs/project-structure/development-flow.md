# Development flow

It's possible, likely even, that you are not the only one working on an application. It's also a good idea to test your changes in a hosted environment before pushing to production.

I've created a development flow which in my opinion is straight forward and easy to follow.

Every application has the following:
 - 1 or more development environments
 - A staging environment
 - A production environment

## Development Environments

When developing an application, every developer will have their own unique application. Preferably named something like `APP_NAME DEV DEVELOPER_NAME`

All of the resources this app points to will direct to the developer's local redis, database, and ngrok tunnel.

The developer then creates a feature, submits a pull request to the staging branch, then it will get merged or rejected as usual.

## Staging Environment

The staging environment is your production-like environment. Many times there are limitations you were not expecting or more likely there is simply a bug in the developer's feature that was missed during the development.

The purpose of this is for other people to QA your work on a hosted environment.

If the feature is deemed worthy for production and passes QA, it will be merged into the `main` branch.

## Production Environment

This is your product, this is what your final users install and use.

## Example App Setup

Lets say you're building an application with your good friends Matt, Bree, and Liz. Your application is named `CoolCatz`.

If you chose to follow my development flow, you would have the following shopify applications:

- `CoolCatz dev matt`
- `CoolCatz dev bree`
- `CoolCatz dev liz`
- `CoolCatz Staging`
- `CoolCatz`

Since the dev apps point to the developer's local resources, the only recurring hosting costs would be for the staging and production environments.