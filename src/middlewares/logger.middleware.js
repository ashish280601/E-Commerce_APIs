/*
Logger middleware is used to log user request so it can help to find an error in an production or deployment level 
*/
// 1. Import file system
import fs from "fs";
import winston, { transports } from "winston";

const fsPromise = fs.promises;

// 2. Create a function file to store a log every request of an client.
// Method 1: Using File System
async function log(logData) {
  try {
    logData = `\n ${new Date().toString()} - ${logData}`;
    await fsPromise.appendFile("log.txt", logData);
  } catch (error) {
    console.log(error);
  }
}

// Method 2: Using an winston library
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'request-logging' },
  transports: [
    new winston.transports.File({filename: 'log.txt'})
  ]
})

// creating a middleware function
const loggerMiddleware = async (req, res, next) => {
  // 1. Log request body
  if (!req.url.includes("signin")) {
    const logData = `${req.url} - ${JSON.stringify(req.body)}`;
    // await log(logData);
    logger.info(logData);
  }
  next();
};   

export default loggerMiddleware;