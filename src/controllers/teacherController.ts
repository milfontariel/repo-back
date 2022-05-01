import { Request, Response } from "express";
import * as teacherService from "../services/teacherService.js";

export async function findByDisciplineId(req: Request, res: Response) {
  const id: number = parseInt(req.params.id);
  if (!id) {
    throw { type: "invalid_data" };
  }
  const teachers = await teacherService.findByDisciplineId(id);
  res.send({ teachers });
}
