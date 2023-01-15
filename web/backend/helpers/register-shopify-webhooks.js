import { Shopify } from "@shopify/shopify-api";
import { gdprTopics } from "@shopify/shopify-api/dist/webhooks/registry.js";
import logger from "../services/logger/index.js";

export default async function registerShopifyWebhooks(session){
  const responses = await Shopify.Webhooks.Registry.registerAll({
    shop: session.shop,
    accessToken: session.accessToken,
  });

  const registeredWebhooks = []
  for (const registeredWebhook in Shopify.Webhooks.Registry.webhookRegistry) {
    if (Object.hasOwnProperty.call(Shopify.Webhooks.Registry.webhookRegistry, registeredWebhook)) {
      registeredWebhooks.push(registeredWebhook)
    }
  }

  logger.info('APP STARTUP - REGISTERED WEBHOOKS', {
    shop: session.shop,
    webhooks: registeredWebhooks
  })

  Object.entries(responses).map(([topic, response]) => {
    // The response from registerAll will include errors for the GDPR topics.  These can be safely ignored.
    // To register the GDPR topics, please set the appropriate webhook endpoint in the
    // 'GDPR mandatory webhooks' section of 'App setup' in the Partners Dashboard.
    if (!response.success && !gdprTopics.includes(topic)) {
      if (response.result.errors) {
        logger.error('APP STARTUP - FAILED TO REGISTER WEBHOOK', {message: response.result.errors[0].message})
      } else {
        logger.error(`APP STARTUP - FAILED TO REGISTER ${topic} WEBHOOK`, {data: JSON.stringify(response.result.data, undefined, 2)})
      }
    }
  });
}