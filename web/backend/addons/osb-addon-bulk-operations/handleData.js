import { extractDataFromBulkOperation } from './util/extractDataFromBulkOperation.js';

const handleData = async ({ gqlClient, key, type, bulkOperationId }) => {
  switch (key) {
    case 'products': // key given in performBulkQuery

      // Each bulk operation may either be a query or mutation
      if(type === 'query'){
        const productQueryData = await extractDataFromBulkOperation(gqlClient, bulkOperationId)
        console.log(productQueryData)
      }

      if(type === 'mutation'){
        const productMutationData = await extractDataFromBulkOperation(gqlClient, bulkOperationId)
        productMutationData.forEach(product => console.log(product.data.productCreate))

      }
      break;
      // Add other keys to handle different bulk operations differently.
      // Only one bulk operation may be in progress at one time.
    default:
      break;
  }
}

export {
  handleData
}