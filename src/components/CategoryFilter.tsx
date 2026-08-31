import { getCategoryButtonState } from '../lib/categoryButtonState.js';
import { useGooeyBurst } from '../lib/useGooeyBurst';

type CategoryFilterProps = {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
};

function CategoryButton({
  category,
  isActive,
  className,
  onSelect,
}: {
  category: string;
  isActive: boolean;
  className: string;
  onSelect: (category: string) => void;
}) {
  const { ref, burst } = useGooeyBurst<HTMLSpanElement>();

  return (
    <button
      type="button"
      onClick={() => {
        burst();
        onSelect(category);
      }}
      aria-pressed={isActive}
      className={`relative overflow-visible rounded-full border px-4 py-2 font-sans text-xs uppercase tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 ${className}`}
    >
      {category}
      <span ref={ref} className="gooey-particle-layer" aria-hidden="true" />
    </button>
  );
}

export default function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  return (
    <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => {
        const { isActive, className } = getCategoryButtonState(category, activeCategory);
        return (
          <CategoryButton
            key={category}
            category={category}
            isActive={isActive}
            className={className}
            onSelect={onSelect}
          />
        );
      })}
    </div>
  );
}
