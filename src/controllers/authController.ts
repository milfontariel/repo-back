import { Request, Response } from "express";
import signUpSchema from "../schemas/signUpSchema.js";
import signInSchema from "../schemas/singInSchema.js";
import * as authService from "../services/authService.js";

export type SignData = {
  email: string;
  password: string;
};

export async function signUp(req: Request, res: Response) {
  const { email, password }: SignData = req.body;

  const validation = signUpSchema.validate(req.body);
  if (validation.error) {
    throw {
      type: "invalid_data",
      message: validation.error.details[0].message,
    };
  }

  await authService.signUp(email, password);
  res.sendStatus(201);
}

export async function singIn(req: Request, res: Response) {
  const { email, password }: SignData = req.body;
  const validation = signInSchema.validate(req.body);
  if (validation.error) {
    throw {
      type: "invalid_data",
      message: validation.error.details[0].message,
    };
  }
  const token = await authService.signIn(email, password);

  res.send(token);
}

export type SessionsData = {
  userAuth: string;
};

export async function logOut(req: Request, res: Response) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    throw { type: "invalid_data" };
  }

  await authService.validateToken(token);
  await authService.logOut(token);
  res.sendStatus(200);
}
