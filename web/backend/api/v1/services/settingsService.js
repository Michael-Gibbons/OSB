import prisma from "../../../prisma/index.js";

const getSettings = async (req, res, next) => {
  const shop = res.locals.shopify.session.shop

  const DEFAULT_SETTINGS = {
    email: 'exampleEmail@gmail.com',
    coolBooleanSetting: false,
    coolEnumSetting: "1",
    coolCustomSetting: {
      field1: 'This is the value for field 1',
      field2: 'This is the value for field 2'
    }
  }

  const upsertSettings = await prisma.settings.upsert({
    where: {
      shop
    },
    update: {},
    create: {
      shop,
      settings: DEFAULT_SETTINGS
    },
  })

  res.status(200).send({
    data: [{ id: shop, type: "settings", attributes: upsertSettings } ],
  });
}

const saveSettings = async (req, res, next) => {
  const newSettings = req.body
  const shop = res.locals.shopify.session.shop

  const upsertSettings = await prisma.settings.update({
    where: {
      shop
    },
    data: {
      shop,
      settings: newSettings
    },
  })

  res.status(200).send({
    data: [{ id: shop, type: "settings", attributes: upsertSettings } ],
  });
}

export default {
  getSettings,
  saveSettings
}