import { client } from "../db.js";

export async function findByDisciplineId(discipline: number) {
  return client.teachersDisciplines.findMany({
    where: {
      disciplineId: discipline,
    },
    include: {
      teacher: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}
