import * as AllQueues from './index.js'
import { QueueEvents } from 'bullmq';
import REDIS_CONFIG from './config.js';
import logger from '../services/logger/index.js'

export default function logAllQueues(){
  for (const queue in AllQueues) {
    if (Object.hasOwnProperty.call(AllQueues, queue)) {
      const queueName = AllQueues[queue].name;
      const queueEvents = new QueueEvents(queueName, REDIS_CONFIG)

      queueEvents.on('progress', ({ jobId, data }) => {
        // jobId received a progress event
        logger.info(`JOB PROGESS: ${queueName}`, { name: queueName, jobId, data })
      });

      queueEvents.on('completed', ({ jobId, returnvalue }) => {
        // Called every time a job is completed in any worker.
        logger.info(`JOB COMPLETED: ${queueName}`, { name: queueName, jobId, returnvalue })
      });

      queueEvents.on('failed', ({ jobId, failedReason }) => {
        // Job has failed with a *known* error, ie you know what's going on and the error is unresolvable or out of your control.
        // example: if(!myCondition){ throw 'You're outta luck bud.' }
        logger.error(`JOB FAILED: ${queueName}`, {name: queueName, jobId, failedReason})
      });

      queueEvents.on('error', err => {
        // Job has failed with a *unknown* error, ie you don't know what's going on and the error is likely resolvable.
        // example: if(job.IDontExist), syntax error property IDontExist is undefined
        logger.error(`JOB ERROR: ${queueName}`, {name: queueName, err})
      });
    }
  }
}