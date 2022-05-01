import * as disciplineRepository from "../repositories/disciplineRepository.js";

export async function findAll() {
  return disciplineRepository.findAll();
}
