import fs from 'fs'
import { downloadFile } from './downloadFile.js'
import readline from 'readline'

import loadOfflineSession from "@shopify/shopify-api/dist/utils/load-offline-session.js";
import { Shopify } from '@shopify/shopify-api';

const handleQuery = async (shop, bulkOperationId) => {
  const offlineSession = await loadOfflineSession.default(shop)
  const gqlClient = new Shopify.Clients.Graphql(shop, offlineSession.accessToken)

  const BULK_OPERATION_QUERY = `query {
    node(id: "${bulkOperationId}") {
      ... on BulkOperation {
        url
        partialDataUrl
      }
    }
  }`

  const bulkOperation = await gqlClient.query({
    data: {
      query: BULK_OPERATION_QUERY
    },
  });

  const bulkOperationData = bulkOperation.body.data.node

  await downloadFile(bulkOperationData.url, './data.jsonl')

  const fileStream = fs.createReadStream('./data.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const data = []
  for await (const line of rl) {
    data.push(JSON.parse(line))
  }

  return data
}

export {
  handleQuery
}