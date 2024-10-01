import { unstable_noStore } from 'next/cache';
import React from 'react';
import { slow } from '@/utils/slow';

export default async function StaticData() {
  unstable_noStore();
  await slow();
  console.log('StaticData');

  return (
    <div className="bg-blue-500 p-4 text-white">
      Statisk data
      {/* {data[0].id} */}
    </div>
  );
}
