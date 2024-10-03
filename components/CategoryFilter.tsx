import React from 'react';
import ToggleButton from './ui/ToggleButton';
import type { Category } from '@prisma/client';

type Props = {
  categories: Record<string, Category>;
};

export default function CategoryFilter({ categories }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.values(categories).map(category => {
        return (
          <ToggleButton key={category.id} active={false}>
            {category.name}
          </ToggleButton>
        );
      })}
    </div>
  );
}
