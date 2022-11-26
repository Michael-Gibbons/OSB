// @ts-nocheck
import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import cookieParser from "cookie-parser";
import Shopify from "./helpers/shopify-context.js";

import applyAuthMiddleware from "./middleware/auth.js";
import productCreator from "./helpers/product-creator.js";

import setSecurityPolicy from './middleware/set-security-policy.js';
import createApiV1 from "./api/v1/config/createApiV1.js";
import './redis/index.js'

import rootRouter from './routes/index.js'

import catchAllHandler from './middleware/catch-all-handler.js';
import applyProductionMiddleware from './middleware/applyProductionMiddleware.js';

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

import { BILLING_SETTINGS } from './BILLING_SETTINGS.js';

// export for test use only
export async function createServer() {
  const app = express();

  // Makes Cookies accessible to the Shopify context.
  app.use(cookieParser(Shopify.Context.API_SECRET_KEY));

  // Defines /auth routes for Shopify's OAuth handshake
  applyAuthMiddleware(app, {
    billing: BILLING_SETTINGS,
  });

  // Prevents iframes from being injected into the shopify admin.
  app.use(setSecurityPolicy);

  // Shopify Webhooks included in here, do not use body parsers on this router, ie this goes before express.json().
  // If you're using routes that do require the express.json() middleware in here, simply apply it as needed directly on the route, making sure it is *not* applied to the shopify webhook route.
  app.use("/", rootRouter)

  // All endpoints after this point will have access to a request.body
  // attribute, as a result of the express.json() middleware
  app.use(express.json());

  // Defines all routes created in /api. All Routes here will have access to req.body
  // If a route is meant to be accessed from the shopify admin app interface, use the verifyRequest middleware on the route in question.
  await createApiV1(app)

  // TODO: remove
  app.get("/api/products/count", async (req, res) => {
    const session = res.locals.shopify.session

    const { Product } = await import(
      `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
    );

    const countData = await Product.count({ session });
    res.status(200).send(countData);
  });

  app.get("/api/products/create", async (req, res) => {
    const session = res.locals.shopify.session

    let status = 200;
    let error = null;

    try {
      await productCreator(session);
    } catch (e) {
      console.log(`Failed to process products/create: ${e.message}`);
      status = 500;
      error = e.message;
    }
    res.status(status).send({ success: status === 200, error });
  });


  // Compresses and serves an optimized frontend bundle instead of the vite dev bundle if NODE_ENV is production
  applyProductionMiddleware(app)

  // Anything not handled by this point will be redirected to /api/auth for OAuth verification.
  // Or simply rejected with a error if not applicable
  app.use("/*", catchAllHandler);

  return { app };
}

createServer().then(({ app }) => app.listen(PORT));
