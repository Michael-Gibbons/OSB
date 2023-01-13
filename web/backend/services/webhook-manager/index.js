import dotenv from 'dotenv'
dotenv.config()

import cron from 'node-cron'
import logger from '../logger/index.js';

import { exampleWebhookClient } from './webhookClients/index.js';

// serviceTitle: string, title of service for logging purposes
// subscriptions: { topic, target_url}
// topicKey: string, representing the key of the property the webhook client uses for their topics. most apis just have a 'topic' key. ie { topic: 'SUBSCRIPTION_CREATED', ...otherData }
// idKey: string, representing the key of the property the webhook client uses for their ids, usually just 'id'.
// targetUrlKey: string, representing the return address for the webhook. ex YOUR_APP.com/webhooks. usually just 'address'
// getWebhooks: promise, returns array of all webhooks used for a particular client
// deleteWebhook: function, accepts id of webhook following and deletes the webhook associated with that id, usually just DELETE baseurl/webhooks/id
// registerWebhook: function, accepts topic, registers webhook for that topic

const WEBHOOK_CLIENTS = [
  exampleWebhookClient
]

const webhookManager = {
  sync: async () => {

    const HOST = process.env.HOST.replace(/(^\w+:|^)\/\//, ''); // Removes any url protocols so we're left with just the domain

    for (const webhookClientIndex in WEBHOOK_CLIENTS) {
      const webhookClient = WEBHOOK_CLIENTS[webhookClientIndex]
      const SERVICE_TITLE = webhookClient.serviceTitle

      if(!SERVICE_TITLE){
        throw new Error('Service title required for webhook client', webhookClient)
      }

      logger.info("APP STARTUP: 3RD PARTY WEBHOOKS", {
        service: SERVICE_TITLE,
        action: "Starting Sync"
      })

      const SUBSCRIPTIONS = webhookClient.subscriptions || []
      const TOPIC_KEY = webhookClient.topicKey || 'topic'
      const ID_KEY = webhookClient.idKey || 'id'
      const TARGET_URL_KEY = webhookClient.targetUrlKey || 'address'

      const currentWebhooks = await webhookClient.getWebhooks() || []

      const webhooksToDelete = []
      const webhooksToRegister = []

      currentWebhooks.forEach(webhook => {
        const isAnOldWebhook = !SUBSCRIPTIONS.find(subscription => subscription.topic === webhook[TOPIC_KEY])

        if(isAnOldWebhook){
          webhooksToDelete.push({id: webhook[ID_KEY], webhook})
          logger.info("APP STARTUP: 3RD PARTY WEBHOOKS", {
            service: SERVICE_TITLE,
            action: `Found old webhook for webhook topic: ${webhook[TOPIC_KEY]}. Deleting then re-registering.`
          })
        }
      })

      for(const subscriptionIndex in SUBSCRIPTIONS){
        const subscription = SUBSCRIPTIONS[subscriptionIndex]
        if(!subscription.topic){
          throw new Error("No subscription topic for subscription", subscription)
        }

        const foundWebhook = currentWebhooks.find(webhook => webhook[TOPIC_KEY] === subscription.topic)

        if(!foundWebhook){
          webhooksToRegister.push({topic: subscription.topic, targetUrl: subscription.targetUrl, webhook: foundWebhook})
          logger.info("APP STARTUP: 3RD PARTY WEBHOOKS", {
            service: SERVICE_TITLE,
            action: `No Webhook found for webhook topic: ${subscription.topic}. Queuing for registration.`
          })
          continue
        }

        const foundWebhookHasCorrectHost = foundWebhook[TARGET_URL_KEY].includes(HOST)
        if(!foundWebhookHasCorrectHost){
          webhooksToRegister.push({topic: subscription.topic, targetUrl: subscription.targetUrl, webhook: foundWebhook})
          webhooksToDelete.push({id: foundWebhook[ID_KEY], webhook: foundWebhook})
          logger.info("APP STARTUP: 3RD PARTY WEBHOOKS", {
            service: SERVICE_TITLE,
            action: `Different host found for webhook topic: ${subscription.topic}. Deleting then re-registering.`
          })
          continue

        }

        const foundWebhookHasCorrectTargetUrl = foundWebhook[TARGET_URL_KEY].includes(subscription.targetUrl)
        if(!foundWebhookHasCorrectTargetUrl){
          webhooksToRegister.push({topic: subscription.topic, targetUrl: subscription.targetUrl, webhook: foundWebhook})
          webhooksToDelete.push({id: foundWebhook[ID_KEY], webhook: foundWebhook})
          logger.info("APP STARTUP: 3RD PARTY WEBHOOKS", {
            service: SERVICE_TITLE,
            action: `Different target url found for webhook topic: ${subscription.topic}. Deleting then re-registering.`
          })
          continue
        }

        // If we reach this point, the webhook exists and has the correct HOST_URL
        // You can further establish filtering criteria here using custom middleware

        for (const middlewareIndex in webhookClient.middleware) {
          const middleware = webhookClient.middleware[middlewareIndex]
          middleware({ subscription, currentWebhooks, webhooksToRegister, webhooksToDelete })
        }
      }

      for(const webhookToDeleteIndex in webhooksToDelete){
        const webhookToDelete = webhooksToDelete[webhookToDeleteIndex]
        await webhookClient.deleteWebhook(webhookToDelete)
        logger.info("APP STARTUP: 3RD PARTY WEBHOOKS", {
          service: SERVICE_TITLE,
          action: `Deleted ${webhookToDelete.webhook.topic}`
        })
      }

      for(const webhookToRegisterIndex in webhooksToRegister){
        const webhookToRegister = webhooksToRegister[webhookToRegisterIndex]
        webhookToRegister.targetUrl = process.env.HOST + webhookToRegister.targetUrl
        await webhookClient.registerWebhook(webhookToRegister)
        logger.info("APP STARTUP: 3RD PARTY WEBHOOKS", {
          service: SERVICE_TITLE,
          action: `Registered ${webhookToRegister.topic}`
        })
      }

      if(!webhooksToDelete.length && !webhooksToRegister.length){
        logger.info("APP STARTUP: 3RD PARTY WEBHOOKS", {
          service: SERVICE_TITLE,
          action: 'No action required'
        })
      }

      logger.info("APP STARTUP: 3RD PARTY WEBHOOKS", {
        service: SERVICE_TITLE,
        action: "Sync Complete"
      })
    }
  }
}

webhookManager.sync()

cron.schedule('0 0 * * *', () => {
  logger.info("APP CRON: PERFORMING WEBHOOK HEALTH CHECK")
  webhookManager.sync()
});
