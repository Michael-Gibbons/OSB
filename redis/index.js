import dotenv from "dotenv";
dotenv.config();

import IORedis from "ioredis";
import logger from "../services/logger/index.js";

const connections = {
  test: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    maxRetriesPerRequest: null,
  },
  development: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    maxRetriesPerRequest: null,
  },
  staging: {
    host: process.env.STAGING_REDIS_HOST,
    port: Number(process.env.STAGING_REDIS_PORT),
    maxRetriesPerRequest: null,
  },
  production: {
    host: process.env.PROD_REDIS_HOST,
    port: Number(process.env.PROD_REDIS_PORT),
    maxRetriesPerRequest: null,
  },
};

const env = process.env.NODE_ENV || "development";
const connection = new IORedis(connections[env]);

connection.on("connect", () =>
  logger.info(
    `Connection to ${process.env.NODE_ENV} redis server at ${connections[env].host} was successful`
  )
);

const defaultJobOptions = {
  removeOnComplete: true,
  attempts: 100,
  backoff: {
    type: "exponential",
    delay: 1000,
  },
};

export { connection, defaultJobOptions };
