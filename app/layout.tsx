import './globals.css';

// eslint-disable-next-line import/no-unresolved
import { GeistSans } from 'geist/font/sans';
import LoadTimeTracker from '@/components/LoadTimeTracker';
import ProjectInfo from '@/components/ProjectInfo';
import Search from '@/components/Search';
import Tabs from '@/components/tabs/Tabs';
import { getProjectWithTeamMembers } from '@/data/services/project';
import { getTaskSummary } from '@/data/services/task';
import { cn } from '@/utils/cn';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'Next.js 15 Filter List',
  title: 'Next.js 15 filtering list example using modern React features',
};

type LayoutProps = {
  params: Promise<{
    tab: string;
  }>;
  children: React.ReactNode;
};

export default async function RootLayout({ params, children }: LayoutProps) {
  const taskSummary = await getTaskSummary();
  const projectAndMembers = await getProjectWithTeamMembers();

  return (
    <html lang="en">
      <body className={cn(GeistSans.className, 'flex flex-col px-4 py-16 sm:px-16 xl:px-48 2xl:px-96')}>
        <div className="group flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h1>Project information</h1>
            <ProjectInfo projectAndMembers={projectAndMembers} />
          </div>
          <div className="flex flex-col gap-6">
            <h2>Task list</h2>
            <Tabs taskSummary={taskSummary} activeTab={(await params).tab} />
          </div>
          <div className="h-[1px] bg-primary" />
          <Search tab={(await params).tab} />
          {children}
        </div>
        <LoadTimeTracker />
      </body>
    </html>
  );
}
