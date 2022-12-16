# Redis

As your application grows, especially for important clients, redis is **essential**.

Using redis, you are able to respond to webhooks in a consistent time-frame, ensure all actions are completed at least once, and organize queues and workers.

Imagine you are performing some sort of action on a webhook, and depending on the data in that webhook different actions need to happen. Those actions can take a variable amount of time, if you have a particularly heavy operation to perform its possible the webhook server will time out waiting for a response from your application.

Moreover imagine there is a bug in your code, all the data from the webhooks that fire in the interim period between you finding, diagnosing, and fixing the bug are now lost to the void. Redis allows you to capture this data, store it in cache, and process it at a later time.

## Dependencies

This template uses the very popular package [bullmq](https://docs.bullmq.io/) to create and manage its queues and workers.

!> Visualizing your queues can be a bit tricky, which is why I did it for you. This template uses [bull-board](https://github.com/felixmosh/bull-board#readme) to provide a UI for your queues and jobs. You can access this at `YOUR_APP_URL/api/admin/queues`

## Quacks

Organizing all your queues and workers can be difficult. I've developed a bullmq file convention to help organize them called Quacks.

(Q)uickly (U)nderstood (A)nd (C)opyable (K)nowledge

Inspired by the [Redux Ducks Pattern](https://medium.com/@matthew.holman/what-is-redux-ducks-46bcb1ad04b7) the ideology is simple.

Have the queue, worker, events, and event handlers all in the same file. Please see `web/backend/redis/quacks/exampleQuack.js` for an example


?> Speaking of redux, where is it? It was intentionally left out of this boiler as it does not have much use in the context of shopify apps which rely heavily on server side state and interactions with various APIs. Feel free to add it in yourself, I did in v1 of OSB, and I regretted it. You have been warned.