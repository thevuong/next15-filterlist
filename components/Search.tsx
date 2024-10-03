'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useTransition } from 'react';
import { SearchIcon } from './ui/icons/SearchIcon';
import { SpinnerIcon } from './ui/icons/SpinnerIcon';

function SearchStatus({ searching }: { searching: boolean }) {
  return (
    <div aria-hidden className="absolute left-4 top-[41px]">
      {searching ? (
        <div className="h-fit w-fit animate-spin">
          <SpinnerIcon width={16} height={16} className="text-gray" />
        </div>
      ) : (
        <SearchIcon width={16} height={16} className="text-gray" />
      )}
    </div>
  );
}

export default function Search() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const category = searchParams.getAll('category');
  const [isPending, startTransition] = useTransition();

  return (
    <form className="relative flex w-full flex-col gap-1 sm:w-fit" key={params.tab as string}>
      <label className="font-semibold" htmlFor="search">
        Search
      </label>
      <input
        id="search"
        data-pending={isPending ? '' : undefined}
        onChange={e => {
          const categories = category.join('&category=');
          startTransition(() => {
            router.push(`?q=${e.target.value}&category=${categories}`);
          });
        }}
        defaultValue={q}
        className="w-full pl-10 sm:w-96"
        name="q"
        placeholder="Search in task title or description..."
        type="search"
      />
      <SearchStatus searching={isPending} />
    </form>
  );
}

export function SearchSkeleton() {
  return <input className="mt-7 w-full sm:w-96" placeholder="Loading..." disabled />;
}
