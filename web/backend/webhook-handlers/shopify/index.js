// osbShopifyWebhooks is an array of objects of the following form:

// {
//   topic: "WEBHOOK_TOPIC", (string)
//   callback: webhookTopicCallback, (function)
// }

// The topic may be of the form "WEBHOOK_TOPIC" or "webhook/topic"
// example: order/create or ORDER_CREATE
// See shopify webhook documentation for more information.

// The callback returns 3 parameters
// topic, shop, and payload in that order

// If you update these webhooks you will need to go to `/api/auth`
// in the shopify admin to re-register the webhooks
// otherwise you will not get a response because shopify does not know the webhooks changed.

const handleOrderCreate = (topic, shop, payload) => {
  console.log("Order Create", topic, shop)
  console.log(JSON.parse(payload))
}

export const osbShopifyWebhooks = [
  {
    topic: 'orders/create',
    callback: handleOrderCreate
  }
]