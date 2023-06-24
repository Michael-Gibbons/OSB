import shopify from "./shopify-context.js";
import { loadSession } from "./session.js";

export default async function redirectToAuth(req, res, app = {}) {
  if (!req.query.shop) {
    res.status(500);
    return res.send("No shop provided");
  }

  if (req.query.embedded === "1") {
    return clientSideRedirect(req, res);
  }

  const offlineSessionId = await shopify.session.getOfflineId(req.query.shop);
  const offlineSession = await loadSession(offlineSessionId)

  if(!offlineSession){
    return await offlineServerSideRedirect(req, res, app)
  }

  return await serverSideRedirect(req, res, app);
}

function clientSideRedirect(req, res) {
  const shop = req.query.shop
  const redirectUriParams = new URLSearchParams({
    shop,
    host: req.query.host,
  }).toString();
  const queryParams = new URLSearchParams({
    ...req.query,
    shop,
    redirectUri: `https://${shopify.config.hostName}/api/auth?${redirectUriParams}`,
  }).toString();

  return res.redirect(`/exitiframe?${queryParams}`);
}

async function serverSideRedirect(req, res, app) {
  await shopify.auth.begin({
    rawRequest: req,
    rawResponse: res,
    shop: req.query.shop,
    callbackPath: "/api/auth/callback",
    isOnline: true
  });
}

async function offlineServerSideRedirect(req, res, app) {
  await shopify.auth.begin({
    rawRequest: req,
    rawResponse: res,
    shop: req.query.shop,
    callbackPath: "/api/auth/callback",
    isOnline: false
  });
}
