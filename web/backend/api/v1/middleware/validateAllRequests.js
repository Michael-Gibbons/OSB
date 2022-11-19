import OpenAPIRequestValidator from 'openapi-request-validator';
const OpenAPIRequestValidatorConstructor = OpenAPIRequestValidator.default

function validateAllRequests(req, res, next){
  const service = res.locals.service
  const parameters = service.parameters
  
  if(!parameters){
    next()
  }

  const requestValidator = new OpenAPIRequestValidatorConstructor({ parameters });

  const errors = requestValidator.validateRequest(req)
  if (errors) {
    res.status(errors.status).send({ errors: [{ id: '1', status: errors.status.toString(), title: errors.errors[0].message }] })
    return
  }
  next()
}

export default validateAllRequests