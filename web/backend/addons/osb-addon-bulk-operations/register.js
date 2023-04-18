import { requestData } from './requestData.js';
import { handleData } from './handleData.js'

const register = ({ app }) => {
  requestData()// This function defines how/when you would like to get data

  app.post('/api/addons/bulk-operations/:shop/:key', async (req, res) => {
    res.status(200).send('OK')

    const shop = req.params.shop.replace("_", ".")
    const key = req.params.key
    const type = req.body.type
    const bulkOperationId = req.body.admin_graphql_api_id

    handleData({shop, key, type, bulkOperationId})// This function defines what we want to do with the data
  })
}

export {
  register
}