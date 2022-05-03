import { Request, Response } from "express";
import * as disciplineService from "../services/disciplineRepository.js";
import * as authService from "../services/authService.js";

export async function findAll(req: Request, res: Response) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    throw { type: "unauthorized" };
  }
  await authService.validateToken(token);
  const disciplines = await disciplineService.findAll();
  res.send({ disciplines });
}
