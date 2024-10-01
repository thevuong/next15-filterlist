import 'server-only';

import { unstable_noStore } from 'next/cache';
import { cache } from 'react';
import { prisma } from '@/db';
import type { TodosOverview, TodoStatus } from '@/types/todo';
import { slow } from '@/utils/slow';
import { getCategoriesMap } from './category';

export const getTodos = cache(async (filter?: { q?: string; status?: TodoStatus; categories?: number[] }) => {
  console.log('getTodos', filter);

  unstable_noStore();
  await slow(3000);

  return prisma.todo.findMany({
    where: {
      AND: [
        filter?.q
          ? {
              OR: [{ name: { contains: filter.q } }, { description: { contains: filter.q } }],
            }
          : {},
        filter?.status ? { status: filter.status } : {},
        filter?.categories && filter.categories.length > 0 ? { categoryId: { in: filter.categories } } : {},
      ],
    },
  });
});

export async function getTodosOverview(): Promise<TodosOverview> {
  console.log('getTodosOverview');

  await slow(3000);
  unstable_noStore();

  const groupedTodos = await prisma.todo.groupBy({
    _count: {
      id: true,
    },
    by: ['status', 'categoryId'],
  });

  const categoriesMap = await getCategoriesMap();

  return groupedTodos.reduce((acc: TodosOverview, todo) => {
    const status = todo.status as TodoStatus;
    const category = categoriesMap[todo.categoryId];

    if (!acc[status]) {
      acc[status] = {};
    }

    if (!acc[status][category.name]) {
      acc[status][category.name] = {
        color: category.color,
        count: todo._count.id,
      };
    }

    return acc;
  }, {} as TodosOverview);
}
