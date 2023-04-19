import { initialize } from 'express-openapi';
import rateLimit from 'express-rate-limit'
import v1ApiDoc from '../api-doc.js';
import validateAllResponses from '../middleware/validateAllResponses.js'

import buildServiceDependencies from '../util/buildServiceDependencies.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Takes all files in '/api/v1/services/' and adds them to the api
const serviceDependencies = await buildServiceDependencies()

const createApiV1 = async (app) => {

  const PATHS_PATH = path.resolve(__dirname, '../paths')

  const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per `window` (here, per 1 minute)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })

  await initialize({
    app,
    apiDoc: {
      ...v1ApiDoc,
      'x-express-openapi-additional-middleware': [apiLimiter, validateAllResponses],
      'x-express-openapi-validation-strict': true,
      'x-express-openapi-disable-validation-middleware': true
    },
    dependencies: {
      ...serviceDependencies
    },
    paths: PATHS_PATH,
    promiseMode: true,
  });

}

export default createApiV1