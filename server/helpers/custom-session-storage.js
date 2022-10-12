import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Session } from "@shopify/shopify-api/dist/auth/session/index.js";

const storeCallback = async (session) => {
  const upsertSession = await prisma.session.upsert({
    where: {
      id: session.id,
    },
    update: {
      payload: { ...session },
    },
    create: {
      id: session.id,
      shop: session.shop,
      payload: { ...session },
    },
  });

  if (upsertSession.id) {
    return true;
  }

  return false;
};

const loadCallback = async (id) => {
  const foundSession = await prisma.session.findUnique({ where: { id } });

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
    console.log(err);
    return undefined;
  }
};

const deleteCallback = async (id) => {
  const deleteSession = await prisma.session.delete({ where: { id } });
  if (deleteSession.id) {
    return true;
  }
  return false;
};

export { storeCallback, loadCallback, deleteCallback };
