import db from "../../db/models/index.js";
const Session = db.Session;
const Shop = db.Shop;
import logger from "../../services/logger/index.js";

const invalidateSessions = async () => {
  logger.info("Invalidating all sessions");

  const allShops = await Shop.findAll();

  for (const shop of allShops) {
    await shop.update({ longTermAccessToken: null });
  }

  await Session.destroy({
    where: {},
    truncate: true,
  });

  logger.info("Successfully invalidated all sessions");
};

export default invalidateSessions;
