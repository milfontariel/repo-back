import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as authRepository from "../repositories/authRepository.js";
dotenv.config();

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
      type: "unauthorized",
      message: "E-mail informado não está associado a nenhuma conta.",
    };
  }
  if (bcrypt.compareSync(password, user.password)) {
    const session = await authRepository.findSessionByEmail(user.email);
    if (session) {
      token = session.token;
    } else {
      const key = process.env.JWT_SECRET;
      token = jwt.sign({ userId: user.id, userEmail: user.email }, key);
      await authRepository.newSession(token, user.email);
    }
    return token;
  } else {
    throw { type: "unauthorized", message: "Usuário e/ou senha incorretos!" };
  }
}

export async function logOut(token: string) {
  const session = await authRepository.findSessionByToken(token);
  if (!session) {
    throw { type: 498, message: "Sessão já finalizada" };
  }
  await authRepository.closeSession(session.token);
}

export async function validateToken(token: string) {
  const data = jwt.verify(token, process.env.JWT_SECRET);
  if (!data) {
    throw { type: "unauthorized" };
  }
}
