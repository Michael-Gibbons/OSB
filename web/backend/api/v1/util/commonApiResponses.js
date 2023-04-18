const COMMON_API_RESPONSES = {
  generate200: (description) => {
    return {
      200: {
        description,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/success"
            }
          },
        },
      },
    }
  },
  generate201: (description) => {
    return {
      201: {
        description,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/success"
            }
          },
        },
      },
    }
  },
  BAD_REQUEST: {
    400: {
      description: 'Bad Request',
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/failure"
          }
        },
      },
    },
  },
  UNAUTHORIZED: {
    401: {
      description: 'Unauthorized',
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/failure"
          }
        },
      },
    }
  },
  NOT_FOUND: {
    404: {
      description: 'Not found',
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/failure"
          }
        },
      },
    }
  }
}

export default COMMON_API_RESPONSES
