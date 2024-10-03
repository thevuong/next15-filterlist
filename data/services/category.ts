import 'server-only';

import { cookies } from 'next/headers';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export async function getCategoriesMap() {
  console.log('getCategoriesMap');

  await cookies();
  await slow(1500);

  const categories = await prisma.category.findMany();
  return categories.reduce(
    (acc, category) => {
      acc[category.id] = category;
      return acc;
    },
    {} as Record<string, (typeof categories)[0]>,
  );
}
