import dotenv from 'dotenv'
dotenv.config()

import { Shopify, LATEST_API_VERSION } from "@shopify/shopify-api";

import { resolve } from 'path'
import fs from 'fs'

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https?:\/\//, ""),
  HOST_SCHEME: process.env.HOST.split("://")[0],
  API_VERSION: LATEST_API_VERSION,
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  // See note below regarding using CustomSessionStorage with this template.
  SESSION_STORAGE: new Shopify.Session.PostgreSQLSessionStorage(process.env.DATABASE_URL),
  ...(process.env.SHOP_CUSTOM_DOMAIN && { CUSTOM_SHOP_DOMAINS: [process.env.SHOP_CUSTOM_DOMAIN] }),
});

// NOTE: If you choose to implement your own storage strategy using
// Shopify.Session.CustomSessionStorage, you MUST implement the optional
// findSessionsByShopCallback and deleteSessionsCallback methods. These are
// required for the app_installations.js component in this template to
// work properly.

// Writes host to file on dev so addons can have access to the dynamic ngrok url at all stages in build
if(process.env.NODE_ENV === 'development'){
  const HOST_TEXT_FILE_PATH = resolve('../../HOST.txt')

  fs.writeFile(HOST_TEXT_FILE_PATH, process.env.HOST, function (err) {
    if (err) throw err;
  });

}
export default Shopify