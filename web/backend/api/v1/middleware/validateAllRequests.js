import OpenAPIRequestValidator from 'openapi-request-validator';
const OpenAPIRequestValidatorConstructor = OpenAPIRequestValidator.default

import buildAllSchemas from '../util/buildAllSchemas.js';
const schemas = buildAllSchemas()

function validateAllRequests(req, res, next){
  const parameters = req.operationDoc.parameters

  if(!parameters){
    next()
  }

  const requestBody = req.operationDoc.requestBody

  const requestValidator = new OpenAPIRequestValidatorConstructor({ parameters, requestBody, schemas });

  const errors = requestValidator.validateRequest(req)
  if (errors) {
    res.status(errors.status).send({ errors: errors.errors.map((error, index) => {
      return {
        id: (index + 1).toString(),
        status: errors.status.toString(),
        title: error.errorCode,
        detail: error.message,
        source: {
          parameter: error.path
        }
      }
    })})

    return
  }
  next()
}

export default validateAllRequests