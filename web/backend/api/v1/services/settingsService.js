const getSettings = (req, res, next) => {
  const shop = res.locals.shopify.session.shop
  // TODO retrieve from db
  const TEMP_SETTINGS = {
    email: 'exampleEmail@gmail.com',
    coolBooleanSetting: false,
    coolEnumSetting: "1",
    coolCustomSetting: {
      field1: 'This is the value for field 1',
      field2: 'This is the value for field 2'
    }
  }

  res.status(200).send({
    data: [{ id: shop, type: "settings", attributes: TEMP_SETTINGS } ],
  });
}

const saveSettings = (req, res, next) => {
  const shop = res.locals.shopify.session.shop

  const TEMP_SETTINGS = {
    email: 'example2Email@gmail.com',
    coolBooleanSetting: false,
    coolEnumSetting: "1",
    coolCustomSetting: {
      field1: 'This is the value for field 1',
      field2: 'This is the value for field 2'
    }
  }

  res.status(200).send({
    data: [{ id: shop, type: "settings", attributes: TEMP_SETTINGS } ],
  });
}

export default {
  getSettings,
  saveSettings
}