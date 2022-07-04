import { Session } from "@shopify/shopify-api/dist/auth/session/index.js";
import db from "../db/models/index.js";
import logger from "../services/logger/index.js";

export async function storeCallback(session) {
  const payload = { ...session };
  const foundSession = await db.Session.findOne({ where: { id: session.id } });
  if (foundSession) {
    //update
    return db.Session.update(
      { payload: payload },
      { where: { id: session.id } }
    )
      .then((_) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  } else {
    //create
    return db.Session.create({
      id: session.id,
      payload: payload,
      shop: payload.shop,
    })
      .then((_) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  }
}

export async function loadCallback(id) {
  const foundSession = await db.Session.findOne({ where: { id: id } });

  if (!foundSession) {
    return undefined;
  }

  try {
    const session = new Session(foundSession.id);
    const {
      shop,
      state,
      scope,
      accessToken,
      isOnline,
      expires,
      onlineAccessInfo,
    } = foundSession.payload;
    session.shop = shop;
    session.state = state;
    session.scope = scope;
    session.expires = expires ? new Date(expires) : undefined;
    session.isOnline = isOnline;
    session.accessToken = accessToken;
    session.onlineAccessInfo = onlineAccessInfo;

    return session;
  } catch (err) {
    logger.error("Error trying to load session", err);
    return undefined;
  }
}

export async function deleteCallback(id) {
  const foundSession = await db.Session.findOne({ where: { id: id } });
  if (foundSession) {
    return foundSession
      .destroy()
      .then((_) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  }
}
