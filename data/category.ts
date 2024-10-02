import 'server-only';

import { cookies } from 'next/headers';
import { cache } from 'react';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export const getCategoriesMap = cache(async () => {
  console.log('getCategoriesMap');

  cookies();
  await slow(1500);

  const categories = await prisma.category.findMany();
  return categories.reduce(
    (acc, category) => {
      acc[category.id] = category;
      return acc;
    },
    {} as Record<string, (typeof categories)[0]>,
  );
});
