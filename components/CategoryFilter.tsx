'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { use } from 'react';
import ToggleGroup from './ui/toggle-group/ToggleGroup';
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
      <ToggleGroup
        options={Object.values(categoriesMap).map(category => {
          return {
            label: category.name,
            value: category.id.toString(),
          };
        })}
        selectedValues={selectedCategories}
        onToggle={newCategories => {
          const params = new URLSearchParams(searchParams);
          params.delete('category');
          newCategories.forEach(category => {
            return params.append('category', category);
          });
          router.push(`?${params.toString()}`, {
            scroll: false,
          });
        }}
      />
    </div>
  );
}
