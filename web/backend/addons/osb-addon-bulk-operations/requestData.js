import { performBulkQuery, performBulkMutation } from "./index.js"
import cron from 'node-cron'
import prisma from "../../prisma/index.js";
import loadOfflineSession from "@shopify/shopify-api/dist/utils/load-offline-session.js";
import Shopify from "../../helpers/shopify-context.js";

const PRODUCTS_QUERY = `
{
  products {
    edges {
      node {
        id
        createdAt
        updatedAt
        title
        handle
        descriptionHtml
        productType
        options {
          name
          position
          values
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
}`

const requestData = () => {
  // Handle bulk data requests here by using the performBulkQuery and performBulkMutation functions

  cron.schedule('* * * * *', async () => {// Once a minute, loop through all shops in the shop table and query all products
    const shops = await prisma.shop.findMany()

    for (const shop of shops) {
      const offlineSession = await loadOfflineSession.default(shop.id)
      const gqlClient = new Shopify.Clients.Graphql(shop.id, offlineSession.accessToken)
      performBulkQuery({
        gqlClient,
        query: PRODUCTS_QUERY,
        key: 'products'
      })// query key 'products' used in register.js
    }
  });

  // If you need to run `performBulkQuery` or `performBulkMutation` more than once for different resources
  // You may need to time your cron schedules such that you're sure you will not collide
  // Spacing out each schedule by at least an hour should be more than enough for most usecases

  // If that isn't robust enough for you feel free to implement a queue to retry a failed bulk operation due to collision.
}

export {
  requestData
}