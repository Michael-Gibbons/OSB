# Webhooks

Webhooks are the lifeblood of most applications. In the context of shopify apps, you will almost always want one or several of Shopify's webhooks in combination with some other service's webhooks.

## Shopify Webhooks

Since this is a shopify app boiler, shopify webhooks have first-class support. I have added entry points for the following webhooks:

- GDPR webhooks, required for your application to be listed on the app store
- App Uninstalled, required
- All order webhooks, most apps need an order webhook, simply uncomment the ones you need and add a handler function
- All customer webhooks, most apps need an customer webhook, simply uncomment the ones you need and add a handler function

Feel free to copy the pattern and expand it to any webhooks you need for your application, orders and customers are just the most common.

?> It is recommended to pass the data from the webhooks directly to a redis queue.

## Other Webhooks

If you need to interact with webhooks from a non-Shopify resource you will have to submit a POST request to the particular service's API. As such, it is related to the business logic of your application and I cannot write it for you, sad.

But the methodology is simple enough:
 - On app startup query all webhooks you have registered
 - Verify all your webhooks exist and are active
 - If they are not, create them or activate them
 - Assign the response url to a route and handle the response

I recommend you use [Axios](https://www.npmjs.com/package/axios) to make the requests.