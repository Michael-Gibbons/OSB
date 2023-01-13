const exampleWebhookClient = {
  serviceTitle: 'Example Service',
  topicKey: 'topic',
  idKey: 'id',
  targetUrlKey: 'address',
  subscriptions: [
    {
      topic: 'some/topic',
      targetUrl: '/webhooks/exampleClient/some-topic',
      customData: 42,
    },
    {
      topic: 'any/thing',
      targetUrl: '/webhooks/exampleClient/any-thing',// handle these routes in express
      customData: 42,
    }
  ],
  getWebhooks: () => {
    // implement get all
  },
  deleteWebhook: ({ id }) => {
    // implement delete
  },
  registerWebhook: ({ topic, targetUrl, customData }) => {
    //implement register
  },
  middleware: [
    ({ subscription, currentWebhooks, webhooksToRegister, webhooksToDelete }) => {}
  ]

}

export {
  exampleWebhookClient
}