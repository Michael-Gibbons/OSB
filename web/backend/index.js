// @ts-nocheck
import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import requestID from 'express-request-id'
import cookieParser from "cookie-parser";
import Shopify from "./helpers/shopify-context.js";

import applyAuthMiddleware from "./middleware/auth.js";
import setSecurityPolicy from './middleware/set-security-policy.js';
import rootRouter from './routes/index.js'
import createApiV1 from "./api/v1/config/createApiV1.js";
import applyProductionMiddleware from './middleware/applyProductionMiddleware.js';
import catchAllHandler from './middleware/catch-all-handler.js';

import './redis/index.js'
import logger from './services/logger/index.js';

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

import { BILLING_SETTINGS } from './BILLING_SETTINGS.js';

// export for test use only
export async function createServer() {
  const app = express();

  app.use(requestID())// Generates unique id for every request for logging and debugging purposes

  // Makes Cookies accessible to the Shopify context, using the API_SECRET_KEY to sign the cookies
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

  // Compresses and serves an optimized frontend bundle instead of the vite dev bundle if NODE_ENV is production
  applyProductionMiddleware(app)

  // Anything not handled by this point will be redirected to /api/auth for OAuth verification.
  // Or simply rejected with a error if not applicable
  app.use("/*", catchAllHandler);

  logger.warn('my super cool warning', {someError: 'hey this is some warning data', time: Date.now()})
  logger.error('my super cool error', {someError: 'hey this is some error data', time: Date.now()})
  logger.debug('my super cool debug', {someError: 'hey this is some debug data', time: Date.now()})

  return { app };
}

createServer().then(({ app }) => app.listen(PORT));
