import React, { Suspense } from 'react';
import { getCategories } from '@/data/getCategories';
import { getTodosOverview } from '@/data/getTodos';
import Tabs from './Tabs';
import Skeleton from './ui/Skeleton';

export default async function DynamicData() {
  // const todosOverview = await getTodosOverview();
  // const categories = await getCategories();

  // const [todosOverview, categories] = await Promise.all([getTodosOverview(), getCategories()]);

  const categories = await getCategories();
  const todosOverview = getTodosOverview();

  return (
    <>
      <div className="flex flex-col gap-2 bg-red-500 p-4">
        <span>
          Dynamic category data: {categories.length} categories
          {categories.map(category => {
            return (
              <span className="rounded p-1" key={category.id}>
                {category.name}
              </span>
            );
          })}
        </span>
        <Suspense fallback={<Skeleton />}>
          <Tabs todosOverviewPromise={todosOverview} />
        </Suspense>
      </div>
    </>
  );
}
