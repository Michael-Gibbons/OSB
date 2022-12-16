# Helpful Middleware

Since this is at it's core an express application, middleware is very important.

However as a developer the only middleware in this template you should be concerned with is the `verify-request` and `with-session` middleware

## verify-request

This middleware ensures that the application trying to hit your api is from the shopify admin. If you use this middleware on a route and attempt to use it from outside the shopify admin, it will throw an error.

Make sure you do not use this middleware on routes meant to be accessed by other resources like another application or from the Shopify Storefront, or anyone in general.

This middleware also applies the requester's shopify session to the request as an express local.

You can access the shopify session using `res.locals.shopify.session`

## with-session

This is a middleware only applies the express local without verifying the request. Useful for routes where having a shopify session is optional. In contrast to `verify-request` where a session is mandatory.