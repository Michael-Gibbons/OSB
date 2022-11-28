import { PrismaClient } from '@prisma/client'
import logger from '../services/logger/index.js';

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});

prisma.$on("query", async (e) => {
  logger.info('DATABASE QUERY', {...e})
});

prisma.$on("error", async (e) => {
  logger.error('DATABASE ERROR', {...e})
});

prisma.$on("warn", async (e) => {
  logger.warn('DATABASE WARNING', {...e})
});

prisma.$on("info", async (e) => {
  logger.info('DATABASE INFO', {...e})
});


export default prisma