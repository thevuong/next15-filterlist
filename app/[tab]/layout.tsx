import React, { Suspense } from 'react';
import CategoryFilter from '@/components/CategoryFilter';
import ProjectInfo from '@/components/ProjectInfo';
import Search, { SearchSkeleton } from '@/components/Search';
import Tabs, { TabsSkeleton } from '@/components/tabs/Tabs';
import Skeleton from '@/components/ui/Skeleton';
import ToggleButton from '@/components/ui/ToggleButton';
import { getCategoriesMap } from '@/data/services/category';
import { getTaskSummary } from '@/data/services/task';

export default async function TabsLayout({ children }: { children: React.ReactNode }) {
  const categories = getCategoriesMap();
  const taskSummary = getTaskSummary();

  return (
    <div className="group flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <h1>Project information</h1>
        <ProjectInfo />
      </div>
      <div className="flex flex-col gap-6">
        <h2>Task list</h2>
        <Suspense fallback={<TabsSkeleton />}>
          <Tabs taskSummaryPromise={taskSummary} />
        </Suspense>
      </div>
      <div className="h-[1px] bg-primary" />
      <Suspense fallback={<SearchSkeleton />}>
        <Search />
      </Suspense>
      <Suspense fallback={<ToggleButton disabled>Loading...</ToggleButton>}>
        <CategoryFilter categoriesPromise={categories} />
      </Suspense>
      <Suspense fallback={<Skeleton />}>{children}</Suspense>
    </div>
  );
}
