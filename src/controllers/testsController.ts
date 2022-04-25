import { Request, Response } from "express";
import * as authService from "../services/authService.js";
import * as testsService from "../services/testsService.js";

export async function get(req: Request, res: Response) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    throw { type: "unauthorized" };
  }
  await authService.validateToken(token);
  const data = await testsService.get();
  res.send(data);
}
