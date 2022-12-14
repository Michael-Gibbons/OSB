import dotenv from 'dotenv'
dotenv.config()

import { join } from "path";
import { readFileSync } from "fs";
import Shopify from '../helpers/shopify-context.js'
import { AppInstallations } from '../helpers/app-installations.js';
import redirectToAuth from "../helpers/redirect-to-auth.js";

const isProd = process.env.NODE_ENV === "production"
const DEV_INDEX_PATH = `${process.cwd()}/../frontend/`;
const PROD_INDEX_PATH = `${process.cwd()}/../frontend/dist/`;

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

  const htmlFile = join(
    isProd ? PROD_INDEX_PATH : DEV_INDEX_PATH,
    "index.html"
  );

  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(htmlFile));
}