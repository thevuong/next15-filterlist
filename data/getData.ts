import { cookies } from 'next/headers';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export async function getData(delay?: number) {
  await slow(delay);

  cookies();

  return prisma.message.findMany();
}
