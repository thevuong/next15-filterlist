'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { use } from 'react';
import ToggleButton from './ui/ToggleButton';
import type { Category } from '@prisma/client';

type Props = {
  categoriesPromise: Promise<Record<string, Category>>;
};

export default function CategoryFilter({ categoriesPromise }: Props) {
  const categoriesMap = use(categoriesPromise);
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategories = searchParams.getAll('category');

  return (
    <div className="flex flex-wrap gap-2">
      {Object.values(categoriesMap).map(category => {
        return (
          <ToggleButton
            onClick={() => {
              const categoryId = category.id.toString();
              const newCategories = selectedCategories.includes(categoryId)
                ? selectedCategories.filter(id => {
                    return id !== categoryId;
                  })
                : [...selectedCategories, categoryId];

              const params = new URLSearchParams(searchParams);
              params.delete('category');
              newCategories.forEach(id => {
                return params.append('category', id);
              });
              router.push(`?${params.toString()}`);
            }}
            key={category.id}
            active={selectedCategories.includes(category.id.toString())}
          >
            {category.name}
          </ToggleButton>
        );
      })}
    </div>
  );
}
