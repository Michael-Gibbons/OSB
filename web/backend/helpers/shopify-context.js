import dotenv from 'dotenv'
dotenv.config()

import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION, BillingInterval } from "@shopify/shopify-api";

import { resolve } from 'path'
import fs from 'fs'

import { defineShopifyWebhookHandlers } from './shopify-webhooks.js';

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SCOPES.split(","),
  hostName: process.env.HOST.replace(/https?:\/\//, ""),
  hostScheme: process.env.HOST.split("://")[0],
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: true,
  ...(process.env.SHOP_CUSTOM_DOMAIN && { CUSTOM_SHOP_DOMAINS: [process.env.SHOP_CUSTOM_DOMAIN] }),
  billing: {
    'My plan': {
      amount: 5.0,
      currencyCode: 'USD',
      interval: BillingInterval.Every30Days,
    },
  },
});


// Writes host to file on dev so addons can have access to the dynamic ngrok url at all stages in build
if(process.env.NODE_ENV === 'development'){
  const HOST_TEXT_FILE_PATH = resolve('../../HOST.txt')

  fs.writeFile(HOST_TEXT_FILE_PATH, process.env.HOST, function (err) {
    if (err) throw err;
  });

}

await defineShopifyWebhookHandlers(shopify)

export default shopify