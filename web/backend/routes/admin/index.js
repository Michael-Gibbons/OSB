import express from 'express'
const router = express.Router()

import bullBoardRouter from './bull-board.js'
import apiDocRouter from './api-docs.js'

router.use('/admin', bullBoardRouter)
router.use('/admin', apiDocRouter)

export default router