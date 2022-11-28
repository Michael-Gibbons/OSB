import express from 'express'
const router = express.Router()

import swaggerUi from 'swagger-ui-express'

const options = {
  swaggerOptions: {
    url: '/api/v1/api-docs'
  }
}

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options));

export default router