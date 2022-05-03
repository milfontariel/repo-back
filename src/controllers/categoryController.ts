import { Request, Response } from "express";
import * as categoryService from "../services/categoryService.js";
import * as authService from "../services/authService.js";

export async function findAll(req: Request, res: Response) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    throw { type: "unauthorized" };
  }
  await authService.validateToken(token);
  const categories = await categoryService.findAll();
  res.send({ categories });
}
