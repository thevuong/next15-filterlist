'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useTransition } from 'react';

export default function Search() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const category = searchParams.getAll('category');
  const [isPending, startTransition] = useTransition();

  // TODO: kanskje ikke reset, fikse ved å navigere med q andre steder
  return (
    <form key={params.tab as string}>
      Search:
      <input
        data-pending={isPending ? '' : undefined}
        className="m-4 border border-gray-400 p-2 outline-none"
        onChange={e => {
          const categories = category.join('&category=');
          startTransition(() => {
            router.push(`?q=${e.target.value}&category=${categories}`);
          });
        }}
        defaultValue={q}
        name="q"
        placeholder="Search"
        type="search"
      />
      {isPending ? 'searching...' : null}
    </form>
  );
}
