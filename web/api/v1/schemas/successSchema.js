const successSchema = {
  type: "object",
  required: [
    "data"
  ],
  properties: {
    data: {
      oneOf: [
        {
          $ref: "#/components/schemas/resource"
        },
        {
          type: "array",
          items: {
            $ref: "#/components/schemas/resource"
          },
        }
      ],
      uniqueItems: true
    },
    links: {
      $ref: '#/components/schemas/pagination'
    }
  },
  additionalProperties: false
}

export default successSchema