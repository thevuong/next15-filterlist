import './globals.css';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import CategoryFilter from '@/components/CategoryFilter';
import LoadTimeTracker from '@/components/LoadTimeTracker';
import Search from '@/components/Search';
import StaticData from '@/components/StaticData';
import Tabs from '@/components/Tabs';
import Skeleton from '@/components/ui/Skeleton';
import { getCategories } from '@/data/category';
import { getTodosOverview } from '@/data/todo';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Next.js 15 Filter List',
  title: 'Next.js 15 filtering list example using modern React features',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // const todosOverview = await getTodosOverview();
  // const categories = await getCategories();

  // const [todosOverview, categories] = await Promise.all([getTodosOverview(), getCategories()]);

  const categories = getCategories();
  const todosOverview = getTodosOverview();

  return (
    <html lang="en">
      <body className={inter.className}>
        <StaticData />
        <div className="group">
          <Suspense fallback={<Skeleton />}>
            <Tabs todosOverviewPromise={todosOverview} />
          </Suspense>
          <Suspense fallback={<Skeleton />}>
            <CategoryFilter categoriesPromise={categories} />
          </Suspense>
          <Suspense>
            <Search />
          </Suspense>
          <Suspense fallback={<Skeleton />}>{children}</Suspense>
        </div>
        <LoadTimeTracker />
      </body>
    </html>
  );
}
