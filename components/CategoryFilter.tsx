'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { use, useOptimistic, useTransition } from 'react';
import ToggleButton from './ui/ToggleButton';
import type { Category } from '@prisma/client';

type Props = {
  categoriesPromise: Promise<Record<string, Category>>;
};

export default function CategoryFilter({ categoriesPromise }: Props) {
  const categoriesMap = use(categoriesPromise);
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [optimisticCategories, setOptimisticCategories] = useOptimistic(searchParams.getAll('category'));

  return (
    <div data-pending={isPending ? '' : undefined} className="flex flex-wrap gap-2">
      {Object.values(categoriesMap).map(category => {
        return (
          <ToggleButton
            onClick={() => {
              const categoryId = category.id.toString();
              const newCategories = optimisticCategories.includes(categoryId)
                ? optimisticCategories.filter(id => {
                    return id !== categoryId;
                  })
                : [...optimisticCategories, categoryId];

              const params = new URLSearchParams(searchParams);
              params.delete('category');
              newCategories.forEach(id => {
                return params.append('category', id);
              });
              startTransition(() => {
                setOptimisticCategories(newCategories);
                router.push(`?${params.toString()}`);
              });
            }}
            key={category.id}
            active={optimisticCategories.includes(category.id.toString())}
          >
            {category.name}
          </ToggleButton>
        );
      })}
    </div>
  );
}
