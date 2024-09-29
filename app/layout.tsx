import './globals.css';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { Suspense } from 'react';
import DataComponent from '@/components/DataComponent';
import LoadTimeTracker from '@/components/LoadTimeTracker';
import Search from '@/components/Search';
import Skeleton from '@/components/ui/Skeleton';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Next.js 15 Filter List',
  title: 'Next.js 15 filtering list example using modern React features',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="group">
          <div className="bg-blue-500 p-4 text-white">
            Statisk data
            <Image src="/logo.jpeg" alt="Logo" width={500} height={200} />
          </div>
          <Suspense fallback={<Skeleton />}>
            <DataComponent />
          </Suspense>
          <Suspense>
            <Search />
          </Suspense>
          <Suspense fallback={<Skeleton />}>{children}</Suspense>
        </div>
        <LoadTimeTracker />
      </body>
    </html>
  );
}
