const paginationSchema = {
  type: "object",
  properties: {
    first: {
      $ref: "#/components/schemas/link"
    },
    last: {
      $ref: "#/components/schemas/link"
    },
    prev: {
      $ref: "#/components/schemas/link"
    },
    next: {
      $ref: "#/components/schemas/link"
    }
  },
  additionalProperties: false
}

export default paginationSchema