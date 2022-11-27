import dotenv from "dotenv";
dotenv.config();

import chalk from "chalk";
import JSONChalkify from "json-chalkify";
import fs from 'fs'

const chalkify = new JSONChalkify().chalkify;

import { createLogger, format, transports } from "winston";
const { combine, timestamp, prettyPrint, colorize, printf, metadata } = format;

import winston from 'winston'

const myFormat = printf(({ level, message, timestamp, metadata }) => {
  const hasMetaData = Object.keys(metadata).length !== 0;
  const timestampDate = chalk.gray(timestamp.split(" ")[0]);
  const timestampTime = timestamp.split(" ")[1];

  if (hasMetaData) {
    return chalk.blue(
      `\n[${timestampDate} ${timestampTime}] ${level}: ${message} \n${chalkify(
        metadata
      )}\n`
    );
  }

  return chalk.blue(
    `\n[${timestampDate} ${timestampTime}] ${level}: ${message}\n`
  );
});

const logger = createLogger({
  level: process.env.LOG_LEVEL || "silly",
  format: combine(
    colorize({ all: true }),
    timestamp({ format: "YYYY-MM-DD hh:mm:ss" }),
    prettyPrint(),
    metadata({ fillExcept: ["message", "level", "timestamp", "label"] }),
    myFormat
  ),
  transports: [new winston.transports.File({filename: '../../log.log'})],
});

export default logger;