import { performBulkQuery, performBulkMutation } from "./index.js"
import cron from 'node-cron'
import prisma from "../../prisma/index.js";
import loadOfflineSession from "@shopify/shopify-api/dist/utils/load-offline-session.js";
import Shopify from "../../helpers/shopify-context.js";

const CREATE_PRODUCTS_MUTATION = `
mutation productCreate($input: ProductInput!) {
  productCreate(input: $input) {
    product {
      id
    }
    userErrors {
      field
      message
    }
  }
}
`

const createProductsInput = [
  { "input": { "title": "Sweet new snowboard 1", "productType": "Snowboard", "vendor": "JadedPixel" } },
  { "input": { "title": "Sweet new snowboard 2", "productType": "Snowboard", "vendor": "JadedPixel" } },
  { "input": { "title": "Sweet new snowboard 3", "productType": "Snowboard", "vendor": "JadedPixel" } },
  { "input": { "title": "Sweet new snowboard 4", "productType": "Snowboard", "vendor": "JadedPixel" } },
  { "input": { "title": "Sweet new snowboard 5", "productType": "Snowboard", "vendor": "JadedPixel" } },
  { "input": { "title": "Sweet new snowboard 6", "productType": "Snowboard", "vendor": "JadedPixel" } },
  { "input": { "title": "Sweet new snowboard 7", "productType": "Snowboard", "vendor": "JadedPixel" } },
  { "input": { "title": "Sweet new snowboard 8", "productType": "Snowboard", "vendor": "JadedPixel" } },
  { "input": { "title": "Sweet new snowboard 9", "productType": "Snowboard", "vendor": "JadedPixel" } },
  { "input": { "title": "Sweet new snowboard 10", "productType": "Snowboard", "vendor": "JadedPixel" } },
]

const requestData = () => {
  // Handle bulk data requests here by using the performBulkQuery and performBulkMutation functions

  cron.schedule('* * * * *', async () => {// Once a minute, loop through all shops in the shop table and query all products
    const shops = await prisma.shop.findMany()

    for (const shop of shops) {
      const offlineSession = await loadOfflineSession.default(shop.id)
      const gqlClient = new Shopify.Clients.Graphql(shop.id, offlineSession.accessToken)
      // performBulkQuery({
      //   gqlClient,
      //   query: PRODUCTS_QUERY,
      //   key: 'products'
      // })// query key 'products' used in register.js
      performBulkMutation({
        gqlClient,
        mutation: CREATE_PRODUCTS_MUTATION,
        variables: createProductsInput,
        key: 'products',
      })
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