'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { use } from 'react';
import ToggleButton from './ui/ToggleButton';
import type { Category } from '@prisma/client';

type Props = {
  categoriesPromise: Promise<Record<string, Category>>;
};

export default function CategoryFilter({ categoriesPromise }: Props) {
  const categories = use(categoriesPromise);
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const router = useRouter();
  const selectedCategories = searchParams.getAll('category');

  return (
    <div className="flex flex-wrap gap-2">
      {Object.values(categories).map(category => {
        return (
          <ToggleButton
            onClick={() => {
              const categoryId = category.id.toString();
              let newCategories: string[] = [];
              if (selectedCategories.includes(categoryId)) {
                newCategories = selectedCategories.filter(id => {
                  return categoryId !== id;
                });
              } else {
                newCategories = [...selectedCategories, categoryId];
              }
              const params = new URLSearchParams(
                newCategories.map(categoryId => {
                  return ['category', categoryId];
                }),
              );
              router.push(`?${params.toString()}&q=${q}`);
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
