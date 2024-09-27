import React, { Suspense } from 'react';
import DataComponent from '@/components/DataComponent';

export const experimental_ppr = true;

export default async function Home() {
  return (
    <div>
      Home STATIC
      <Suspense fallback={<div>Loading...</div>}>
        <DataComponent />
      </Suspense>
    </div>
  );
}
