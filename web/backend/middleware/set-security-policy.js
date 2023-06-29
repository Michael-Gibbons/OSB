import shopify from "../helpers/shopify-context.js";

export default function setSecurityPolicy(req, res, next){
  const shop = req.query.shop
  if (shopify.config.isEmbeddedApp && shop) {
    res.setHeader(
      "Content-Security-Policy",
      `frame-ancestors https://${encodeURIComponent(
        shop
      )} https://admin.shopify.com;`
    );
  } else {
    res.setHeader("Content-Security-Policy", `frame-ancestors 'none';`);
  }
  next();
}