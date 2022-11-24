import { Shopify } from "@shopify/shopify-api";

export default function setSecurityPolicy(req, res, next){
  const shop = Shopify.Utils.sanitizeShop(req.query.shop);
  if (Shopify.Context.IS_EMBEDDED_APP && shop) {
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