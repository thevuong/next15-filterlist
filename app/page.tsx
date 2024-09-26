import { prisma } from '@/db';
import React from 'react';

export default async function Home() {
  const data = await prisma.message.findMany();

  return <div>Home{data[0].content}</div>;
}
