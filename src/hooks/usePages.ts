'use client';

import { useState, useEffect, useCallback } from 'react';
import { Page, PageStatus } from '@/types';
import { readJson, writeJson, generateId, now, sortBy } from '@/lib/json-db';

export function usePages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPages = useCallback(async () => {
    try {
      const data = await readJson<Page[]>('pages.json', []);
      setPages(data);
    } catch (error) {
      console.error('Failed to load pages:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPages();
  }, [loadPages]);

  const savePages = useCallback(async (updatedPages: Page[]) => {
    await writeJson('pages.json', updatedPages);
    setPages(updatedPages);
  }, []);

  const addPage = useCallback(async (page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => {
    const nowStr = now();
    const newPage: Page = {
      ...page,
      id: generateId(),
      createdAt: nowStr,
      updatedAt: nowStr,
    };
    
    const updated = [...pages, newPage];
    await savePages(updated);
    return newPage;
  }, [pages, savePages]);

  const updatePage = useCallback(async (id: string, updates: Partial<Page>) => {
    const nowStr = now();
    const updated = pages.map(p => 
      p.id === id ? { ...p, ...updates, updatedAt: nowStr } : p
    );
    await savePages(updated);
  }, [pages, savePages]);

  const deletePage = useCallback(async (id: string) => {
    const updated = pages.filter(p => p.id !== id);
    await savePages(updated);
  }, [pages, savePages]);

  const publishPage = useCallback(async (id: string) => {
    const nowStr = now();
    const updated = pages.map(p => 
      p.id === id ? { 
        ...p, 
        status: 'published' as PageStatus, 
        published: true, 
        publishedAt: nowStr,
        updatedAt: nowStr 
      } : p
    );
    await savePages(updated);
  }, [pages, savePages]);

  const getPageById = useCallback((id: string) => {
    return pages.find(p => p.id === id);
  }, [pages]);

  const getPageBySlug = useCallback((slug: string) => {
    return pages.find(p => p.slug === slug && p.published);
  }, [pages]);

  const getPublishedPages = useCallback(() => {
    return pages.filter(p => p.published);
  }, [pages]);

  const getStats = useCallback(() => {
    return {
      total: pages.length,
      published: pages.filter(p => p.published).length,
      drafts: pages.filter(p => p.status === 'draft').length,
    };
  }, [pages]);

  return {
    pages,
    isLoading,
    addPage,
    updatePage,
    deletePage,
    publishPage,
    getPageById,
    getPageBySlug,
    getPublishedPages,
    getStats,
    refresh: loadPages,
  };
}
