import { NextFunction, Request, Response } from "express";
import {
  Authorization_Error,
  Not_Found_Error,
  Validation_Error,
} from "./error";
import logger from "../logger/pino";

export const HandleErrorWithLogger = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let reportError = true;
  let status = 500;
  let data = error.message;

  // skip common / known errors
  [Not_Found_Error, Validation_Error, Authorization_Error].forEach(
    (errorType) => {
      if (error instanceof errorType) {
        reportError = false;
        status = error.status;
        data = error.message;
      }
    },
  );

  if (reportError) {
    // error reporting tools
    logger.error(error);
  } else {
    // ignore common errors caused by users
    logger.warn(error);
  }

  return res.status(status).json(data);
};

export const HandleUncaughtException = async (error: Error) => {
  logger.error(error);
  process.exit(1);
};
