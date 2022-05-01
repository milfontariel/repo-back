import { client } from "../db.js";

export async function findAll() {
  return client.disciplines.findMany();
}
