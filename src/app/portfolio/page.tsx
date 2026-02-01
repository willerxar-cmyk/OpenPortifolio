'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Star, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from '@/contexts/I18nContext';
import { useProjects } from '@/hooks/useProjects';
import { motion } from 'framer-motion';
import { useState } from 'react';
import categoriesData from '@/data/categories.json';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PortfolioPage() {
  const { t } = useI18n();
  const { projects, isLoading, getFeaturedProjects } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { categories } = categoriesData;

  const filteredProjects = selectedCategory === 'all' 
    ? projects.filter(p => p.published)
    : projects.filter(p => p.category === selectedCategory && p.published);

  const featuredProjects = getFeaturedProjects();

  return (
    <div className="container py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold tracking-tight"
        >
          {t('portfolio.title')}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          {t('portfolio.subtitle')}
        </motion.p>
      </div>

      {/* Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center gap-4"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{t('portfolio.filterBy')}:</span>
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('portfolio.allProjects')}</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {t(cat.key)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && selectedCategory === 'all' && (
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            {t('portfolio.featured')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} t={t} />
            ))}
          </div>
        </section>
      )}

      {/* All Projects */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          {selectedCategory === 'all' ? t('portfolio.allProjects') : t(categories.find(c => c.id === selectedCategory)?.key || '')}
        </h2>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('portfolio.noProjects')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} t={t} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function ProjectCard({ project, index, t }: { project: any, index: number, t: (key: string) => string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="flex flex-col overflow-hidden h-full group hover:shadow-xl transition-all duration-300">
        {project.imageUrl ? (
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary/30">{project.title.charAt(0)}</span>
          </div>
        )}
        
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg">{project.title}</CardTitle>
            {project.featured && (
              <Star className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
            )}
          </div>
          <Badge variant="outline" className="w-fit capitalize text-xs">
            {project.category}
          </Badge>
        </CardHeader>
        
        <CardContent className="flex-1 py-2">
          <CardDescription className="text-sm line-clamp-2">
            {project.description}
          </CardDescription>
          <div className="flex flex-wrap gap-1 mt-3">
            {project.tags?.slice(0, 3).map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
            {project.tags?.length > 3 && (
              <Badge variant="secondary" className="text-xs">+{project.tags.length - 3}</Badge>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex gap-2 pt-2">
          {project.githubUrl && (
            <Button variant="outline" size="sm" asChild className="flex-1">
              <Link href={project.githubUrl} target="_blank">
                <Github className="mr-2 h-4 w-4" /> {t('portfolio.viewCode')}
              </Link>
            </Button>
          )}
          {project.link && (
            <Button size="sm" asChild className="flex-1">
              <Link href={project.link} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" /> {t('portfolio.viewProject')}
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}