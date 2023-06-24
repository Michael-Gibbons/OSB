// @ts-nocheck
import dotenv from 'dotenv'
dotenv.config()

import { cleanEnv, str, host, port } from 'envalid'

cleanEnv(process.env, {
  NODE_ENV:             str({ choices: ['development', 'test', 'production', 'staging']}),
  DATABASE_URL:         str(),
  REDIS_HOST:           host({ default: '127.0.0.1' }),
  REDIS_PORT:           port({ default: 6379 }),
  REDIS_USER:           str({ default: '' }),
  REDIS_PASSWORD:       str({ default: '' }),
  LOG_LEVEL:            str({ choices: ['error', 'warn', 'info', 'debug', 'verbose', 'silly'] }),
  ADMIN_USERNAME:       str({ default: 'admin' }),
  ADMIN_PASSWORD:       str({ default: 'admin' }),
  LOGTAIL_SOURCE_TOKEN: str({ devDefault: '' }),
  HOST:                 str()
})

import express from "express";
import requestID from 'express-request-id'
import cookieParser from "cookie-parser";
import shopify from "./helpers/shopify-context.js";

import applyAuthMiddleware from "./middleware/auth.js";
import setSecurityPolicy from './middleware/set-security-policy.js';
import rootRouter from './routes/index.js'
import createApiV1 from "./api/v1/config/createApiV1.js";
import catchAllHandler from './middleware/catch-all-handler.js';
import errorHandler from './middleware/error-handler.js';

import './redis/index.js'
import './services/webhook-manager/index.js'
import httpLogger from './middleware/httpLogger.js';

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

import { BILLING_SETTINGS } from './BILLING_SETTINGS.js';
import routeLogger from './helpers/routeLogger.js';

import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from "fs";
import cors from 'cors'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isProd = process.env.NODE_ENV === "production"
const DEV_INDEX_PATH = path.join(__dirname, '..', 'frontend')
const PROD_INDEX_PATH = path.join(__dirname, '..', 'frontend', 'dist')

const STATIC_PATH = isProd ? PROD_INDEX_PATH : DEV_INDEX_PATH
const STATIC_INDEX_FILE = path.join(STATIC_PATH, 'index.html')

import { registerBackendAddons } from './addons/index.js';

import logger from './services/logger/index.js';
// Use the logger >:(
// logger.warn('my super cool warning', {someError: 'hey this is some warning data'})
// logger.error('my super cool error', {someError: 'hey this is some error data'})
// logger.debug('my super cool debug', {someError: 'hey this is some debug data'})
// logger.info('my super cool info', {someError: 'hey this is some info data'})

async function createServer() {
  const app = express();

  // Expose Auth failure headers so the client side knows when to redirect to auth.
  app.use(cors(
    {
      exposedHeaders: ["X-Shopify-API-Request-Failure-Reauthorize", "X-Shopify-API-Request-Failure-Reauthorize-Url"]
    }
  ))

  app.use(requestID())// Generates unique id for every request for logging and debugging purposes

  // Makes Cookies accessible to the shopify context, using the API_SECRET_KEY to sign the cookies
  app.use(cookieParser(shopify.config.apiSecretKey));

  // All endpoints after this point will have access to a request.body
  // attribute, as a result of the express.json() middleware
  app.use(express.json());

  // Defines /auth routes for shopify's OAuth handshake
  applyAuthMiddleware(app, {
    billing: BILLING_SETTINGS,
  });

  // Prevents iframes from being injected into the shopify admin.
  app.use(setSecurityPolicy);

  // Applies all defined routes
  app.use("/", rootRouter)

  app.use(httpLogger())// Logs all http requests sent to this server.

  // Register all backend portions of addons
  await registerBackendAddons({ app })

  // Defines all routes created in /api. All Routes here will have access to req.body
  // If a route is meant to be accessed from the shopify admin app interface, use the verifyRequest middleware on the route in question.
  await createApiV1(app)

  routeLogger(app) // Logs all registered routes

  // Serves frontend from /frontend in dev, or /dist in production
  // Anything not handled by this point will be redirected to /api/auth for OAuth verification.
  // Or simply rejected with a error if not applicable
  // { index: false } is required so we don't try to serve index.html before the app is installed

  app.use(express.static(STATIC_PATH, { index: false })) // If you don't have index: false here, you won't be able to install the app

  app.use("/*", catchAllHandler, (req, res, next) => {
    return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(STATIC_INDEX_FILE));
  });

  // Handles all server side errors, make sure that this is the last middleware.
  app.use(errorHandler)

  return { app };
}

createServer().then(({ app }) => app.listen(PORT));
