import React from 'react';
import { ActionIcon } from '@/components/ui/icons/ActionIcon';
import { getCategoriesMap } from '@/data/category';
import { getTodos } from '@/data/todo';
import type { TodoStatus } from '@/types/todo';

type PageProps = {
  params: {
    tab: string;
  };
  searchParams: {
    q: string;
    category: string | string[];
  };
};

export default async function TabPage({ params, searchParams }: PageProps) {
  const categoriesMap = await getCategoriesMap();
  const { q, category } = searchParams;
  const data = await getTodos({
    categories: Array.isArray(category) ? category.map(Number) : category ? [Number(category)] : undefined,
    q,
    status: params.tab as TodoStatus,
  });

  return (
    <div className="group-has-[[data-pending]]:animate-pulse">
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Date</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {data.map(todo => {
            return (
              <tr key={todo.id}>
                <td className="font-medium uppercase">{todo.title}</td>
                <td>{todo.description}</td>
                <td>
                  <div className="bg-primary px-3 py-1 text-white">{categoriesMap[todo.categoryId].name}</div>
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
        </tbody>
      </table>
    </div>
  );
}
