import React from 'react';
import { getTodos } from '@/data/getTodos';
import type { TodoStatus } from '@/types/todo';

export const experimental_ppr = false;

type PageProps = {
  params: {
    tab: string;
  };
  searchParams: {
    q: string;
  };
};

export default async function TabPage({ params, searchParams }: PageProps) {
  const data = await getTodos({
    q: searchParams.q,
    status: params.tab as TodoStatus,
  });

  return (
    <div className="bg-red-500 p-4 group-has-[[data-pending]]:animate-pulse">
      Dynammisk data basert på:
      {params.tab} {searchParams.q}
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
                <td>{todo.categoryId}</td>
                <td>{new Date(todo.createdAt).toLocaleDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
