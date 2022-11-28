import * as AllQueues from '../index.js'
import { QueueEvents } from 'bullmq';
import REDIS_CONFIG from '../config.js';
import logger from '../../services/logger/index.js'

export default function logAllQueues(){
  for (const queue in AllQueues) {
    if (Object.hasOwnProperty.call(AllQueues, queue)) {
      const queueName = AllQueues[queue].name;
      const queueEvents = new QueueEvents(queueName, REDIS_CONFIG)

      queueEvents.on('progress', async ({ jobId }) => {
        // jobId received a progress event

        const job = await AllQueues[queue].getJob(jobId.toString())
        const jobName = job.name
        const jobProgress = job.progress
        const data = {
          queueName,
          jobName,
          jobId,
          jobProgress,
          ...job.data,
        }

        logger.info(`JOB PROGESS: ${queueName}`, data)
      });

      queueEvents.on('completed', async ({ jobId, returnvalue }) => {
        // Called every time a job is completed in any worker.
        const job = await AllQueues[queue].getJob(jobId.toString())
        const jobName = job.name
        const data = {
          queueName,
          jobName,
          jobId,
          returnvalue,
          ...job.data
        }

        logger.info(`JOB COMPLETED: ${queueName}`, data)
      });

      queueEvents.on('failed', async ({ jobId, failedReason }) => {
        // Job has failed with a *known* error, ie you know what's going on and the error is unresolvable or out of your control.
        // example: if(!myCondition){ throw 'You're outta luck bud.' }
        const job = await AllQueues[queue].getJob(jobId.toString())
        const jobName = job.name
        const data = {
          queueName,
          jobName,
          jobId,
          failedReason,
          stack: new Error().stack,
          ...job.data
        }

        logger.error(`JOB FAILED: ${queueName}`, data)
      });

      queueEvents.on('error', err => {
        // Job has failed with a *unknown* error, ie you don't know what's going on and the error is likely resolvable.
        // example: if(job.IDontExist), syntax error property IDontExist is undefined
        const data = {
          queueName,
          err,
          stack: new Error().stack
        }

        logger.error(`JOB ERROR: ${queueName}`, data)
      });
    }
  }
}