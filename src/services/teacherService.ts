import * as teacherRepository from "../repositories/teachersRepository.js";

export async function findByDisciplineId(discipline: number) {
  const verifyTeacher = teacherRepository.findById(discipline);
  if (!verifyTeacher) {
    throw { type: "not_found" };
  }
  return teacherRepository.findByDisciplineId(discipline);
}
