import { requestData } from './requestData.js';
import { handleData } from './handleData.js'

import loadOfflineSession from "@shopify/shopify-api/dist/utils/load-offline-session.js";
import { Shopify } from "@shopify/shopify-api";

const register = ({ app }) => {
  requestData()// This function defines how/when you would like to get data

  app.post('/api/addons/bulk-operations/:shop/:key', async (req, res) => {// :key is used to namespace the route by resource, it can be anything as long as it is unique
    res.status(200).send('OK')

    const shop = req.params.shop.replace("_", ".")
    const key = req.params.key
    const type = req.body.type
    const bulkOperationId = req.body.admin_graphql_api_id

    const offlineSession = await loadOfflineSession.default(shop)
    const gqlClient = new Shopify.Clients.Graphql(shop, offlineSession.accessToken)

    const DELETE_WEBHOOK_SUBSCRIPTION_MUTATION = `
      mutation webhookSubscriptionDelete($id: ID!) {
        webhookSubscriptionDelete(id: $id) {
          deletedWebhookSubscriptionId
          userErrors {
            field
            message
          }
        }
      }
    `

    const ALL_WEBHOOK_SUBSCRIPTIONS = `
      query WebhookSubscription {
        webhookSubscriptions(first: 100){
          edges {
            node {
              id
              topic
              callbackUrl
            }
          }
        }
      }
    `

    const data = await gqlClient.query({
      data: {
        query: ALL_WEBHOOK_SUBSCRIPTIONS,
      },
    });

    const bulkOperationWebhooks = data.body.data.webhookSubscriptions.edges.filter(webhookSubscription => webhookSubscription.node.topic === 'BULK_OPERATIONS_FINISH')

    for (const bulkOperationWebhook of bulkOperationWebhooks) {// There should only ever be one bulk operation webhook but a little verification never hurt anyone right?
      await gqlClient.query({
        data: {
          query: DELETE_WEBHOOK_SUBSCRIPTION_MUTATION,
          variables: {
            id: bulkOperationWebhook.node.id
          },
        },
      })
    }

    handleData({gqlClient, key, type, bulkOperationId})// This function defines what we want to do with the data
  })
}

export {
  register
}