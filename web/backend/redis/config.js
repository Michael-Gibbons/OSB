import dotenv from 'dotenv'
dotenv.config()

const connections = {
  test: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
  development: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
  staging: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: String(process.env.REDIS_USER),
    password: String(process.env.REDIS_PASSWORD),
    maxRetriesPerRequest: null,
    connectTimeout: 30000,
    tls: {},
  },
  production: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: String(process.env.REDIS_USER),
    password: String(process.env.REDIS_PASSWORD),
    maxRetriesPerRequest: null,
    connectTimeout: 30000,
    tls: {},
  },
};

const env = process.env.NODE_ENV || "development";

/*
Make sure that your redis instance has the setting
maxmemory-policy=noeviction
in order to avoid automatic removal of keys which would cause unexpected errors in BullMQ
*/

const REDIS_CONFIG = {
  connection: {...connections[env]},
  defaultJobOptions: {
    removeOnComplete: 1000,// keep the last 1000 completed jobs as reference
    attempts: 100,
    delay: 1000,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  },
  limiter: {// Rate limits jobs to 1 per second. Only applies to workers, when REDIS_CONFIG is used on queues this object will be ignored.
    max: 1,
    duration: 1000,
  },
  // jobId: customJobId, // if you need to avoid duplicated jobs you may set a job id like so (in the actual queue not here). Useful for shopify orders for example.
  // example: await myQueue.add('name', { ...REDIS_CONFIG, jobId: order.id })
  /*
  {
    repeat: {
      pattern: '* 15 3 * * *', // define repeatable jobs like so, useful for cron based tasks.
    },
  },
  */
  // example: await myQueue.add('name', { ...REDIS_CONFIG, repeat: { pattern: '* 15 3 * * *'} })
}

export default REDIS_CONFIG
