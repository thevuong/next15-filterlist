import { cookies } from 'next/headers';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export async function getData() {
  await slow();

  cookies();

  return prisma.message.findMany();
}
