import { Request, Response } from "express";
import * as disciplineService from "../services/disciplineRepository.js";

export async function findAll(req: Request, res: Response) {
  const disciplines = await disciplineService.findAll();
  res.send({ disciplines });
}
