import * as teacherRepository from "../repositories/teachersRepository.js";

export async function findByDisciplineId(discipline: number) {
  return teacherRepository.findByDisciplineId(discipline);
}
