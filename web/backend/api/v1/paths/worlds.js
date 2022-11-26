import validateAllRequests from '../middleware/validateAllRequests.js';
import applyCommonMiddleware from '../util/applyCommonMiddleware.js';
import verifyRequest from '../../../middleware/verify-request.js';
import COMMON_API_RESPONSES from '../util/commonApiResponses.js';

export default function (worldsService) {
  let operations = {
    GET: [worldsService.getWorldByName],
    // POST: [],
    // PUT: [],
    // PATCH: [],
    // DELETE: [],
  };


  operations.GET.apiDoc = {
    summary: 'Returns worlds by name.',
    operationId: 'getWorldByName',
    parameters: [
      {
        in: 'query',
        name: 'name',
        required: true,
      }
    ],
    responses: {
      200: {
        description: 'A list of worlds that match the requested name.',
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