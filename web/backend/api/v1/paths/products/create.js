import validateAllRequests from '../../middleware/validateAllRequests.js'
import applyCommonMiddleware from '../../util/applyCommonMiddleware.js'
import verifyRequest from '../../../../middleware/verify-request.js'
import COMMON_API_RESPONSES from '../../util/commonApiResponses.js'

export default function (productsService) {
  let operations = {
    GET: [productsService.createProducts],
    // POST: [],
    // PUT: [],
    // PATCH: [],
    // DELETE: [],
  };


  operations.GET.apiDoc = {
    summary: 'Creates Products',
    operationId: 'createProducts',
    parameters: [],
    responses: {
      200: {
        description: 'Creates Products',
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/success"
            }
          },
        },
      },
      ...COMMON_API_RESPONSES.BAD_REQUEST,
      ...COMMON_API_RESPONSES.UNAUTHORIZED
    }
  };

  const commonMiddleware = [verifyRequest(), validateAllRequests]
  operations = applyCommonMiddleware(operations, commonMiddleware)

  return operations;
}