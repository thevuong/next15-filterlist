import React from 'react';
import Skeleton from '../ui/Skeleton';

export function TabsSkeleton() {
  return (
    <div className="grid w-full grid-cols-3 gap-6">
      <Skeleton className="h-48" />
      <Skeleton className="h-48" />
      <Skeleton className="h-48" />
    </div>
  );
}
