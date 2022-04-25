import { client } from "../db.js";

export async function getDisciplines() {
  return await client.disciplines.findMany({
    include: {
      term: {
        select: {
          number: true,
        },
      },
      teachers: {
        include: {
          tests: {
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
          },
        },
      },
    },
  });
}
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
