import React from 'react';
import SearchStatus from './ui/SearchStatus';

export default function Search() {
  return (
    <form className="relative flex w-full flex-col gap-1 sm:w-fit">
      <label className="font-semibold uppercase" htmlFor="search">
        Search
      </label>
      <input
        autoComplete="off"
        id="search"
        className="w-full pl-10 sm:w-96"
        name="q"
        placeholder="Search in task title or description..."
        type="search"
      />
      <SearchStatus searching={false} />
    </form>
  );
}

export function SearchSkeleton() {
  return <input className="mt-7 w-full sm:w-96" placeholder="Loading..." disabled />;
}
