import React from 'react';

import { getStaticData } from '@/data/getData';

export default async function StaticData() {
  const data = await getStaticData();

  return (
    <div className="bg-blue-500 p-4 text-white">
      Statisk data
      {data[0].id}
    </div>
  );
}
