import React, { Suspense } from 'react';
import { getDataOverview, getOtherData } from '@/data/getData';
import Tabs from './Tabs';
import Skeleton from './ui/Skeleton';

export default async function DataComponent() {
  // const dataOverview = await getDataOverview();
  // const otherData = await getOtherData();

  // const [dataOverview, otherData] = await Promise.all([getDataOverview(), getOtherData()]);

  const dataOverview = getDataOverview();
  const otherData = await getOtherData();

  return (
    <>
      <div className="flex flex-col gap-2 bg-red-500 p-4 text-white">
        <span>Dynamisk data {otherData[0].id}</span>
        <Suspense fallback={<Skeleton />}>
          Oppsummert data for hver tab
          <Tabs dataPromise={dataOverview} />
        </Suspense>
      </div>
    </>
  );
}
