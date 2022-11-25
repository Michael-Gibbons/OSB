import Shopify from '../../../helpers/shopify-context.js'

export function setupOrderWebhooks(path){
  console.log(path)
  Shopify.Webhooks.Registry.addHandler("ORDERS_CREATE", {
    path,
    webhookHandler: async (topic, shop, body) => {
      const payload = JSON.parse(body);
      console.log(payload)
    },
  });
}