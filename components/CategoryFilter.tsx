'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { use, useOptimistic, useTransition } from 'react';
import { cn } from '@/utils/cn';
import type { Category } from '@prisma/client';

type Props = {
  categoriesPromise: Promise<Category[]>;
};

export default function CategoryFilter({ categoriesPromise }: Props) {
  const categories = use(categoriesPromise);
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [optimisticCategories, setOptimisticCategories] = useOptimistic(searchParams.getAll('category'));

  return (
    <div data-pending={isPending ? '' : undefined} className="flex gap-2">
      {categories.map(category => {
        return (
          <button
            onClick={() => {
              const categoryId = category.id.toString();
              let newCategories: string[] = [];
              if (optimisticCategories.includes(categoryId)) {
                newCategories = optimisticCategories.filter(id => {
                  return categoryId !== id;
                });
              } else {
                newCategories = [...optimisticCategories, categoryId];
              }
              const params = new URLSearchParams(
                newCategories.map(categoryId => {
                  return ['category', categoryId];
                }),
              );
              startTransition(() => {
                setOptimisticCategories(newCategories);
                router.push(`?${params.toString()}&q=${q}`);
              });
            }}
            key={category.id}
            className={cn(
              optimisticCategories.includes(category.id.toString()) && 'outline outline-blue-500',
              'rounded bg-gray-200 p-2',
            )}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
