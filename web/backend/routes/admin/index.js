import express from 'express'
const router = express.Router()

import bullBoardRouter from './bull-board.js'

router.use('/admin', bullBoardRouter)

export default router