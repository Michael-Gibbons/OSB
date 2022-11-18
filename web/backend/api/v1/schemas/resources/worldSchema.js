const worldSchema = {
  allOf: [
    {
      $ref: '#/components/schemas/resource'
    },
    {
      type: 'object',
      properties: {
        name: {
          description: 'The name of this world.',
          type: 'string',
        }
      },
    }
  ]
}

export default worldSchema