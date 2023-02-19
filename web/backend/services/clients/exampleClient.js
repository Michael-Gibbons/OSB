import dotenv from 'dotenv'
dotenv.config()

import axios from 'axios'
import { logAllOutgoing } from './interceptors/logAllOutgoing.js';

const exampleClient = axios.create({
  baseURL: 'https://httpbin.org',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

exampleClient.interceptors.response.use(logAllOutgoing)

export {
  exampleClient
}