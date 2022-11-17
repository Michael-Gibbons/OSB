import OpenAPIRequestValidator from 'openapi-request-validator';
const OpenAPIRequestValidatorConstructor = OpenAPIRequestValidator.default

function validateAllRequests(req, res, next){
  const parameters = res.locals.parameters
  if(!parameters){
    next()
  }

  const requestValidator = new OpenAPIRequestValidatorConstructor({ parameters: res.locals.parameters });

  const errors = requestValidator.validateRequest(req)
  if (errors) {
    res.status(errors.status).send({ errors: [{ id: '1', status: errors.status.toString(), title: errors.errors[0].message }] })
    return
  }
  next()
}

export default validateAllRequests