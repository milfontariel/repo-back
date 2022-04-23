import { NextFunction, Request, Response } from "express";

export function handleError(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let code: number = 500;
  let message: string = error.message ? error.message : error.type;
  switch (error.type) {
    case "bad_request":
      code = 400;
      break;
    case "unauthorized":
      code = 401;
      break;
    case "not_found":
      code = 404;
      break;
    case "conflict":
      code = 409;
      break;
    case "invalid_data":
      code = 422;
      break;
    case "token_expired":
      code = 498;
      break;
    default:
      break;
  }
  if (code === 500) {
    return res.sendStatus(500);
  }
  return res.status(code).send(message);
}
