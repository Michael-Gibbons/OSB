import dotenv from "dotenv";
dotenv.config();

import winston from "winston";
import CloudWatchTransport from "winston-aws-cloudwatch";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "silly",
  format: winston.format.json(),
  transports: [
    new CloudWatchTransport({
      logGroupName: process.env.AWS_LOG_GROUP_NAME, // REQUIRED
      logStreamName: process.env.NODE_ENV, // REQUIRED
      createLogGroup: true,
      createLogStream: true,
      submissionInterval: 2000,
      submissionRetryCount: 1,
      batchSize: 20,
      awsConfig: {
        accessKeyId: process.env.AWS_CLOUDWATCH_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_CLOUDWATCH_SECRET,
        region: process.env.AWS_REGION,
      },
    }),
  ],
});

export default logger;
