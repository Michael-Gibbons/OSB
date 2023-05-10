import fs from 'fs'
import axios from 'axios'
import path from 'path'
import FormData from 'form-data'
import xml2js from 'xml2js'
const parser = new xml2js.Parser()

const INPUT_FILE = './bulkOperationInput.jsonl'

const STAGED_UPLOADS_CREATE = `
  mutation {
    stagedUploadsCreate(input:{
      resource: BULK_MUTATION_VARIABLES,
      filename: "bulk_op_vars",
      mimeType: "text/jsonl",
      httpMethod: POST
    }){
      userErrors{
        field,
        message
      },
      stagedTargets{
        url,
        resourceUrl,
        parameters {
          name,
          value
        }
      }
    }
  }
`

const performBulkMutation = async ({ gqlClient, mutation, variables, key }) => {
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

  const stagedUploadsCreateData = await gqlClient.query(
    {
      data: {
        query: STAGED_UPLOADS_CREATE,
      },
    }
  )

  const uploadEndpoint = stagedUploadsCreateData.body.data.stagedUploadsCreate.stagedTargets[0]
  const uploadFormData = new FormData()// Important to use the imported formdata and not native formdata or else it won't work, unsure why

  for (const variable of variables) {
    try {
      fs.appendFile(INPUT_FILE, JSON.stringify(variable) + '\n', function (err) {
        if (err) return console.log(err);
     });
    } catch (error) {
      throw new Error("Invalid JSON")
    }
  }

  const JSONL_PATH = path.resolve(process.cwd(), INPUT_FILE)

  uploadEndpoint.parameters.forEach(parameter => uploadFormData.append(parameter.name, parameter.value))
  uploadFormData.append('file', fs.createReadStream(JSONL_PATH));

  const res = await axios.post(uploadEndpoint.url, uploadFormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })

  const data = await parser.parseStringPromise(res.data)
  const parsedData = JSON.parse(JSON.stringify(data))
  const uploadUrl = parsedData.PostResponse.Location[0].replace("https://storage.googleapis.com/shopify-staged-uploads/", "")

  const BULK_MUTATION = `
    mutation {
      bulkOperationRunMutation(
        mutation: """${mutation}""",
        stagedUploadPath: "${uploadUrl}") {
        bulkOperation {
          id
          url
          status
        }
        userErrors {
          message
          field
        }
      }
    }
  `

  const bulkMutation =  await gqlClient.query({
    data: {
      query: BULK_MUTATION
    },
  });

  fs.unlinkSync('bulkOperationInput.jsonl')

  return bulkMutation

}

export {
  performBulkMutation
}