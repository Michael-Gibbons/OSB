function validateAllResponses(req, res, next) {
  if(!req.apiDoc){
    throw `No API doc defined for route ${req.baseUrl}. Please verify you have created the api doc in the route file located in the /paths directory.\nSee https://github.com/kogosoftwarellc/open-api/tree/master/packages/express-openapi for more information.`
  }

  const strictValidation = req.apiDoc['x-express-openapi-validation-strict']
    ? true
    : false;
  if (typeof res.validateResponse === 'function') {
    const send = res.json;
    res.json = function expressOpenAPISend(...args) {
      const onlyWarn = !strictValidation;
      if (res.get('x-express-openapi-validation-error-for') !== undefined) {
        return send.apply(res, args);
      }
      const body = args[0];
      let validation = res.validateResponse(res.statusCode, body);
      let validationMessage;
      if (validation === undefined) {
        validation = { message: undefined, errors: undefined };
      }
      if (validation.errors) {
        const errorList = Array.from(validation.errors)
          .map((_) => _.message)
          .join(',');
        validationMessage = `Invalid response for status code ${res.statusCode}: ${errorList}`;
        // Set to avoid a loop, and to provide the original status code
        res.set(
          'x-express-openapi-validation-error-for',
          res.statusCode.toString()
        );
      }
      if (onlyWarn || !validation.errors) {
        return send.apply(res, args);
      } else {
        res.status(500);
        return res.json({ error: validationMessage });
      }
    };
  }
  next();
}

export default validateAllResponses