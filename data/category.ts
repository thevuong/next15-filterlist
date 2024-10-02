import 'server-only';

import { unstable_noStore } from 'next/cache';
import { cache } from 'react';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import { cookies } from 'next/headers';

export const getCategories = cache(async () => {
  console.log('getCategories');

  cookies();
  await slow();

  return prisma.category.findMany();
});

export async function getCategoriesMap() {
  console.log('getCategoriesMap');

  const categories = await getCategories();
  return categories.reduce(
    (acc, category) => {
      acc[category.id] = category;
      return acc;
    },
    {} as Record<string, (typeof categories)[0]>,
  );
}
