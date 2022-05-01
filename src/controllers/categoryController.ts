import { Request, Response } from "express";
import * as categoryService from "../services/categoryService.js";

export async function findAll(req: Request, res: Response) {
  const categories = await categoryService.findAll();
  res.send({ categories });
}
