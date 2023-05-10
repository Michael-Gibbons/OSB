import path from 'path'
import fs from 'fs'

const performBulkQuery = async ({ gqlClient, query, key }) => {
  const HOST_PATH = path.resolve(process.cwd(), '../../', 'HOST.txt')
  const host = fs.readFileSync(HOST_PATH, {encoding:'utf8', flag:'r'});

  const CURRENT_BULK_OPERATION = `
    query BulkOperation {
      currentBulkOperation{
        status
      }
    }
  `
  
  const currentBulkOperation = await gqlClient.query({
    data: {
      query: CURRENT_BULK_OPERATION,
    },
  });

  const currentBulkOperationStatus = currentBulkOperation.body.data.currentBulkOperation.status

  if(currentBulkOperationStatus === 'RUNNING'){
    throw new Error("Bulk Operation Collision! Shopify enforces a limit of one bulk operation at a time.")
  }

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

  await gqlClient.query({
    data: {
      query: WEBHOOK_SUBSCRIPTION_QUERY
    },
  });

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

  return gqlClient.query({
    data: {
      query: BULK_QUERY
    },
  });
}

export {
  performBulkQuery
}