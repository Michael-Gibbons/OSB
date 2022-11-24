import { createBullBoard } from'@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter.js';
import { ExpressAdapter } from '@bull-board/express';
import * as AllQueues from '../redis/index.js'

// serverAdapter.getRouter() returns express middleware
const buildBullBoard = (path) => {
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath(path);

  const allQueuesWithAdapter = []
  for (const queue in AllQueues) {
    if (Object.hasOwnProperty.call(AllQueues, queue)) {
      allQueuesWithAdapter.push(new BullMQAdapter(AllQueues[queue]))
    }
  }

  createBullBoard({
    queues: allQueuesWithAdapter,
    serverAdapter: serverAdapter,
  });

  return serverAdapter.getRouter()
}

export default buildBullBoard