import express from 'express'
const router = express.Router()

import swaggerUi from 'swagger-ui-express'
import apiDoc from '../../api/v1/api-doc.json' assert { type: "json" }

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDoc));

export default router