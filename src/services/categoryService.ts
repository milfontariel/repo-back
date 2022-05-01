import * as categoryRepository from "../repositories/categoryRepository.js";

export async function findAll() {
  return categoryRepository.findAll();
}
