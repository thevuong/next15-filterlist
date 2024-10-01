import 'server-only';

import { unstable_noStore } from 'next/cache';
import { cache } from 'react';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export const getCategories = cache(async () => {
  console.log('getCategories');

  unstable_noStore();
  await slow();

  return prisma.category.findMany();
});
