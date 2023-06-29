# Webhooks

Webhooks are the lifeblood of most applications. In the context of shopify apps, you will almost always want one or several of Shopify's webhooks in combination with some other service's webhooks.

## Shopify Webhooks

Since the v7 update of the shopify api package, shopify has streamlined webhooks. I have streamlined them further. In `/web/backend/webhook-handlers/shopify/index.js` you will find an array `osbShopifyWebhooks`.

`osbShopifyWebhooks` is an array of objects of the following form:

```
{
  topic: "WEBHOOK_TOPIC", (string)
  callback: webhookTopicCallback, (function)
}
```

The topic may be of the form "WEBHOOK_TOPIC" or "webhook/topic"
example: order/create or ORDER_CREATE
See shopify webhook documentation for more information.

The callback returns 3 parameters
topic, shop, and payload in that order

If you update these webhooks you will need to go to `/api/auth`
in the shopify admin to re-register the webhooks
otherwise you will not get a response because shopify does not know the webhooks changed.

?> It is recommended to pass the data from the webhooks directly to a redis queue.

## Other Webhooks

If you need to interact with webhooks from a non-Shopify resource you will have to submit a POST request to the particular service's API. As such, it is related to the business logic of your application and I cannot write it all for you, sad.

However, I've created a webhook manager to help manage these webhooks which can be seen at `web/backend/services/webhook-manager`.

The webhook manager accepts an array of *webhook clients*. Which is simply a javascript object of the following form.

The duties of the webhook manager are, for all webhook clients:
 - On app startup query all webhooks you have registered
 - Verify all your webhooks exist and are active
 - If they are not, create them or activate them
 - Assign the response url to a route and handle the response

```js
const exampleWebhookClient = {
  serviceTitle: 'Example Service',
  topicKey: 'topic',
  idKey: 'id',
  targetUrlKey: 'address',
  subscriptions: [
    {
      topic: 'some/topic',
      targetUrl: '/webhooks/exampleClient/some-topic',
      customData: 42,
    },
    {
      topic: 'any/thing',
      targetUrl: '/webhooks/exampleClient/any-thing',// handle these routes in express
      customData: 42,
    }
  ],
  getWebhooks: () => {
    // implement get all
  },
  deleteWebhook: ({ id }) => {
    // implement delete
  },
  registerWebhook: ({ topic, targetUrl, customData }) => {
    //implement register
  },
  middleware: [
    ({ subscription, currentWebhooks, webhooksToRegister, webhooksToDelete }) => {}
  ]

}
```

Lets go over each property in the object and what it's used for.

| Property  | Purpose  |
|---|---|
| `serviceTitle`  | String, title of the webhook client, used for loging  |
| `topicKey`  | String, key of the property representing the webhook topic for your specific client.  |
| `idKey`  | String, key of the property representing the webhook id for your specific client.  |
| `targetUrlKey`  | String, key of the property representing the webhook target url for your specific client.  |
| `subscriptions`  | Array of objects, all objects must contain `topic` and `targetUrl`, all other data will be passed to the `registerWebhook` method.  |
| `getWebhooks`  | Promise, resolves to an array of webhooks.  |
| `deleteWebhook`  |  Promise, when resolved it deletes the webhook by id from your service. |
| `registerWebhook`  | Promise, when resolved it registers the webhook to your service.  |
| `middleware`  | Array of functions, passes all important properties to each function, used for additional criteria for determining if a webhook should be deleted/registered.  |


I recommend you use [Axios](https://www.npmjs.com/package/axios) to make the requests. See `web/backend/services/clients/exampleClient.js` for an example of how one might implement an api client using Axios.

?> It is recommended to pass the data from the webhooks directly to a redis queue.