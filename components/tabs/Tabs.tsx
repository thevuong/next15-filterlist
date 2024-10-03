'use client';

import { useParams } from 'next/navigation';
import React, { use, useOptimistic } from 'react';
import type { TaskStatus, TaskSummary } from '@/types/task';
import { cn } from '@/utils/cn';
import { getCategoryColor } from '@/utils/getCategoryColor';
import Skeleton from '../ui/Skeleton';
import Tab from './Tab';

type Props = {
  todosOverviewPromise: Promise<TaskSummary>;
};

export default function Tabs({ todosOverviewPromise }: Props) {
  const activeTab = useParams().tab as string;
  const taskSummary = use(todosOverviewPromise);
  const [optimisticTab, setOptimisticTab] = useOptimistic(activeTab);

  const mapTodos = (status: TaskStatus) => {
    return (
      <div className="flex flex-col gap-2">
        {Object.entries(taskSummary[status]).map(([id, category]) => {
          const color = getCategoryColor(Number(id));
          return (
            <div key={id} className="flex items-center gap-2">
              <span className={cn(color, 'size-4')} />
              {category.count} {category.name}
            </div>
          );
        })}
      </div>
    );
  };

  const getTodoCount = (status: TaskStatus) => {
    return Object.values(taskSummary[status]).reduce((acc, category) => {
      return acc + category.count;
    }, 0);
  };

  return (
    <div className="flex gap-6 overflow-auto">
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
    <div className="flex gap-6 overflow-auto">
      <Skeleton className="h-[169px] sm:h-48" />
      <Skeleton className="h-[169px] sm:h-48" />
      <Skeleton className="h-[169px] sm:h-48" />
    </div>
  );
}
