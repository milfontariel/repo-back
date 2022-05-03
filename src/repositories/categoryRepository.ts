import { client } from "../db.js";

export async function findAll() {
  return client.categories.findMany();
}

export async function findById(id: number) {
  return client.categories.findUnique({
    where: {
      id: id,
    },
  });
}
