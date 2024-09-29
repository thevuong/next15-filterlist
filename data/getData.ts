import { cookies } from 'next/headers';
import { cache } from 'react';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export const getData = cache(async () => {
  console.log('getData');
  await slow(2000);

  cookies();

  return prisma.message.findMany();
});

export async function getDataOverview() {
  const data = await getData();

  return data;
}

export async function getOtherData() {
  console.log('getOtherData');
  await slow();

  cookies();

  return prisma.message.findMany();
}

export async function getStaticData() {
  console.log('getStaticData');
  await slow(500);

  return prisma.message.findMany();
}
