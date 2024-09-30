import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import DynamicData from '@/components/DynamicData';
import LoadTimeTracker from '@/components/LoadTimeTracker';
import Search from '@/components/Search';
import StaticData from '@/components/StaticData';
import Skeleton from '@/components/ui/Skeleton';

import type { Metadata } from 'next';

export const experimental_ppr = true;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Next.js 15 Filter List',
  title: 'Next.js 15 filtering list example using modern React features',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="group">
          <StaticData />
          <Suspense fallback={<Skeleton />}>
            <DynamicData />
          </Suspense>
          <Suspense>
            <Search />
          </Suspense>
          <Suspense fallback={<Skeleton />}>{children}</Suspense>
        </div>
        <LoadTimeTracker />
        <SpeedInsights />
      </body>
    </html>
  );
}
