import dotenv from 'dotenv'
dotenv.config()

import shopify from '../helpers/shopify-context.js'
import redirectToAuth from "../helpers/redirect-to-auth.js";

export default async (req, res, next) => {
  if (typeof req.query.shop !== "string") {
    res.status(500);
    return res.send("No shop provided");
  }

  if (!req.originalUrl.match(/^\/exitiframe/i)) {
    return redirectToAuth(req, res);
  }

  if (shopify.config.isEmbeddedApp && req.query.embedded !== "1") {
    const redirectUrl = await shopify.auth.getEmbeddedAppUrl({
      rawRequest: req,
      rawResponse: res,
    });

    return res.redirect(redirectUrl + req.path);
  }

  next()
}