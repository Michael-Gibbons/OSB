import { Queue, Worker, QueueEvents } from 'bullmq'
import REDIS_CONFIG from "../config.js"

const NAME = 'example'
const queueEvents = new QueueEvents(NAME, REDIS_CONFIG)
const exampleQueue = new Queue(NAME, REDIS_CONFIG)

new Worker(NAME, async ( job ) => {
  // Optionally report some progress
  await job.updateProgress(42);

  // Optionally sending an object as progress
  await job.updateProgress({ foo: 'bar' });

  // Do something with job
  return 'some value';
}, REDIS_CONFIG);

queueEvents.on('progress', ({ jobId, data }) => {
  // jobId received a progress event
});

queueEvents.on('completed', ({ jobId, returnvalue }) => {
  // Called every time a job is completed in any worker.
});

queueEvents.on('failed', ({ jobId, failedReason }) => {
  // Job has failed with a *known* error, ie you know what's going on and the error is unresolvable or out of your control.
  // example: if(!myCondition){ throw 'You're outta luck bud.' }
});

queueEvents.on('error', err => {
  // Job has failed with a *unknown* error, ie you don't know what's going on and the error is likely resolvable.
  // example: if(job.IDontExist), syntax error property IDontExist is undefined
});

export {
  exampleQueue // use this export to add jobs to the queue
}