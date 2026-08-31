export function getCategoryButtonState(category, activeCategory) {
  const isActive = category === activeCategory;
  return {
    isActive,
    className: isActive
      ? 'border-primary bg-primary text-black'
      : 'border-gray-600 text-gray-400 hover:border-primary hover:text-primary',
  };
}
