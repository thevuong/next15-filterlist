import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/utils/cn';

export const button = cva('button', {
  defaultVariants: {
    theme: 'primary',
  },
  variants: {
    theme: {
      primary: ['bg-primary', 'text-white'],
      secondary: ['bg-white', 'text-black', 'border', 'border-primary'],
    },
  },
});

export type Props = {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  active?: boolean;
  className?: string;
};

export default function Button({
  children,
  type,
  theme,
  className,
  ...otherProps
}: Props & React.HTMLProps<HTMLButtonElement> & VariantProps<typeof button>) {
  return (
    <button {...otherProps} type={type} className={cn(button({ className, theme }), 'px-6 py-3')}>
      {children}
    </button>
  );
}
