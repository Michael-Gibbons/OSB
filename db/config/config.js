import dotenv from "dotenv";
dotenv.config();

export default {
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: process.env.LOG_DB_QUERIES === "true" ? console.log : false,
    define: {
      underscoredAll: true,
      timestamps: true,
    },
  },
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: process.env.LOG_DB_QUERIES === "true" ? console.log : false,
    define: {
      underscoredAll: true,
      timestamps: true,
    },
  },
  staging: {
    username: process.env.STAGING_DB_USER,
    password: process.env.STAGING_DB_PASSWORD,
    database: process.env.STAGING_DB_NAME,
    host: process.env.STAGING_DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: process.env.LOG_DB_QUERIES === "true" ? console.log : false,
    define: {
      underscoredAll: true,
      timestamps: true,
    },
  },
  production: {
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
    dialect: "mysql",
    logging: process.env.LOG_DB_QUERIES === "true" ? console.log : false,
    define: {
      underscoredAll: true,
      timestamps: true,
    },
  },
};
