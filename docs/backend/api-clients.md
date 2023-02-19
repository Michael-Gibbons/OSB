# API Clients

An api client within the context of this template means a dedicated axios instance your application uses to interact with external APIs.

This is an example api client:

```js
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
```

> Note the `logAllOutgoing` interceptor, this is what logs all outgoing requests from your server, useful for debugging.

For exact usage see [Axio's Documentation](https://www.npmjs.com/package/axios)