'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useTransition } from 'react';

export default function Search() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const [isPending, startTransition] = useTransition();

  return (
    <form key={params.tab as string}>
      Search:
      <input
        data-pending={isPending ? '' : undefined}
        className="m-4 border border-gray-400 p-2 outline-none"
        onChange={e => {
          startTransition(() => {
            router.push(`?q=${e.target.value}`);
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
