export function getCategoryColor(categoryId: number) {
  const colors = ['bg-primary', 'bg-primary-dark', 'bg-primary-darker', 'bg-accent-cyan', 'bg-accent-purple'];
  return colors[categoryId] || 'bg-gray';
}
