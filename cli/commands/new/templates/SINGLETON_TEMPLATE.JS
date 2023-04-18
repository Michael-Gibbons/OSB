import validateAllRequests from '../../middleware/validateAllRequests.js';
import applyCommonMiddleware from '../../util/applyCommonMiddleware.js';
import verifyRequest from '../../../../middleware/verify-request.js';
import COMMON_API_RESPONSES from '../../util/commonApiResponses.js';

export default function (__LOWERCASE_PLURALIZED_NAME__Service) {
  let operations = {
    GET: [__LOWERCASE_PLURALIZED_NAME__Service.get__UPPERCASE_SINGULAR_NAME__],
    PUT: [__LOWERCASE_PLURALIZED_NAME__Service.put__UPPERCASE_SINGULAR_NAME__],
    PATCH: [__LOWERCASE_PLURALIZED_NAME__Service.patch__UPPERCASE_SINGULAR_NAME__],
    DELETE: [__LOWERCASE_PLURALIZED_NAME__Service.delete__UPPERCASE_SINGULAR_NAME__]
  };


  operations.GET.apiDoc = {
    summary: 'Returns a single __UPPERCASE_SINGULAR_NAME__ by id',
    operationId: 'get__UPPERCASE_SINGULAR_NAME__',
    parameters: [
      {
        required: true,
        in: 'path',
        name: 'id',
        schema: {
          type: 'integer',
        },
        description: 'The id of the resource',
      },
    ],
    responses: {
      ...COMMON_API_RESPONSES.generate200("Successfully returned a single __UPPERCASE_SINGULAR_NAME__"),
      ...COMMON_API_RESPONSES.UNAUTHORIZED,
      ...COMMON_API_RESPONSES.NOT_FOUND
    }
  };

  operations.PUT.apiDoc = {
    summary: 'Replaces a single __UPPERCASE_SINGULAR_NAME__ by id',
    operationId: 'put__UPPERCASE_SINGULAR_NAME__',
    parameters: [
      {
        required: true,
        in: 'path',
        name: 'id',
        schema: {
          type: 'integer',
        },
        description: 'The id of the resource',
      },
    ],
    responses: {
      ...COMMON_API_RESPONSES.generate200("Successfully replaced a single __UPPERCASE_SINGULAR_NAME__"),
      ...COMMON_API_RESPONSES.UNAUTHORIZED,
      ...COMMON_API_RESPONSES.BAD_REQUEST,
      ...COMMON_API_RESPONSES.NOT_FOUND
    }
  }

  operations.PATCH.apiDoc = {
    summary: 'Updates a single __UPPERCASE_SINGULAR_NAME__ by id',
    operationId: 'patch__UPPERCASE_SINGULAR_NAME__',
    parameters: [
      {
        required: true,
        in: 'path',
        name: 'id',
        schema: {
          type: 'integer',
        },
        description: 'The id of the resource',
      },
    ],
    responses: {
      ...COMMON_API_RESPONSES.generate200("Successfully updated a single __UPPERCASE_SINGULAR_NAME__"),
      ...COMMON_API_RESPONSES.UNAUTHORIZED,
      ...COMMON_API_RESPONSES.BAD_REQUEST,
      ...COMMON_API_RESPONSES.NOT_FOUND
    }
  }

  operations.DELETE.apiDoc = {
    summary: 'Deletes a single __UPPERCASE_SINGULAR_NAME__ by id',
    operationId: 'delete__UPPERCASE_SINGULAR_NAME__',
    parameters: [
      {
        required: true,
        in: 'path',
        name: 'id',
        schema: {
          type: 'integer',
        },
        description: 'The id of the resource',
      },
    ],
    responses: {
      ...COMMON_API_RESPONSES.generate200("Successfully deleted a single __UPPERCASE_SINGULAR_NAME__"),
      ...COMMON_API_RESPONSES.UNAUTHORIZED,
      ...COMMON_API_RESPONSES.NOT_FOUND
    }
  }

  const commonMiddleware = []

  const isExternalEndpoint = __IS_EXTERNAL_ENDPOINT__ // set by cli command
  if(isExternalEndpoint){
    // this middleware verifies that the request came from the shopify admin
    // if you are making an api endpoint meant to be accessed outside of shopify you should not apply this middleware
    commonMiddleware.push(verifyRequest())
  }

  commonMiddleware.push(validateAllRequests)

  operations = applyCommonMiddleware(operations, commonMiddleware)

  return operations;
}