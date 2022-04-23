import { Request, Response } from "express";
import signUpSchema from "../schemas/signUpSchema.js";
import signInSchema from "../schemas/singInSchema.js";
import * as authService from "../services/authService.js";

export async function signUp(req: Request, res: Response) {
  const { email, password, repeatPassword } = req.body;

  const validation = signUpSchema.validate(req.body);
  if (validation.error || password !== repeatPassword) {
    throw { type: "invalid_data" };
  }

  await authService.signUp(email, password);
  res.sendStatus(201);
}

export async function singIn(req: Request, res: Response) {
  const { email, password } = req.body;
  const validation = signInSchema.validate(req.body);
  if (validation.error) {
    throw { type: "invalid_data" };
  }

  const token = await authService.signIn(email, password);
  res.status(200).send(token);
}
