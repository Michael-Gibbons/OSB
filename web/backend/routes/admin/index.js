import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const router = express.Router()

import bullBoardRouter from './bull-board.js'
import apiDocRouter from './api-docs.js'
import basicAuth from 'express-basic-auth'

const authMiddleware = basicAuth({
  users: { [process.env.ADMIN_USERNAME]: process.env.ADMIN_PASSWORD },
  challenge: true
})

router.use('/admin', authMiddleware, bullBoardRouter)
router.use('/admin', authMiddleware, apiDocRouter)

export default router