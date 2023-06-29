import shopify from "../helpers/shopify-context.js";
import ensureBilling from "../helpers/ensure-billing.js";
import redirectToAuth from "../helpers/redirect-to-auth.js";

import lifecycleHooks from "../lifecycle-hooks/index.js";

import prisma from '../prisma/index.js'
import { loadSession, storeSession } from "../helpers/session.js";
import { InvalidOAuthError, CookieNotFound } from '@shopify/shopify-api'

import { registerShopifyWebhooks } from "../helpers/shopify-webhooks.js";

export default function applyAuthMiddleware(
  app,
  { billing = { required: false } } = { billing: { required: false } }
) {
  app.get("/api/auth", async (req, res) => {
    return redirectToAuth(req, res, app)
  });

  app.get("/api/auth/callback", async (req, res) => {
    try {
      const callbackResponse = await shopify.auth.callback({
        rawRequest: req,
        rawResponse: res,
      });

      const session = callbackResponse.session

      const storedSession = await loadSession(session.id)

      if(!storedSession){
        await storeSession(session.toObject())
      }

      const installedShop = await prisma.shop.findUnique({
        where: {
          id: session.shop,
        },
      })

      if(!installedShop){
        await lifecycleHooks.installed(session)
      }

      if(session.isOnline){
        const offlineSessionId = await shopify.session.getOfflineId(req.query.shop);
        const offlineSession = await loadSession(offlineSessionId)
        await registerShopifyWebhooks(shopify, offlineSession)
      }

      // If billing is required, check if the store needs to be charged right away to minimize the number of redirects.
      if (billing.required) {
        const [hasPayment, confirmationUrl] = await ensureBilling(
          session,
          billing
        );

        if (!hasPayment) {
          return res.redirect(confirmationUrl);
        }
      }

      const redirectUrl = await shopify.auth.getEmbeddedAppUrl({
        rawRequest: req,
        rawResponse: res,
      });

      res.redirect(redirectUrl);
    } catch (e) {
      console.warn(e);
      switch (true) {
        case e instanceof InvalidOAuthError:
          res.status(400);
          res.send(e.message);
          break;
        case e instanceof CookieNotFound:
        default:
          res.status(500);
          res.send(e.message);
          break;
      }
    }
  });
}
