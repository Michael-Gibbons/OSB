import prisma from "../prisma/index.js"
import { Session } from '@shopify/shopify-api';

const storeSession = async (session) => {
  const storedSession = await prisma.session.create({
    data: {
      id: session.id,
      shop: session.shop,
      state: session.state,
      isOnline: session.isOnline,
      accessToken: session.accessToken,
      scope: session.scope,
      expires: session.expires || null,
      associated_user_scope: session.onlineAccessInfo?.associated_user_scope || null,
      associated_user_id: parseInt(session.onlineAccessInfo?.associated_user.id) || null,
      associated_user_first_name: session.onlineAccessInfo?.associated_user.first_name || null,
      associated_user_last_name: session.onlineAccessInfo?.associated_user.last_name || null,
      associated_user_email: session.onlineAccessInfo?.associated_user.email || null,
      associated_user_locale: session.onlineAccessInfo?.associated_user.locale || null,
      associated_user_email_verified: session.onlineAccessInfo?.associated_user.email_verified || null,
      associated_user_account_owner: session.onlineAccessInfo?.associated_user.account_owner || null,
      associated_user_collaborator: session.onlineAccessInfo?.associated_user.collaborator || null,
    },
  })

  return storedSession
}

const deleteSession = async (id) => {
  const deletedSession = await prisma.session.delete({
    where: {
      id,
    },
  })

  if(!deletedSession){
    return null
  }

  return deletedSession
}

const loadSession = async (id) => {
  const session = await prisma.session.findUnique({
    where: {
      id,
    },
  })

  if(!session){
    return null
  }

  const newSessionObject = {
    id: session.id,
    shop: session.shop,
    state: session.state,
    isOnline: session.isOnline,
    accessToken: session.accessToken,
    scope: session.scope || null,
    expires: session.expires || null,
    onlineAccessInfo: {
      associated_user_scope: session.associated_user_scope || null,
      associated_user: {
        id: session.associated_user_id || null,
        first_name: session.associated_user_first_name || null,
        last_name: session.associated_user_last_name || null,
        email: session.associated_user_email || null,
        locale: session.associated_user_locale || null,
        email_verified: session.associated_user_locale || null,
        account_owner: session.associated_user_account_owner || null,
        collaborator: session.associated_user_collaborator || null
      }
    }
  }

  const clone = new Session({...newSessionObject});

  return clone
}

export {
  storeSession,
  deleteSession,
  loadSession
}