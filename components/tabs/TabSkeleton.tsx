import React from 'react';
import Skeleton from '../ui/Skeleton';

export function TabsSkeleton() {
  return (
    <div className="flex gap-6 overflow-auto">
      <Skeleton className="h-[169px] sm:h-48" />
      <Skeleton className="h-[169px] sm:h-48" />
      <Skeleton className="h-[169px] sm:h-48" />
    </div>
  );
}
