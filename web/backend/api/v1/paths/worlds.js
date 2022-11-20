import validateAllRequests from '../middleware/validateAllRequests.js';
import applyCommonMiddleware from '../util/applyCommonMiddleware.js';

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
      400: {
        description: 'Bad Request',
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/failure"
            }
          },
        },
      }
    }
  };

  const commonMiddleware = [validateAllRequests]
  operations = applyCommonMiddleware(operations, commonMiddleware)

  return operations;
}