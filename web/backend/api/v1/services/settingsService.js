import prisma from "../../../prisma/index.js";

const getSettings = async (req, res, next) => {
  const shop = res.locals.shopify.session.shop

  const shopSettings = await prisma.settings.findUnique({
    where: {
      shopId: shop
    }
  })

  res.status(200).send({
    data: [{ id: shop, type: "settings", attributes: shopSettings } ],
  });
}

const saveSettings = async (req, res, next) => {
  const newSettings = req.body
  const shop = res.locals.shopify.session.shop

  const updatedSettings = await prisma.settings.update({
    where: {
      shopId: shop
    },
    data: {
      settings: newSettings
    },
  })

  res.status(200).send({
    data: [{ id: shop, type: "settings", attributes: updatedSettings } ],
  });
}

export default {
  getSettings,
  saveSettings
}