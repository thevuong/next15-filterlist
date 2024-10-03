import React from 'react';
import ProjectInfo from '@/components/ProjectInfo';
import Search from '@/components/Search';
import Tabs from '@/components/tabs/Tabs';
import { getProject } from '@/data/services/project';
import { getTaskSummary } from '@/data/services/task';
import type { TaskStatus } from '@/types/task';

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    tab: TaskStatus;
  }>;
};

export default async function TabsLayout({ children, params }: LayoutProps) {
  const taskSummary = await getTaskSummary();
  const project = await getProject();
  const tab = (await params).tab;

  return (
    <div className="group flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <h1>Project information</h1>
        <ProjectInfo project={project} />
      </div>
      <div className="flex flex-col gap-6">
        <h2>Task list</h2>
        <Tabs activeTab={tab} taskSummary={taskSummary} />
      </div>
      <div className="h-[1px] bg-primary" />
      <Search tab={tab} />
      {children}
    </div>
  );
}
