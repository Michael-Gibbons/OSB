import Shopify from "../../../helpers/shopify-context.js";
import productCreator from "../../../helpers/product-creator.js";
import logger from "../../../services/logger/index.js";

const getProductCount = async (req, res, next) => {
  const session = res.locals.shopify.session

  const { Product } = await import(
    `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
  );

  const countData = await Product.count({ session });
  res.status(200).send({ data: { id: "product", type: "product", attributes: { ...countData } }});
}

const createProducts = async (req, res, next) => {
  const session = res.locals.shopify.session

  let status = 200;
  let error = null;

  try {
    await productCreator(session);
  } catch (e) {
    logger.error(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ data: { id: "product", type: "product", attributes: { success: status === 200, error } }});
}

export default {
  getProductCount,
  createProducts
}