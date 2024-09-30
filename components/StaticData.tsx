import React from 'react';

export default async function StaticData() {
  await new Promise(() => {
    setTimeout(() => {}, 1000);
  });
  console.log('StaticData');

  return (
    <div className="bg-blue-500 p-4 text-white">
      Statisk data
      {/* {data[0].id} */}
    </div>
  );
}
