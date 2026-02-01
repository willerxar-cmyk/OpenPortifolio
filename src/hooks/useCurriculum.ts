'use client';

import { useState, useEffect, useCallback } from 'react';
import { CurriculumItem } from '@/types';

const STORAGE_KEY = 'portfolio_curriculum';

export function useCurriculum() {
  const [items, setItems] = useState<CurriculumItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadItems = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setItems(JSON.parse(stored));
    } else {
      fetch('/data/curriculum.json')
        .then(res => res.json())
        .then(data => {
          setItems(data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        })
        .catch(() => setItems([]));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const addItem = useCallback((item: Omit<CurriculumItem, 'id'>) => {
    const newItem: CurriculumItem = {
      ...item,
      id: Date.now().toString(),
    };
    
    const updated = [...items, newItem];
    setItems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newItem;
  }, [items]);

  const updateItem = useCallback((id: string, updates: Partial<CurriculumItem>) => {
    const updated = items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    setItems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, [items]);

  const deleteItem = useCallback((id: string) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, [items]);

  const getItemsByType = useCallback((type: 'work' | 'education' | 'skill') => {
    return items
      .filter(item => item.type === type)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [items]);

  const getFeaturedItems = useCallback(() => {
    return items.filter(item => item.featured);
  }, [items]);

  return {
    items,
    isLoading,
    addItem,
    updateItem,
    deleteItem,
    getItemsByType,
    getFeaturedItems,
    refresh: loadItems,
  };
}