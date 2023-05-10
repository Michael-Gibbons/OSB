import fs from 'fs'
import { downloadFile } from './downloadFile.js'
import readline from 'readline'
const OUTPUT_FILE = './bulkOperationOutput.jsonl'

const extractDataFromBulkOperation = async (gqlClient, bulkOperationId) => {

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

  fs.unlinkSync(OUTPUT_FILE)

  await downloadFile(bulkOperationData.url, OUTPUT_FILE)

  const fileStream = fs.createReadStream(OUTPUT_FILE);

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
  extractDataFromBulkOperation
}