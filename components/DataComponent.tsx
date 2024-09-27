import React from 'react';
import { getData } from '@/data/getData';
import Tabs from './Tabs';

export default async function DataComponent() {
  const data = await getData();

  return (
    <>
      <div className="bg-red-500 p-4 text-white">DYNAMIC {data[0].id}</div>
      Oppsummert data for hver tab
      <Tabs data={data} />
    </>
  );
}
