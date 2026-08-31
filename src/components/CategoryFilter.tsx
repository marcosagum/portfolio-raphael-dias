import { getCategoryButtonState } from '../lib/categoryButtonState.js';

type CategoryFilterProps = {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
};

export default function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  return (
    <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => {
        const { isActive, className } = getCategoryButtonState(category, activeCategory);
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            aria-pressed={isActive}
            className={`rounded-full border px-4 py-2 font-sans text-xs uppercase tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 ${className}`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
