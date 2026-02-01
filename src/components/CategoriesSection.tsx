'use client';

import { useI18n } from '@/contexts/I18nContext';
import { motion } from 'framer-motion';
import { Category, Subcategory } from '@/types';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import categoriesData from '@/data/categories.json';

interface CategoryCardProps {
  category: Category;
  onSubcategoryClick?: (categoryId: string, subcategoryId: string) => void;
}

function CategoryCard({ category, onSubcategoryClick }: CategoryCardProps) {
  const { t } = useI18n();
  const IconComponent = (Icons[category.icon as keyof typeof Icons] as LucideIcon) || Icons.Circle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl bg-card border border-border p-6 hover:shadow-xl transition-all duration-300"
    >
      <div 
        className="absolute inset-0 opacity-5 transition-opacity group-hover:opacity-10"
        style={{ backgroundColor: category.color }}
      />
      
      <div className="relative z-10">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${category.color}20` }}
        >
          <IconComponent className="w-6 h-6" style={{ color: category.color }} />
        </div>

        <h3 className="text-xl font-semibold mb-2">{t(category.key)}</h3>
        
        <div className="space-y-2 mt-4">
          {category.subcategories.map((sub) => {
            const SubIcon = (Icons[sub.icon as keyof typeof Icons] as LucideIcon) || Icons.Circle;
            return (
              <button
                key={sub.id}
                onClick={() => onSubcategoryClick?.(category.id, sub.id)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-left"
              >
                <SubIcon className="w-4 h-4" />
                <span>{t(sub.key)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

interface CategoriesSectionProps {
  onSubcategoryClick?: (categoryId: string, subcategoryId: string) => void;
}

export function CategoriesSection({ onSubcategoryClick }: CategoriesSectionProps) {
  const { t } = useI18n();
  const { categories } = categoriesData;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t('categories.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('categories.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category as Category}
              onSubcategoryClick={onSubcategoryClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}