import validateAllRequests from '../middleware/validateAllRequests.js';
import validateServiceParameters from '../middleware/validateServiceParameters.js'
import applyCommonMiddleware from '../util/applyCommonMiddleware.js';

export default function (worldsService) {
  let operations = {};

  operations.GET = [worldsService.getWorldByName]

  operations.GET.apiDoc = {
    summary: 'Returns worlds by name.',
    operationId: 'getWorldByName',
    parameters: worldsService.parameters.map(param => ({ in: param.in, name: param.name })),
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

  const commonMiddleware = [validateServiceParameters(worldsService), validateAllRequests]
  operations = applyCommonMiddleware(operations, commonMiddleware)

  return operations;
}