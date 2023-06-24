import ensureBilling, {
  ShopifyBillingError,
} from "../helpers/ensure-billing.js";

import returnTopLevelRedirection from "../helpers/return-top-level-redirection.js";
import { BILLING_SETTINGS } from "../BILLING_SETTINGS.js";
import { HttpResponseError } from '@shopify/shopify-api'
import shopify from "../helpers/shopify-context.js";
import { loadSession, deleteSession } from "../helpers/session.js";

const TEST_GRAPHQL_QUERY = `
{
  shop {
    name
  }
}`;

export default function verifyRequest(
  app
) {
  return async (req, res, next) => {
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
    // TODO: add api clients here

    const referrer = req.get("Referrer")
    const urlParams = new URLSearchParams(referrer);
    const shop = urlParams.get('shop');

    if(!referrer && !session && !app){
      res.status(401).send({
        "errors": [
          {
            "id": "1",
            "status": "401",
            "title": "Unauthorized",
            "detail": "This route is using the verifyRequest middleware yet an attempt has been made to access it from outside the Shopify Admin. Please Remove the verifyRequest middleware or remove the request for this resource."
          }
        ]
      })

      return
    }

    // let shop = req.query.shop
    if (session && shop && session.shop !== shop) {
      // The current request is for a different shop. Redirect gracefully.
      return
    }

    // There is no session
    if(!session){
      returnTopLevelRedirection(
        req,
        res,
        `/api/auth?shop=${encodeURIComponent(shop)}`
      );
      return
    }

    // There is a session but it is expired or otherwise invalid
    if(session && !session.isActive(shopify.config.scopes)){
      await deleteSession(sessionId)
      returnTopLevelRedirection(
        req,
        res,
        `/api/auth?shop=${encodeURIComponent(shop)}`
      );
      return
    }

    // IMPORTANT! In order to use the billingApi you have to set your app's distribution to "Public"
    // Partner dashboard > Apps > Your App > Distribution
    // If you do not do this, you will get an error

    const USE_BILLING = false

    if(USE_BILLING){
      // Check if the shop has paid
      const hasPayment = await shopify.billing.check({
        session,
        plans: 'My plan',
        isTest: true,
      });

      // If not, redirect to payment confirmation url
      if (!hasPayment) {
        const confirmationUrl = await shopify.billing.request({
          session,
          plan: 'My plan',
          isTest: true,
        });
        returnTopLevelRedirection(req, res, confirmationUrl);
        return
      }
    }

    try {
      // Make a request to ensure the access token is still valid. Otherwise, re-authenticate the user.
      const client = new shopify.clients.Graphql({session})
      await client.query({ data: TEST_GRAPHQL_QUERY });
      return next();
    } catch (e) {
      if (
        e instanceof HttpResponseError &&
        e.response.code === 401
      ) {
        // Delete session and Re-authenticate if we get a 401 response
        await deleteSession(sessionId)
      } else if (e instanceof ShopifyBillingError) {
        console.error(e.message, e.errorData[0]);
        res.status(500).end();
        return;
      } else {
        throw e;
      }
    }

    const bearerPresent = req.headers.authorization?.match(/Bearer (.*)/);
    if (bearerPresent) {
      if (!shop) {
        if (session) {
          shop = session.shop;
        } else if (shopify.config.isEmbeddedApp) {
          if (bearerPresent) {
            const payload = await shopify.session.decodeSessionToken(bearerPresent[1]);
            shop = payload.dest.replace("https://", "");
          }
        }
      }
    }

    returnTopLevelRedirection(
      req,
      res,
      `/api/auth?shop=${encodeURIComponent(shop)}`
    );
  };
}
