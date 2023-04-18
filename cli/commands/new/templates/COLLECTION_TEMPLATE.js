import validateAllRequests from '../middleware/validateAllRequests.js';
import applyCommonMiddleware from '../util/applyCommonMiddleware.js';
import verifyRequest from '../../../middleware/verify-request.js';
import COMMON_API_RESPONSES from '../util/commonApiResponses.js';

export default function (__LOWERCASE_PLURALIZED_NAME__Service) {
  let operations = {
    GET: [__LOWERCASE_PLURALIZED_NAME__Service.get__UPPERCASE_PLURALIZED_NAME__],
    POST: [__LOWERCASE_PLURALIZED_NAME__Service.post__UPPERCASE_PLURALIZED_NAME__],
  };


  operations.GET.apiDoc = {
    summary: 'Returns a collection of __UPPERCASE_PLURALIZED_NAME__',
    operationId: 'get__UPPERCASE_PLURALIZED_NAME__',
    parameters: [
      {
        required: false,
        in: 'query',
        name: 'page',
        schema: {
          type: 'integer',
          default: 1,
          minimum: 1
        },
        description: 'The integer value of the page to return.',
      },
      {
        required: false,
        in: 'query',
        name: 'limit',
        schema: {
          type: 'integer',
          default: 50,
          minimum: 1,
          maximum: 250
        },
        description: 'The number of items to return.',
      },
      {
        required: false,
        in: 'query',
        name: 'search',
        schema: {
          type: 'string',
        },
        description: 'An optional search query string.',
      }
    ],
    responses: {
      ...COMMON_API_RESPONSES.generate200("Successfully returned a collection of __UPPERCASE_PLURALIZED_NAME__"),
      ...COMMON_API_RESPONSES.UNAUTHORIZED
    }
  };

  operations.POST.apiDoc = {
    summary: 'Creates a new __UPPERCASE_SINGULAR_NAME__',
    operationId: 'post__UPPERCASE_PLURALIZED_NAME__',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/__UPPERCASE_PLURALIZED_NAME__Input" // schema name is file name
          },
        }
      }
    },
    responses: {
      ...COMMON_API_RESPONSES.generate201("Successfully created a new __UPPERCASE_SINGULAR_NAME__"),
      ...COMMON_API_RESPONSES.UNAUTHORIZED,
      ...COMMON_API_RESPONSES.BAD_REQUEST
    }
  };

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