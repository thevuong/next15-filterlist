import React from 'react';
import { ActionIcon } from '@/components/ui/icons/ActionIcon';
import { getCategoriesMap } from '@/data/services/category';
import { getTodos } from '@/data/services/todo';
import type { TodoStatus } from '@/types/todo';
import { cn } from '@/utils/cn';
import { getCategoryColor } from '@/utils/getCategoryColor';

type PageProps = {
  params: Promise<{
    tab: string;
  }>;
  searchParams: Promise<{
    q?: string;
    category?: string | string[];
  }>;
};

export default async function TabPage({ params, searchParams }: PageProps) {
  const categoriesMap = await getCategoriesMap();
  const { q, category } = await searchParams;
  const data = await getTodos({
    categories: Array.isArray(category) ? category.map(Number) : category ? [Number(category)] : undefined,
    q,
    status: (await params).tab as TodoStatus,
  });

  return (
    <div className="overflow-x-auto rounded group-has-[[data-pending]]:animate-pulse">
      <table>
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Created Date</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {data.map(todo => {
            const color = getCategoryColor(todo.categoryId);
            return (
              <tr key={todo.id}>
                <td className="font-medium">{todo.title}</td>
                <td>{todo.description}</td>
                <td>
                  <div className={cn(color, 'flex w-fit justify-center px-3 py-1 text-white')}>
                    {categoriesMap[todo.categoryId].name}
                  </div>
                </td>
                <td>{new Date(todo.createdAt).toLocaleDateString()}</td>
                <td>
                  <button aria-label="Options">
                    <ActionIcon aria-hidden width={20} height={20} />
                  </button>
                </td>
              </tr>
            );
          })}
          {data.length === 0 && (
            <tr>
              <td colSpan={5}>No todos found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
