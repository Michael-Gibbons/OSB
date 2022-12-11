import { Shopify } from "@shopify/shopify-api";
import ensureBilling, {
  ShopifyBillingError,
} from "../helpers/ensure-billing.js";

import returnTopLevelRedirection from "../helpers/return-top-level-redirection.js";
import { BILLING_SETTINGS } from "../BILLING_SETTINGS.js";

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
    const session = await Shopify.Utils.loadCurrentSession(
      req,
      res
    );

    if(!res.locals.shopify){
      res.locals.shopify = {}
    }

    res.locals.shopify.session = session


    const referrer = req.get("Referrer")

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

    let shop = Shopify.Utils.sanitizeShop(req.query.shop);
    if (session && shop && session.shop !== shop) {
      // The current request is for a different shop. Redirect gracefully.
      return
    }

    if (session?.isActive()) {
      try {
        if (BILLING_SETTINGS.required) {
          // The request to check billing status serves to validate that the access token is still valid.
          const [hasPayment, confirmationUrl] = await ensureBilling(
            session,
            BILLING_SETTINGS
          );

          if (!hasPayment) {
            returnTopLevelRedirection(req, res, confirmationUrl);
            return;
          }
        } else {
          // Make a request to ensure the access token is still valid. Otherwise, re-authenticate the user.
          const client = new Shopify.Clients.Graphql(
            session.shop,
            session.accessToken
          );
          await client.query({ data: TEST_GRAPHQL_QUERY });
        }
        return next();
      } catch (e) {
        if (
          e instanceof Shopify.Errors.HttpResponseError &&
          e.response.code === 401
        ) {
          // Re-authenticate if we get a 401 response
        } else if (e instanceof ShopifyBillingError) {
          console.error(e.message, e.errorData[0]);
          res.status(500).end();
          return;
        } else {
          throw e;
        }
      }
    }

    const bearerPresent = req.headers.authorization?.match(/Bearer (.*)/);
    if (bearerPresent) {
      if (!shop) {
        if (session) {
          shop = session.shop;
        } else if (Shopify.Context.IS_EMBEDDED_APP) {
          if (bearerPresent) {
            const payload = Shopify.Utils.decodeSessionToken(bearerPresent[1]);
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
