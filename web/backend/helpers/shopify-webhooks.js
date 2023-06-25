import { DeliveryMethod } from "@shopify/shopify-api";
import { osbShopifyWebhooks } from "../webhook-handlers/shopify/index.js";

// Webhook topics can be of the form "app/uninstalled" OR "APP_UNINSTALLED"
// Shopify's docs list their webhook topics in the format "app/uninstalled" but register the actual webhooks using the "APP_UNINSTALLED" format
// This annoyed me so I wanted to make sure either worked.

// We can also abstract away deliveryMethod and callbackUrl since they are the same between all webhooks

const formattedWebhooks = osbShopifyWebhooks.map(webhook => { return {...webhook, topic: webhook.topic.toUpperCase().replace("/", "_")}})
const shopifyFormattedWebhooks = {}
formattedWebhooks.forEach(webhook => {
  shopifyFormattedWebhooks[webhook.topic] = {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: '/api/webhooks/shopify',
    callback: webhook.callback,
  }
})

// Used on app startup to let shopify know what webhooks have what handlers
const defineShopifyWebhookHandlers = async (shopify) => {
  await shopify.webhooks.addHandlers(shopifyFormattedWebhooks);
}

// Used in /auth/callback to actually register the webhooks with shopify when a valid session is created.
const registerShopifyWebhooks = async (shopify, session) => {
  await shopify.webhooks.register({session});
}

export {
  defineShopifyWebhookHandlers,
  registerShopifyWebhooks
}

