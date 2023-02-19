import logger from '../../logger/index.js'

const logAllOutgoing = response => {

  const { status, config, statusText } = response
  const data = {
    status,
    request: {
      data: config.data,
      url: config.url,
      method: config.method,
      headers: JSON.parse(JSON.stringify(config.headers)),
      baseURL: config.baseURL
    },
    statusText,
  }

  if(logger.status >= 300){
    logger.error("API CLIENT ERROR", data)
  }else{
    logger.info("API CLIENT OUTGOING REQUEST", data)
  }

  return response
}

export {
  logAllOutgoing
}