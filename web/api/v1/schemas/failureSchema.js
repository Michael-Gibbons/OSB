const failureSchema = {
  type: "object",
  required: [
    "errors"
  ],
  properties: {
    errors: {
      type: "array",
      minItems: 1,
      items: {
        $ref: "#/components/schemas/error"
      },
      uniqueItems: true
    }
  },
  additionalProperties: false
}

export default failureSchema