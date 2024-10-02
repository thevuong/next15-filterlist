'use client';

import { useParams } from 'next/navigation';
import React, { use, useOptimistic } from 'react';
import type { TodosOverview, TodoStatus } from '@/types/todo';
import { cn } from '@/utils/cn';
import { getCategoryColor } from '@/utils/getCategoryColor';
import Tab from './Tab';

type Props = {
  todosOverviewPromise: Promise<TodosOverview>;
  // todosOverview: TodosOverview;
};

export default function Tabs({ todosOverviewPromise }: Props) {
  const activeTab = useParams().tab as string;
  const todosOverview = use(todosOverviewPromise);
  const [optimisticTab, setOptimisticTab] = useOptimistic(activeTab);

  const mapTodos = (status: TodoStatus) => {
    return (
      <div className="flex flex-col gap-2">
        {Object.entries(todosOverview[status]).map(([id, category]) => {
          const color = getCategoryColor(Number(id));
          return (
            <div key={id} className="flex items-center gap-2">
              <span className={cn(color, 'size-4')} />
              {category.count} <span className="hidden sm:flex">{category.name}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const getTodoCount = (status: TodoStatus) => {
    return Object.values(todosOverview[status]).reduce((acc, category) => {
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
