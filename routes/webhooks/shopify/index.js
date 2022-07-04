import dotenv from "dotenv";
dotenv.config();

import { Shopify } from "@shopify/shopify-api";

import {
  appUninstalledHandler,
  ordersCreateHandler,
} from "./handlers/index.js";

import db from "../../../db/models/index.js";
const Webhooks = db.Webhooks;
import invalidateSessions from "../../../server/helpers/invalidate-sessions.js";
import logger from "../../../services/logger/index.js";

// Note: if you update this webhooks array you will have to go through auth to have the changes reflected across all shops in the db
// you can just add /auth to the url bar in the app in the shopify admin to manually trigger OAuth
// or you can wait until a user's session expires which will also trigger the update across all shops
const shopifyWebhooks = [
  {
    topic: "APP_UNINSTALLED",
    handler: appUninstalledHandler,
  },
  {
    topic: "ORDERS_CREATE",
    handler: ordersCreateHandler,
  },
];

const updateWebhooks = async () => {
  // if db webhooks array doesn't match above webhooks array
  //   invalidate all user sessions
  //   set all shops longtermAccessToken to null
  //   go through auth again to reregister all webhooks including new ones
  //   update webhook table to have new webhooks

  let webhooksRecord = await Webhooks.findByPk(1);
  if (!webhooksRecord) {
    webhooksRecord = await Webhooks.create({
      id: 1,
      webhooks: "",
      host: process.env.HOST,
    });
  }

  const webhooksHost = webhooksRecord?.host;
  const webhooksInDb = webhooksRecord?.webhooks;
  const webhooksInApp = shopifyWebhooks
    .map((webhook) => webhook.topic)
    .join(",");

  const webhooksDiffer = webhooksInDb != webhooksInApp;
  const hostsDiffer = process.env.HOST != webhooksHost;

  if (webhooksDiffer || hostsDiffer) {
    await invalidateSessions();
    await webhooksRecord.update({
      webhooks: webhooksInApp,
      host: process.env.HOST,
    });
  }
};

const registerWebhooks = async (session) => {
  for (const shopifyWebhook of shopifyWebhooks) {
    await Shopify.Webhooks.Registry.register({
      shop: session.shop,
      accessToken: session.accessToken,
      topic: shopifyWebhook.topic,
      path: "/webhooks/shopify",
    }).then((res) => {
      if (!res[shopifyWebhook.topic].success) {
        logger.error(
          `Failed to register ${shopifyWebhook.topic} webhook: ${res.result} for shop ${session.shop}`
        );
      } else {
        logger.info(
          `Successfully registered ${shopifyWebhook.topic} for shop ${session.shop}`
        );
      }
    });
  }
};

const registerWebhookHandlers = () => {
  for (const shopifyWebhook of shopifyWebhooks) {
    Shopify.Webhooks.Registry.addHandler(shopifyWebhook.topic, {
      path: "/webhooks/shopify",
      webhookHandler: shopifyWebhook.handler,
    });
  }
};

export { updateWebhooks, registerWebhooks, registerWebhookHandlers };
