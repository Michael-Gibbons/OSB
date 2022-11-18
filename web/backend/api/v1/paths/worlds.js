import validateAllRequests from '../middleware/validateAllRequests.js';

export default function (worldsService) {
  let operations = {};

  const handleAllRequests = (req, res, next) => {

    if(!worldsService.parameters) throw 'parameters required'

    res.locals.parameters = worldsService.parameters // used in validateAllRequests middleware
    next()
  }

  operations.GET = [handleAllRequests, validateAllRequests, worldsService.getWorldByName]


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

  return operations;
}