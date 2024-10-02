import './globals.css';

// eslint-disable-next-line import/no-unresolved
import { GeistSans } from 'geist/font/sans';
import { Suspense } from 'react';
import CategoryFilter from '@/components/CategoryFilter';
import LoadTimeTracker from '@/components/LoadTimeTracker';
import ProjectInfo, { ProjectInfoSkeleton } from '@/components/ProjectInfo';

import Search, { SearchSkeleton } from '@/components/Search';
import Tabs, { TabsSkeleton } from '@/components/tabs/Tabs';
import Skeleton from '@/components/ui/Skeleton';
import ToggleButton from '@/components/ui/ToggleButton';
import { getCategoriesMap } from '@/data/category';
import { getTodosOverview } from '@/data/todo';
import { cn } from '@/utils/cn';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'Next.js 15 Filter List',
  title: 'Next.js 15 filtering list example using modern React features',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // const todosOverview = await getTodosOverview();
  // const categories = await getCategoriesMap();

  // const [todosOverview, categories] = await Promise.all([getTodosOverview(), getCategoriesMap()]);

  const categories = getCategoriesMap();
  const todosOverview = getTodosOverview();

  return (
    <html lang="en">
      <body className={cn(GeistSans.className, 'flex flex-col px-4 py-16 sm:px-16 xl:px-48 2xl:px-96')}>
        <div className="group flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h1>Project information</h1>
            <Suspense fallback={<ProjectInfoSkeleton />}>
              <ProjectInfo />
            </Suspense>
          </div>
          <div className="flex flex-col gap-6">
            <h2>Task list</h2>
            <Suspense fallback={<TabsSkeleton />}>
              <Tabs todosOverviewPromise={todosOverview} />
            </Suspense>
          </div>
          <div className="bg-gray h-[1px]" />
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
          <Suspense fallback={<ToggleButton disabled>Loading...</ToggleButton>}>
            <CategoryFilter categoriesPromise={categories} />
          </Suspense>
          <Suspense fallback={<Skeleton />}>{children}</Suspense>
        </div>
        <LoadTimeTracker />
      </body>
    </html>
  );
}
