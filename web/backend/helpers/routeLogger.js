import listEndpoints from 'express-list-endpoints'
import logger from '../services/logger/index.js'

export default (app) => {
  const endpoints = listEndpoints(app)
  const pathLog = {}

  endpoints.forEach(endpoint => {
    pathLog[endpoint.path] = endpoint.methods.join(' ')
  })

  logger.info("APP STARTUP - REGISTERED ROUTES", pathLog)
}