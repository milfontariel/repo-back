import { PostTest } from "../controllers/testsController.js";
import { client } from "../db.js";

export async function post(test: PostTest) {
  await client.tests.create({
    data: test,
  });
}

export async function view(id) {
  await client.tests.update({
    where: { id: id },
    data: {
      views: {
        increment: 1,
      },
    },
  });
}

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
              teacherDiscipline: {
                discipline: {
                  id: "desc",
                },
              },
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

export async function getTests(search: string) {
  return await client.tests.findMany({
    where: {
      OR: [
        {
          teacherDiscipline: {
            discipline: {
              name: {
                startsWith: search,
                mode: "insensitive",
              },
            },
          },
        },
        {
          teacherDiscipline: {
            teacher: {
              name: {
                startsWith: search,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    },
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
