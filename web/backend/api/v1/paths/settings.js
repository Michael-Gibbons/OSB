import validateAllRequests from '../middleware/validateAllRequests.js';
import applyCommonMiddleware from '../util/applyCommonMiddleware.js';
import verifyRequest from '../../../middleware/verify-request.js';
import COMMON_API_RESPONSES from '../util/commonApiResponses.js';

export default function (settingsService) {
  let operations = {
    GET: [settingsService.getSettings],
    POST: [settingsService.saveSettings],
    // PUT: [],
    // PATCH: [],
    // DELETE: [],
  };


  operations.GET.apiDoc = {
    summary: 'Returns settings for the current shop.',
    operationId: 'getSettings',
    parameters: [],
    responses: {
      200: {
        description: 'A list of settings for the current shop.',
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/success"
            }
          },
        },
      },
      ...COMMON_API_RESPONSES.UNAUTHORIZED
    }
  };

  operations.POST.apiDoc = {
    summary: 'Saves settings for the current shop.',
    operationId: 'saveSettings',
    parameters: [],
    responses: {
      200: {
        description: 'Saves inputted settings for the current shop.',
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/success"
            }
          },
        },
      },
      ...COMMON_API_RESPONSES.UNAUTHORIZED
    }
  };

  const commonMiddleware = [verifyRequest(), validateAllRequests]
  operations = applyCommonMiddleware(operations, commonMiddleware)

  return operations;
}