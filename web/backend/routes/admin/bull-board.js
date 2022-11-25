import express from 'express'
const router = express.Router()

import buildBullBoard from '../../middleware/build-bull-board.js'

router.use("/queues", buildBullBoard("/api/admin/queues"))

export default router