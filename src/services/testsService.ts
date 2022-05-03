import { PostTest } from "../controllers/testsController.js";
import * as testsRepository from "../repositories/testsRepository.js";
import * as categoryRepository from "../repositories/categoryRepository.js";
import * as teachersRepository from "../repositories/teachersRepository.js";

export async function get(search: string) {
  const data = await testsRepository.getTests(search);
  const disciplines = await testsRepository.getDisciplines();
  return [data, disciplines];
}

export async function view(id: string) {
  const testId: number = parseInt(id);
  const test = await testsRepository.verifyTest(testId);
  if (!test) {
    throw { type: "not_found" };
  }
  await testsRepository.view(testId);
}

export async function post(test: PostTest) {
  const verifyCategory = await categoryRepository.findById(test.categoryId);
  const verifyTeacherDiscipline = await teachersRepository.findById(
    test.teacherDisciplineId
  );
  if (!verifyCategory || !verifyTeacherDiscipline) {
    throw { type: "invalid_data" };
  }
  await testsRepository.post(test);
}
