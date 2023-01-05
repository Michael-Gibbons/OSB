import dotenv from 'dotenv'
dotenv.config()

import Shopify from '../helpers/shopify-context.js'
import { AppInstallations } from '../helpers/app-installations.js';
import redirectToAuth from "../helpers/redirect-to-auth.js";

export default async (req, res, next) => {
  if (typeof req.query.shop !== "string") {
    res.status(500);
    return res.send("No shop provided");
  }

  const shop = Shopify.Utils.sanitizeShop(req.query.shop);
  const appInstalled = await AppInstallations.includes(shop);

  if (!appInstalled && !req.originalUrl.match(/^\/exitiframe/i)) {
    return redirectToAuth(req, res);
  }

  if (Shopify.Context.IS_EMBEDDED_APP && req.query.embedded !== "1") {
    const embeddedUrl = Shopify.Utils.getEmbeddedAppUrl(req);

    return res.redirect(embeddedUrl + req.path);
  }

  next()
}