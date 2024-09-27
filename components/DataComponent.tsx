import React, { Suspense } from 'react';
import { getOtherData } from '@/data/getData';
import Tabs from './Tabs';

export default async function DataComponent() {
  const otherData = await getOtherData();
  const dataOverview = getOtherData();

  return (
    <>
      <div className="flex flex-col gap-2 bg-red-500 p-4 text-white">
        <span>Dynamisk data {otherData[0].id}</span>
        <Suspense fallback={<div>Loading...</div>}>
          Oppsummert data for hver tab
          <Tabs dataPromise={dataOverview} />
        </Suspense>
      </div>
    </>
  );
}
