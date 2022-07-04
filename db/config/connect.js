import dbObj from "../models/index.js";
const db = dbObj.sequelize;

import logger from "../../services/logger/index.js";

const connect = async () => {
  try {
    await db.authenticate();
    logger.info(
      `Connection to the ${process.env.NODE_ENV} database was successful `
    );
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }

  try {
    await db.sync();
    logger.info(`${process.env.NODE_ENV} database was successfully synced`);
  } catch (error) {
    logger.error("Unable to sync to the database:", error);
  }
};

export default { connect };
