import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as authRepository from "../repositories/authRepository.js";

export async function signUp(email: string, UnencryptedPassword: string) {
  const password: string = bcrypt.hashSync(UnencryptedPassword, 10);
  await authRepository.emailAvailable(email);
  await authRepository.signUp(email, password);
}

export async function signIn(email: string, password: string) {
  const user = await authRepository.findByEmail(email);
  let token: string = "";
  if (!user) {
    throw {
      type: "conflict",
      message: "E-mail não corresponde a nenhum usuário",
    };
  }
  const session = await authRepository.findSession(user.email);
  if (session) {
    token = session.token;
  } else {
    const key = process.env.JWT_SECRET;
    token = jwt.sign({ userId: user.id, userEmail: user.email }, key);
    await authRepository.newSession(token, user.email);
  }
  return token;
}
