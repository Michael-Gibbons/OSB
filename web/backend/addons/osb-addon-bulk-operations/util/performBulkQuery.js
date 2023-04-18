const performBulkQuery = async ({ gqlClient, query, key }) => {
  const BULK_QUERY = `mutation {
    bulkOperationRunQuery(
      query:"""${query}"""
    ) {
      bulkOperation {
        id
        status
      }
      userErrors {
        field
        message
      }
    }
  }`

  await gqlClient.query({
    data: {
      query: BULK_QUERY
    },
  });

  const HOST_PATH = path.resolve(process.cwd(), '../../', 'HOST.txt')
  const host = fs.readFileSync(HOST_PATH, {encoding:'utf8', flag:'r'});

  const WEBHOOK_SUBSCRIPTION_QUERY = `mutation {
    webhookSubscriptionCreate(
      topic: BULK_OPERATIONS_FINISH
      webhookSubscription: {
        format: JSON,
        callbackUrl: "${host}/api/addons/bulk-operations/${gqlClient.domain.replace(".","_")}/${key}"}
    ) {
      userErrors {
        field
        message
      }
      webhookSubscription {
        id
      }
    }
  }`

  gqlClient.query({
    data: {
      query: WEBHOOK_SUBSCRIPTION_QUERY
    },
  });

  return 'OK'
}

export {
  performBulkQuery
}