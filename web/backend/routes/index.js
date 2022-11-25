import express from 'express'
const router = express.Router()

import adminRouter from './admin/index.js'

// all root routes *must* be prefixed with `api` since that is the prefix shopify uses for the default callback uri.
// If you do not do this your routes will fail

router.use('/api/admin', adminRouter)

export default router