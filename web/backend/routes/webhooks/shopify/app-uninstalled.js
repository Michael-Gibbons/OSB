import { Shopify } from "@shopify/shopify-api";
import { AppInstallations } from "../../../helpers/app-installations.js";

export function setupAppUninstalledWebhook(path){
  Shopify.Webhooks.Registry.addHandler("APP_UNINSTALLED", {
    path,
    webhookHandler: async (_topic, shop, _body) => {
      // You should delete shop data in your db here
      await AppInstallations.delete(shop);
    },
  });
}

