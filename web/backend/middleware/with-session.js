import { loadSession } from "../helpers/session.js";
import shopify from "../helpers/shopify-context.js";

export default async function withSession(req, res, next){
  const sessionId = await shopify.session.getCurrentId({
    isOnline: true,
    rawRequest: req,
    rawResponse: res,
  });

  const session = await loadSession(sessionId)

  if(!res.locals.shopify){
    res.locals.shopify = {}
  }

  res.locals.shopify.session = session

  next()
}