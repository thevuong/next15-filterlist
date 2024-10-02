'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { use, useOptimistic, useTransition } from 'react';
import type { TodosOverview, TodoStatus } from '@/types/todo';
import { cn } from '@/utils/cn';
import Skeleton from './ui/Skeleton';

type Props = {
  tabId: TodoStatus;
  children: React.ReactNode;
  activeTab: string;
  header: string;
  setOptimisticTab: (_tabId: string) => void;
};

function Tab({ tabId, children, activeTab, header, setOptimisticTab }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Link
      data-pending={isPending ? '' : undefined}
      className={cn(
        activeTab === tabId
          ? 'border-primary bg-primary-light'
          : isPending
            ? 'bg-primary-light'
            : 'bg-primary-lighter border-transparent',
        'flex flex-col gap-6 border-b-4 p-6',
      )}
      onClick={e => {
        e.preventDefault();
        startTransition(() => {
          setOptimisticTab(tabId);
          router.push('/' + tabId);
        });
      }}
      href={tabId}
    >
      <h3 className="text-lg font-semibold">{header}</h3>
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
    return (
      <div className="flex flex-col gap-2">
        {Object.entries(todosOverview[status]).map(([categoryName, category], i) => {
          return (
            <div key={i} className="flex items-center gap-2">
              <span className={`${'bg-primary'} size-4`} />
              {category.count} {categoryName}
            </div>
          );
        })}
      </div>
    );
  };

  const getTodoCount = (status: TodoStatus) => {
    return Object.values(todosOverview[status]).reduce((acc, category) => acc + category.count, 0);
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      <Tab
        header={`TODO (${getTodoCount('todo')})`}
        activeTab={optimisticTab}
        setOptimisticTab={setOptimisticTab}
        tabId="todo"
      >
        {mapTodos('todo')}
      </Tab>
      <Tab
        header={`IN PROGRESS (${getTodoCount('inprogress')})`}
        activeTab={optimisticTab}
        setOptimisticTab={setOptimisticTab}
        tabId="inprogress"
      >
        {mapTodos('inprogress')}
      </Tab>
      <Tab
        header={`DONE (${getTodoCount('done')})`}
        activeTab={optimisticTab}
        setOptimisticTab={setOptimisticTab}
        tabId="done"
      >
        {mapTodos('done')}
      </Tab>
    </div>
  );
}

export function TabsSkeleton() {
  return (
    <div className="grid w-full grid-cols-3 gap-6">
      <Skeleton className="h-40" />
      <Skeleton className="h-40" />
      <Skeleton className="h-40" />
    </div>
  );
}
