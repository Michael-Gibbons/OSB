import { handleQuery } from './util/handleQuery.js';
import { handleMutation } from './util/handleMutation.js';

const handleData = ({ shop, key, type, bulkOperationId }) => {
  switch (key) {
    case 'products': // key given in performBulkQuery
      // Each bulk operation may either be a query or mutation

      if(type === 'query'){
        const productQueryData = handleQuery(shop, bulkOperationId)
        // handle product query data here, highly recommend passing to redis queue
      }

      if(type === 'mutation'){
        const productMutationData = handleMutation(shop, bulkOperationId)
        // handle product mutation data here, may or may not need to pass to redis queue
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