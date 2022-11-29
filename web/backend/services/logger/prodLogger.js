import dotenv from 'dotenv'
dotenv.config()

import { Logtail } from "@logtail/node";
import { LogtailTransport } from "@logtail/winston";
import winston from 'winston'

const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN);

const logger = winston.createLogger({
  transports: [new LogtailTransport(logtail)],
});

export default logger