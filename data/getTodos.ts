import 'server-only';

import { unstable_noStore } from 'next/cache';
import { cache } from 'react';
import { prisma } from '@/db';
import type { TodosOverview, TodoStatus } from '@/types/todo';
import { slow } from '@/utils/slow';
import { getCategories } from './getCategories';

export const getTodos = cache(async (filter?: { q?: string; status?: TodoStatus }) => {
  console.log('getTodos', filter);

  unstable_noStore();
  await slow(2000);

  return prisma.todo.findMany({
    where: {
      AND: [
        filter?.q
          ? {
              OR: [{ name: { contains: filter.q } }, { description: { contains: filter.q } }],
            }
          : {},
        filter?.status ? { status: filter.status } : {},
      ],
    },
  });
});

// TODO: should be using the db directly! as long as cache() is being used somewhere.
export async function getTodosOverview(): Promise<TodosOverview> {
  console.log('getTodosOverview');

  const todos = await getTodos(); // not rerun
  const categories = await getCategories(); // not rerun
  const categoryMap = categories.reduce((acc: Record<string, (typeof categories)[0]>, category) => {
    acc[category.id] = category;
    return acc;
  }, {});

  return todos.reduce(
    (acc, todo) => {
      const status = todo.status as TodoStatus;
      const category = categoryMap[todo.categoryId];
      if (!acc[status]) {
        acc[status] = {};
      }

      if (!acc[status][category.name]) {
        acc[status][category.name] = { color: category.color, count: 0 };
      }
      acc[status][category.name].count += 1;
      return acc;
    },
    {} as Record<TodoStatus, Record<string, { count: number; color: string }>>,
  );
}
