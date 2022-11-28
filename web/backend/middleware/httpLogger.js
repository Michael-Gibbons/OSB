import morgan from 'morgan'
import logger from '../services/logger/index.js'
import devnull from 'dev-null'
morgan.token('request-id', function (req, res) { return req.id })

function jsonFormat(tokens, req, res) {
  return logger.info("HTTP REQUEST", {
    'request-id': tokens['request-id'](req, res),
    'remote-address': tokens['remote-addr'](req, res),
    'time': tokens['date'](req, res, 'iso'),
    'method': tokens['method'](req, res),
    'url': tokens['url'](req, res),
    'http-version': tokens['http-version'](req, res),
    'status-code': tokens['status'](req, res),
    'content-length': tokens['res'](req, res, 'content-length'),
    'referrer': tokens['referrer'](req, res),
    'user-agent': tokens['user-agent'](req, res),
    'response-time': tokens['response-time'](req, res) + 'ms'
  });
}
export default () => {
  return morgan(jsonFormat, { stream: devnull() })
}