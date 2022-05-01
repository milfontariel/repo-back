import { PostTest } from "../controllers/testsController.js";
import * as testsRepository from "../repositories/testsRepository.js";

export async function get(search: string) {
  const data = await testsRepository.getTests(search);
  const disciplines = await testsRepository.getDisciplines();
  return [data, disciplines];
}

export async function view(id: string) {
  const testId: number = parseInt(id);
  await testsRepository.view(testId);
}

export async function post(test: PostTest) {
  await testsRepository.post(test);
}
