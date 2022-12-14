import Shopify from '../../../helpers/shopify-context.js'
import loadOfflineSession from "@shopify/shopify-api/dist/utils/load-offline-session.js";

// !---!
// IMPORTANT: Shopify does not guarantee webhooks!! Remember to add reconciliation jobs by querying the shopify api and verifying your database has the resources every ~24hrs
// !---!

const ACTIVE_WEBHOOKS = [
  // {
  //   topic: "ORDERS_CANCELLED",
  //   webhookHandler: async (topic, shop, body) => {
  //     const offlineSession = await loadOfflineSession.default(shop)
  //     const payload = JSON.parse(body);
  //     // Recommended: Add to redis queue from here for quick response times.
  //   },
  // },
  {
    topic: "ORDERS_CREATE",
    webhookHandler: async (topic, shop, body) => {
      const offlineSession = await loadOfflineSession.default(shop)
      const payload = JSON.parse(body);
      // Recommended: Add to redis queue from here for quick response times.
    },
  },
  // {
  //   topic: "ORDERS_FULFILLED",
  //   webhookHandler: async (topic, shop, body) => {
  //     const offlineSession = await loadOfflineSession.default(shop)
  //     const payload = JSON.parse(body);
  //     // Recommended: Add to redis queue from here for quick response times.
  //   },
  // },
  // {
  //   topic: "ORDERS_PAID",
  //   webhookHandler: async (topic, shop, body) => {
  //     const offlineSession = await loadOfflineSession.default(shop)
  //     const payload = JSON.parse(body);
  //     // Recommended: Add to redis queue from here for quick response times.
  //   },
  // },
  // {
  //   topic: "ORDERS_PARTIALLY_FULFILLED",
  //   webhookHandler: async (topic, shop, body) => {
  //     const offlineSession = await loadOfflineSession.default(shop)
  //     const payload = JSON.parse(body);
  //     // Recommended: Add to redis queue from here for quick response times.
  //   },
  // },
  // {
  //   topic: "ORDERS_UPDATED",
  //   webhookHandler: async (topic, shop, body) => {
  //     const offlineSession = await loadOfflineSession.default(shop)
  //     const payload = JSON.parse(body);
  //     // Recommended: Add to redis queue from here for quick response times.
  //   },
  // },
  // {
  //   topic: "ORDERS_EDITED",
  //   webhookHandler: async (topic, shop, body) => {
  //     const offlineSession = await loadOfflineSession.default(shop)
  //     const payload = JSON.parse(body);
  //     // Recommended: Add to redis queue from here for quick response times.
  //   },
  // },
]

export function setupOrderWebhooks(path){

  for (const webhook of ACTIVE_WEBHOOKS) {
    const { topic, webhookHandler } = webhook
    Shopify.Webhooks.Registry.addHandler(topic, { path, webhookHandler });
  }

}