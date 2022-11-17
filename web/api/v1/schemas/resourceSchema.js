const resourceSchema = {
  description: "\"Resource objects\" appear in a JSON:API document to represent resources.",
  type: "object",
  required: [
    "type",
    "id"
  ],
  properties: {
    type: {
      type: "string"
    },
    id: {
      type: "string"
    },
    attributes: {
      $ref: "#/components/schemas/attributes"
    },
  },
  additionalProperties: false
}

export default resourceSchema