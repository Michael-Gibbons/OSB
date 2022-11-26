import { Shopify } from "@shopify/shopify-api";
import { AppInstallations } from "../../../helpers/app-installations.js";

export function setupAppUninstalledWebhook(path){
  Shopify.Webhooks.Registry.addHandler("APP_UNINSTALLED", {
    path,
    webhookHandler: async (_topic, shop, _body) => {
      // Recommended: delete all data associated with the uninstalled shop in your db here
      await AppInstallations.delete(shop);
    },
  });
}

