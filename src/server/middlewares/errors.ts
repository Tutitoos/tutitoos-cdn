import CustomError from "../../lib/CustomError.js";
import Logger from "../../lib/Logger.js";
import type { NextFunction, Request, Response } from "express";

export const notFoundEndpoint = (req: Request, res: Response, next: NextFunction) => {
  const customError = new CustomError(`Endpoint not found (${req.url})`, "Endpoint not found", 404);

  next(customError);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  const publicMessage = error.publicMessage || "Internal error";

  Logger.error(`There was an status ${statusCode} and error ${error.message}`);

  res.render("error", {
    title: "Server Error",
    code: statusCode,
    message: publicMessage,
  });
};
