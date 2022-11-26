// @ts-nocheck
import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import cookieParser from "cookie-parser";
import Shopify from "./helpers/shopify-context.js";

import applyAuthMiddleware from "./middleware/auth.js";
import verifyRequest from "./middleware/verify-request.js";
import productCreator from "./helpers/product-creator.js";

import { BillingInterval } from "./helpers/ensure-billing.js";

import setSecurityPolicy from './middleware/set-security-policy.js';
import createApiV1 from "./api/v1/config/createApiV1.js";
import './redis/index.js'

import rootRouter from './routes/index.js'

import catchAllHandler from './middleware/catch-all-handler.js';
import applyProductionMiddleware from './middleware/applyProductionMiddleware.js';

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.
const BILLING_SETTINGS = {
  required: false,
  // This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
  // chargeName: "My Shopify One-Time Charge",
  // amount: 5.0,
  // currencyCode: "USD",
  // interval: BillingInterval.OneTime,
};

// export for test use only
export async function createServer(
  isProd = process.env.NODE_ENV === "production",
  billingSettings = BILLING_SETTINGS
) {
  const app = express();

  app.use(cookieParser(Shopify.Context.API_SECRET_KEY));

  app.use("/", rootRouter)

  await createApiV1(app)

  applyAuthMiddleware(app, {
    billing: billingSettings,
  });

  // All endpoints after this point will require an active session
  app.use(
    "/api/*",
    verifyRequest(app, {
      billing: billingSettings,
    })
  );

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

  // All endpoints after this point will have access to a request.body
  // attribute, as a result of the express.json() middleware
  app.use(express.json());

  app.use(setSecurityPolicy);

  applyProductionMiddleware(app)

  app.use("/*", catchAllHandler);

  return { app };
}

createServer().then(({ app }) => app.listen(PORT));
