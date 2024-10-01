'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { use, useOptimistic, useTransition } from 'react';
import type { TodosOverview, TodoStatus } from '@/types/todo';
import { cn } from '@/utils/cn';

type Props = {
  tabId: TodoStatus;
  children: React.ReactNode;
  activeTab: string;
  setOptimisticTab: (_tabId: string) => void;
};

function Tab({ tabId, children, activeTab, setOptimisticTab }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Link
      data-pending={isPending ? '' : undefined}
      className={cn(
        isPending ? 'bg-gray-300' : 'bg-gray-200',
        activeTab === tabId && 'outline outline-gray-500',
        'rounded p-4',
      )}
      onClick={e => {
        e.preventDefault();
        startTransition(() => {
          setOptimisticTab(tabId);
          router.push(tabId);
        });
      }}
      href={tabId}
    >
      <h2 className="text-lg font-semibold">{tabId}</h2>
      {children}
    </Link>
  );
}

type TabsProps = {
  todosOverviewPromise: Promise<TodosOverview>;
  // todosOverview: TodosOverview;
};

export default function Tabs({ todosOverviewPromise }: TabsProps) {
  const activeTab = useParams().tab as string;
  const todosOverview = use(todosOverviewPromise);
  const [optimisticTab, setOptimisticTab] = useOptimistic(activeTab);

  const mapTodos = (status: TodoStatus) => {
    return Object.entries(todosOverview[status]).map(([categoryName, category], i) => {
      return (
        <span key={i} className="flex items-center gap-1">
          <span className={`rounded-full ${category.color || 'bg-gray-500'} size-2 p-1`} />
          {category.count} {categoryName}
        </span>
      );
    });
  };

  return (
    <div className="flex gap-4 bg-red-500 p-4">
      <Tab activeTab={optimisticTab} setOptimisticTab={setOptimisticTab} tabId="todo">
        {mapTodos('todo')}
      </Tab>
      <Tab activeTab={optimisticTab} setOptimisticTab={setOptimisticTab} tabId="inprogress">
        {mapTodos('inprogress')}
      </Tab>
      <Tab activeTab={optimisticTab} setOptimisticTab={setOptimisticTab} tabId="done">
        {mapTodos('done')}
      </Tab>
    </div>
  );
}
