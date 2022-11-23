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
  console.log(jobId, data)
});

queueEvents.on('completed', ({ jobId, returnvalue }) => {
  // Called every time a job is completed in any worker.
  console.log(jobId, returnvalue)
});

queueEvents.on('failed', ({ jobId, failedReason }) => {
  // Job has failed with a *known* error, ie you know what's going on and the error is unresolvable or out of your control.
  // example: if(!myCondition){ throw 'You're outta luck bud.' }
});

queueEvents.on('error', err => {
  // Job has failed with a *unknown* error, ie you don't know what's going on and the error is likely resolvable.
  // example: if(job.IDontExist), syntax error property IDontExist is undefined
  console.error(err);
});

/* examples of adding jobs to queue

  await myQueue.add('name', { myData: 42 });
  await queue.addBulk([
    { name, data: { paint: 'car' } },
    { name, data: { paint: 'house' } },
    { name, data: { paint: 'boat' } },
  ])

*/

export {
  exampleQueue // use this export to add jobs to the queue
}