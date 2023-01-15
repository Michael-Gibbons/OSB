import logger from '../services/logger/index.js'

import prisma from '../prisma/index.js'

const installed = async (payload) => {
  const { shop } = payload

  const DEFAULT_SETTINGS = {
    email: 'defaultEmail@gmail.com',
    coolBooleanSetting: true,
    coolEnumSetting: "1",
    coolCustomSetting: {
      field1: 'This is the value for field 1',
      field2: 'This is the value for field 2'
    }
  }

  const newShop = await prisma.shop.create({
    data: {
      id: shop,
      settings: {
        create: {
          settings: DEFAULT_SETTINGS
        }
      }
    },
  })

  logger.info("LIFECYCLE HOOK: APP INSTALLED", {
    shop: newShop
  })

}

export {
  installed
}