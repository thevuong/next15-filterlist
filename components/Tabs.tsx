'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { use, useOptimistic, useTransition } from 'react';
import { cn } from '@/utils/cn';
import type { Message } from '@prisma/client';

type Props = {
  tabId: string;
  data: string;
  activeTab: string;
  onClick: (_tabId: string) => void;
};

function Tab({ tabId, data, activeTab, onClick }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Link
      data-pending={isPending ? '' : undefined}
      className={cn(
        isPending ? 'bg-gray-300' : 'bg-gray-200',
        activeTab === tabId ? 'text-blue-500' : 'text-gray-900',
        'rounded p-4',
      )}
      onClick={e => {
        e.preventDefault();
        startTransition(() => {
          onClick(tabId);
          router.push(tabId);
        });
      }}
      href={tabId}
    >
      <span>Tab: {tabId}</span>
      <span>{data}</span>
    </Link>
  );
}

type TabsProps = {
  dataPromise: Promise<Message[]>;
  // data: Message[];
};

export default function Tabs({ dataPromise }: TabsProps) {
  const activeTab = useParams().tab as string;
  const data = use(dataPromise);
  const [optimisticTab, setOptimisticTab] = useOptimistic(activeTab);

  return (
    <div className="flex gap-4 p-4">
      <Tab activeTab={optimisticTab} onClick={setOptimisticTab} data={data[0].id} tabId="1" />
      <Tab activeTab={optimisticTab} onClick={setOptimisticTab} data={data[1].id} tabId="2" />
      <Tab activeTab={optimisticTab} onClick={setOptimisticTab} data={data[2].id} tabId="3" />
    </div>
  );
}
