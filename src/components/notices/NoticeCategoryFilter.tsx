
import React from 'react';
import { cn } from '@/lib/utils';

interface NoticeCategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const NoticeCategoryFilter: React.FC<NoticeCategoryFilterProps> = ({ 
  selectedCategory, 
  setSelectedCategory 
}) => {
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'exams', label: 'Exams' },
    { id: 'sports', label: 'Sports' },
    { id: 'events', label: 'Events' }
  ];

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            className={cn(
              "text-sm font-medium px-3 py-2 rounded-md transition-colors",
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            )}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        {Array(6).fill(null).map((_, i) => (
          <button
            key={i}
            className="text-sm font-medium px-3 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
          >
            Exams
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoticeCategoryFilter;
