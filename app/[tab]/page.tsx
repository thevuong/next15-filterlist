import React from 'react';
import { getData } from '@/data/getData';

export const experimental_ppr = false;

type PageProps = {
  params: {
    tab: string;
  };
  searchParams: {
    q: string;
  };
};

export default async function Tab({ params, searchParams }: PageProps) {
  const data = await getData();

  return (
    <div className="bg-red-500 p-4 text-white group-has-[[data-pending]]:animate-pulse">
      Tab:
      {params.tab} {searchParams.q}
      <div>Dynamisk data {data[Number(params.tab) - 1].id}</div>
      Liste over data basert på hvilken tab og søk
    </div>
  );
}
