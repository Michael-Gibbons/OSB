import express from 'express'
const router = express.Router()

import adminRouter from './admin/index.js'
import webhookRouter from './webhooks/index.js'

// all root routes *must* be prefixed with `api` since that is the prefix shopify uses for the callback uri during auth.
// If you do not do this your routes will fail

router.use('/api', adminRouter)
router.use('/api', webhookRouter)

export default router