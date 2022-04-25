import jwt from "jsonwebtoken";
import * as testsRepository from "../repositories/testsRepository.js";

export async function get() {
  const data = await testsRepository.getTests();
  return data;
}
