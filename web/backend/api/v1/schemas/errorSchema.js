const errorSchema = {
  type: "object",
  required: ['id', 'status', 'title'],
  properties: {
    id: {
      description: "A unique identifier for this particular occurrence of the problem.",
      type: "string",
    },
    status: {
      description: "The HTTP status code applicable to this problem, expressed as a string value.",
      type: "string",
    },
    code: {
      description: "An application-specific error code, expressed as a string value.",
      type: "string"
    },
    title: {
      description: "A short, human-readable summary of the problem. It **SHOULD NOT** change from occurrence to occurrence of the problem, except for purposes of localization.",
      type: "string"
    },
    detail: {
      description: "A human-readable explanation specific to this occurrence of the problem.",
      type: "string"
    },
    source: {
      type: "object",
      properties: {
        pointer: {
          description: "A JSON Pointer [RFC6901] to the associated entity in the request document [e.g. \"/data\" for a primary data object, or \"/data/attributes/title\" for a specific attribute].",
          type: "string"
        },
        parameter: {
          description: "A string indicating which query parameter caused the error.",
          type: "string"
        }
      }
    },
  },
  additionalProperties: false,
}

export default errorSchema