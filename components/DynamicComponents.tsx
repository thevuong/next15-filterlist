import React, { Suspense } from 'react';
import DynamicData from './DynamicData';
import Search from './Search';
import Skeleton from './ui/Skeleton';

type Props = {
  children: React.ReactNode;
};

export default function DynamicComponents({ children }: Props) {
  return (
    <div className="group">
      <Suspense fallback={<Skeleton />}>
        <DynamicData />
      </Suspense>
      <Suspense>
        <Search />
      </Suspense>
      <Suspense fallback={<Skeleton />}>{children}</Suspense>
    </div>
  );
}
