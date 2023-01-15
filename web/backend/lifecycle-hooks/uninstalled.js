import logger from '../services/logger/index.js'
import prisma from '../prisma/index.js'

const uninstalled = async (payload) => {
  const { shop } = payload

  const deleteShop = await prisma.shop.delete({
    where: {
      id: shop,
    },
  })

  logger.info("LIFECYCLE HOOK: APP UNINSTALLED", {
    shop
  })
}

export {
  uninstalled
}