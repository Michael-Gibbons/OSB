import logger from "../services/logger/index.js"

export default async (err, req, res, next) => {
  const error = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)))

  const reqData = {
    id: req.id,
    headers: req.headers,
    method: req.method,
    url: req.url,
    httpVersion: req.httpVersion,
    body: req.body,
    cookies: req.cookies,
    path: req.path,
    protocol: req.protocol,
    query: req.query,
    hostname: req.hostname,
    ip: req.ip,
    originalUrl: req.originalUrl,
    params: req.params,
  };

  const resData = {
    locals: res.locals
  }

  logger.error("APP UNHANDLED ERROR", {
    request: reqData,
    response: resData,
    error
  })

  res.status(500).send("Unhandled Error, a log has been sent to a developer.")
}