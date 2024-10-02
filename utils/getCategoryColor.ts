export function getCategoryColor(categoryId: number) {
  const colors = [
    'bg-primary',
    'bg-primary-dark',
    'bg-primary-darker',
    'bg-accent-cyan',
    'bg-accent-purple',
    'bg-gray-400',
  ];
  return colors[categoryId] || 'bg-gray-400';
}
