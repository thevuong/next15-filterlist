import './globals.css';

// eslint-disable-next-line import/no-unresolved
import { GeistSans } from 'geist/font/sans';
import LoadTimeTracker from '@/components/LoadTimeTracker';
import { cn } from '@/utils/cn';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'Next.js 15 Filter List',
  title: 'Next.js 15 filtering list example using modern React features',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(GeistSans.className, 'flex flex-col px-4 py-16 sm:px-16 xl:px-48 2xl:px-96')}>
        {children}
        <LoadTimeTracker />
      </body>
    </html>
  );
}
