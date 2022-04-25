import { client } from "../db.js";

export async function emailAvailable(email: string) {
  const unavailable = await client.users.findUnique({
    where: {
      email: email,
    },
    select: {
      email: true,
    },
  });

  if (unavailable) {
    throw { type: "conflict" };
  }
}

export async function signUp(email: string, password: string) {
  await client.users.create({
    data: {
      email,
      password,
    },
  });
}

export async function findSessionByEmail(email: string) {
  return await client.sessions.findUnique({
    where: {
      userEmail: email,
    },
  });
}
export async function findSessionByToken(token: string) {
  return await client.sessions.findUnique({
    where: {
      token: token,
    },
  });
}

export async function findByEmail(email: string) {
  return await client.users.findUnique({
    where: {
      email: email,
    },
  });
}

export async function newSession(token: string, userEmail: string) {
  return client.sessions.create({
    data: {
      token,
      userEmail,
    },
  });
}

export async function closeSession(token: string) {
  await client.sessions.delete({
    where: {
      token: token,
    },
  });
}
