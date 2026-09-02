import { getCategoryButtonState } from '../lib/categoryButtonState.js';
import { useGooeyBurst } from '../lib/useGooeyBurst';
import { useLanguage } from '../i18n/LanguageContext';
import { CATEGORY_LABELS, UI_TEXT } from '../i18n/translations';

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
  const { language } = useLanguage();
  const label = CATEGORY_LABELS[language][category] ?? category;

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
      {label}
      <span ref={ref} className="gooey-particle-layer" aria-hidden="true" />
    </button>
  );
}

export default function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  const { language } = useLanguage();

  return (
    <div role="group" aria-label={UI_TEXT[language].filterAriaLabel} className="flex flex-wrap justify-center gap-3">
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
