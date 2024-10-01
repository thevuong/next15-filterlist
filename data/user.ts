import 'server-only';

import { cache } from 'react';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export const getCurrentUser = cache(async () => {
  console.log('getUser');

  await slow(500);

  const users = await prisma.user.findMany();
  return users[0];
});
