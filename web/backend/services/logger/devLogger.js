import dotenv from "dotenv";
dotenv.config();

import chalk from "chalk";
import JSONChalkify from "json-chalkify";

import { createLogger, format, transports } from "winston";
const { combine, timestamp, prettyPrint, colorize, printf, metadata } = format;

import winston from 'winston'

const myFormat = printf(({ level, message, timestamp, metadata }) => {
  let chalkify = new JSONChalkify().chalkify

  if(level.includes('error')){
    chalkify = new JSONChalkify({propertyColor: chalk.red}).chalkify
  }

  if(level.includes('warn')){
    chalkify = new JSONChalkify({propertyColor: chalk.yellow}).chalkify
  }

  if(level.includes('info')){
    chalkify = new JSONChalkify({propertyColor: chalk.green}).chalkify;
  }

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