import { client } from "../db.js";

export async function getTests() {
  return await client.tests.findMany({
    orderBy: {
      categoryId: "asc",
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      teacherDiscipline: {
        select: {
          teacher: {
            select: {
              name: true,
            },
          },
          discipline: {
            select: {
              name: true,
              term: {
                select: {
                  number: true,
                },
              },
            },
          },
        },
      },
    },
  });
}
