import React from 'react';
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
  const data = await getTodos({
    categories: Array.isArray(searchParams.category)
      ? searchParams.category.map(Number)
      : searchParams.category
        ? [Number(searchParams.category)]
        : undefined,
    q: searchParams.q,
    status: params.tab as TodoStatus,
  });

  return (
    <div className="bg-red-500 p-4 group-has-[[data-pending]]:animate-pulse">
      Dynammisk data basert på: Tab: {params.tab}, Søk: {searchParams.q}, Kategorier:{' '}
      {searchParams?.category?.toString()}
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Created Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map(todo => {
            return (
              <tr key={todo.id}>
                <td>{todo.name}</td>
                <td>{todo.description}</td>
                <td>{categoriesMap[todo.categoryId].name}</td>
                <td>{new Date(todo.createdAt).toLocaleDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
