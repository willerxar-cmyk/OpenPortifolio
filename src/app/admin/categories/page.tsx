'use client';

import { useState } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import categoriesData from '@/data/categories.json';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { Category } from '@/types';

export default function CategoriesAdminPage() {
  const { t } = useI18n();
  const { categories } = categoriesData;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('admin.categories')}</h1>
        <p className="text-muted-foreground mt-1">
          Manage your portfolio categories and subcategories
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category, index) => {
          const IconComponent = (Icons[category.icon as keyof typeof Icons] as LucideIcon) || Icons.Circle;
          const isSelected = selectedCategory === category.id;
          
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  isSelected ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedCategory(isSelected ? null : category.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <IconComponent className="w-6 h-6" style={{ color: category.color }} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{t(category.key)}</CardTitle>
                        <CardDescription className="text-xs uppercase tracking-wide">
                          {category.id}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {category.subcategories.length} subcategories
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2">
                    {category.subcategories.map((sub) => {
                      const SubIcon = (Icons[sub.icon as keyof typeof Icons] as LucideIcon) || Icons.Circle;
                      return (
                        <div 
                          key={sub.id}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <SubIcon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{t(sub.key)}</span>
                          <code className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                            {sub.id}
                          </code>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Card className="bg-muted/50 border-dashed">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground text-sm">
            Categories are defined in <code className="bg-muted px-1 rounded">src/data/categories.json</code>
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            Edit this file to add or modify categories
          </p>
        </CardContent>
      </Card>
    </div>
  );
}