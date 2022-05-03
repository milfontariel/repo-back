import { Request, Response } from "express";
import * as teacherService from "../services/teacherService.js";
import * as authService from "../services/authService.js";

export async function findByDisciplineId(req: Request, res: Response) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    throw { type: "unauthorized" };
  }
  await authService.validateToken(token);
  const id: number = parseInt(req.params.id);
  if (!id) {
    throw { type: "invalid_data" };
  }
  const teachers = await teacherService.findByDisciplineId(id);
  res.send({ teachers });
}
