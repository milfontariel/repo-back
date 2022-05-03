import { Tests } from "@prisma/client";
import { Request, Response } from "express";
import testsSchema from "../schemas/testsSchema.js";
import * as authService from "../services/authService.js";
import * as testsService from "../services/testsService.js";

export async function get(req: Request, res: Response) {
  const authorization = req.headers.authorization;
  const { search } = req.query;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    throw { type: "unauthorized" };
  }
  let searchStr = "";
  if (search) {
    searchStr = search.toString();
  }
  await authService.validateToken(token);
  const data = await testsService.get(searchStr);
  res.send(data);
}

export async function view(req: Request, res: Response) {
  const { id } = req.params;
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    throw { type: "unauthorized" };
  }
  if (!id) {
    throw { type: "invalid_data" };
  }
  await authService.validateToken(token);
  await testsService.view(id);
  res.sendStatus(204);
}

export type PostTest = Omit<Tests, "id">;
export async function post(req: Request, res: Response) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    throw { type: "unauthorized" };
  }
  await authService.validateToken(token);
  const data: PostTest = req.body;
  const validation = testsSchema.validate(data);
  if (validation.error) {
    throw {
      type: "invalid_data",
      message: validation.error.details[0].message,
    };
  }
  await testsService.post(data);

  res.sendStatus(201);
}
