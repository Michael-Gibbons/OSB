import Shopify from '../../../helpers/shopify-context.js'
import loadOfflineSession from "@shopify/shopify-api/dist/utils/load-offline-session.js";

const ACTIVE_WEBHOOKS = [
  // {
  //   topic: "CUSTOMERS_CREATE",
  //   webhookHandler: async (topic, shop, body) => {
  //     const offlineSession = await loadOfflineSession.default(shop)
  //     const payload = JSON.parse(body);
  //     // Recommended: Add to redis queue from here for quick response times.
  //   },
  // },
  // {
  //   topic: "CUSTOMERS_DISABLE",
  //   webhookHandler: async (topic, shop, body) => {
  //     const offlineSession = await loadOfflineSession.default(shop)
  //     const payload = JSON.parse(body);
  //     // Recommended: Add to redis queue from here for quick response times.
  //   },
  // },
  // {
  //   topic: "CUSTOMERS_ENABLE",
  //   webhookHandler: async (topic, shop, body) => {
  //     const offlineSession = await loadOfflineSession.default(shop)
  //     const payload = JSON.parse(body);
  //     // Recommended: Add to redis queue from here for quick response times.
  //   },
  // },
  {
    topic: "CUSTOMERS_UPDATE",
    webhookHandler: async (topic, shop, body) => {
      const offlineSession = await loadOfflineSession.default(shop)
      const payload = JSON.parse(body);
      // Recommended: Add to redis queue from here for quick response times.
    },
  },
  // {
  //   topic: "CUSTOMERS_MARKETING_CONSENT_UPDATE",
  //   webhookHandler: async (topic, shop, body) => {
  //     const offlineSession = await loadOfflineSession.default(shop)
  //     const payload = JSON.parse(body);
  //     // Recommended: Add to redis queue from here for quick response times.
  //   },
  // }
]

export function setupCustomerWebhooks(path){

  for (const webhook of ACTIVE_WEBHOOKS) {
    const { topic, webhookHandler } = webhook
    Shopify.Webhooks.Registry.addHandler(topic, { path, webhookHandler });
  }

}