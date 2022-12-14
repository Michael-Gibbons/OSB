import express from 'express'
const router = express.Router()

import adminRouter from './admin/index.js'
import webhookRouter from './webhooks/index.js'
import logRouter from './log/index.js'
import verifyRequest from '../middleware/verify-request.js'

// all root routes *must* be prefixed with `api` since that is the prefix shopify uses for the callback uri during auth.
// If you do not do this your routes will fail

router.use('/api', adminRouter)
router.use('/api', webhookRouter)
router.use('/api', logRouter)

router.use('/api/authCheck', verifyRequest(), (req, res) => res.status(200).send('ok')) // This is an authcheck route, if this route returns a 403 that means the user needs to reauth.

export default router