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
      'x-express-openapi-validation-strict': true
    },
    dependencies: {
      ...serviceDependencies
    },
    paths: './api/v1/paths',
    promiseMode: true,
  });

  const registeredRoutes = []
  app._router.stack.forEach(function (r) {
    if (r.route && r.route.path) {
      registeredRoutes.push(r.route.path)
    }
  })

  console.log(`Registered Routes:\n${registeredRoutes.join('\n')}`)

}

export default createApiV1