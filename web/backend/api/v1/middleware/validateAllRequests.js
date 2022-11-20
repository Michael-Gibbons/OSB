import OpenAPIRequestValidator from 'openapi-request-validator';
const OpenAPIRequestValidatorConstructor = OpenAPIRequestValidator.default

function validateAllRequests(req, res, next){
  const parameters = req.operationDoc.parameters

  if(!parameters){
    next()
  }

  const requestValidator = new OpenAPIRequestValidatorConstructor({ parameters });

  const errors = requestValidator.validateRequest(req)
  if (errors) {
    res.status(errors.status).send({ errors: errors.errors.map((error, index) => {
      return { id: (index + 1).toString(), status: errors.status.toString(), title: error.errorCode, detail: error.message }
    })})

    return
  }
  next()
}

export default validateAllRequests