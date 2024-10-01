import React from 'react';
import { slow } from '@/utils/slow';

export default async function StaticData() {
  const data = fetch('https://jsonplaceholder.typicode.com/posts').then(async res => {
    await slow(700);
    console.log('Static data fetched');
    res.json();
  });

  return (
    <div className="bg-blue-500 p-4 text-white">
      Statisk data
      {data.toString()}
    </div>
  );
}
