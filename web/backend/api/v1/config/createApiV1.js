import { initialize } from 'express-openapi';
import v1ApiDoc from '../api-doc.js';
import validateAllResponses from '../middleware/validateAllResponses.js'

import buildServiceDependencies from '../util/buildServiceDependencies.js';

// Takes all files in '/api/v1/services/' and adds them to the api
const serviceDependencies = await buildServiceDependencies()

const createApiV1 = async (app) => {

  await initialize({
    app,
    apiDoc: {
      ...v1ApiDoc,
      'x-express-openapi-additional-middleware': [validateAllResponses],
      'x-express-openapi-validation-strict': true,
      'x-express-openapi-disable-validation-middleware': true
    },
    dependencies: {
      ...serviceDependencies
    },
    paths: './api/v1/paths',
    promiseMode: true,
  });

}

export default createApiV1