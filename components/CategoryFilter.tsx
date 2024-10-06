'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { use } from 'react';
import ToggleGroup from './ui/toggle-group/ToggleGroup';
import type { Category } from '@prisma/client';

const mapCategories = (categories: Category[]) => {
  return Object.values(categories).map(category => {
    return {
      label: category.name,
      value: category.id.toString(),
    };
  });
};

type Props = {
  categoriesPromise: Promise<Record<string, Category>>;
};

export default function CategoryFilter({ categoriesPromise }: Props) {
  const categoriesMap = use(categoriesPromise);
  const categories = Object.values(categoriesMap);
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategories = searchParams.getAll('category');

  return (
    <div className="flex flex-wrap gap-2">
      <ToggleGroup
        options={mapCategories(categories)}
        selectedOptions={mapCategories(
          selectedCategories.map(id => {
            return categoriesMap[id];
          }),
        )}
        onToggle={newOptions => {
          const newCategories = newOptions.map(option => {
            return option.value;
          });
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
