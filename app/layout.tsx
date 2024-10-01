import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import DynamicComponents from '@/components/DynamicComponents';
import LoadTimeTracker from '@/components/LoadTimeTracker';
import StaticData from '@/components/StaticData';

import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Next.js 15 Filter List',
  title: 'Next.js 15 filtering list example using modern React features',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StaticData />
        <Suspense>
          <DynamicComponents>{children}</DynamicComponents>
        </Suspense>
        <LoadTimeTracker />
        <SpeedInsights />
      </body>
    </html>
  );
}
