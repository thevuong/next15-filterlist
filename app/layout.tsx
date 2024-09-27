import './globals.css';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import DataComponent from '@/components/DataComponent';
import Search from '@/components/Search';
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
          <div className="bg-blue-500 p-4 text-white">STATIC</div>
          <Suspense fallback={<div>Loading...</div>}>
            <DataComponent />
          </Suspense>
          <Search />
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </div>
      </body>
    </html>
  );
}
