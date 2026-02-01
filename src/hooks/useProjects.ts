'use client';

import { useState, useEffect, useCallback } from 'react';
import { Project } from '@/types';

const STORAGE_KEY = 'portfolio_projects';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProjects = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setProjects(JSON.parse(stored));
    } else {
      // Load default data from JSON
      fetch('/data/projects.json')
        .then(res => res.json())
        .then(data => {
          setProjects(data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        })
        .catch(() => setProjects([]));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const addProject = useCallback((project: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    const updated = [...projects, newProject];
    setProjects(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newProject;
  }, [projects]);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    const updated = projects.map(p => 
      p.id === id ? { ...p, ...updates } : p
    );
    setProjects(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, [projects]);

  const deleteProject = useCallback((id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, [projects]);

  const getProjectsByCategory = useCallback((category: string) => {
    return projects.filter(p => p.category === category && p.published);
  }, [projects]);

  const getFeaturedProjects = useCallback(() => {
    return projects.filter(p => p.featured && p.published);
  }, [projects]);

  return {
    projects,
    isLoading,
    addProject,
    updateProject,
    deleteProject,
    getProjectsByCategory,
    getFeaturedProjects,
    refresh: loadProjects,
  };
}