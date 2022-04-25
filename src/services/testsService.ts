import jwt from "jsonwebtoken";
import * as testsRepository from "../repositories/testsRepository.js";

export async function get() {
  const data = await testsRepository.getTests();
  const disciplines = await testsRepository.getDisciplines();
  return [data, disciplines];
}
