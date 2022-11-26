const COMMON_API_RESPONSES = {
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
  }
}

export default COMMON_API_RESPONSES
