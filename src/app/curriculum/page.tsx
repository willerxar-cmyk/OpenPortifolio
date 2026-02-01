'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, GraduationCap, Calendar, Star, Award, Download } from "lucide-react";
import { motion } from 'framer-motion';
import { useI18n } from '@/contexts/I18nContext';
import { useCurriculum } from '@/hooks/useCurriculum';
import categoriesData from '@/data/categories.json';
import profileData from '@/data/profile.json';

export default function CurriculumPage() {
  const { t } = useI18n();
  const { getItemsByType, getFeaturedItems } = useCurriculum();
  const { profile } = profileData;

  const workItems = getItemsByType('work');
  const educationItems = getItemsByType('education');
  const skills = getItemsByType('skill');
  const featuredItems = getFeaturedItems();

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold tracking-tight"
        >
          {t('curriculum.title')}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          {t('curriculum.subtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            {t('curriculum.downloadCV')}
          </Button>
        </motion.div>
      </div>

      <div className="space-y-12">
        {/* Summary */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center py-8 px-6 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-2xl"
        >
          <h2 className="text-2xl font-semibold mb-4">{profile.name}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {profile.bio}
          </p>
        </motion.section>

        {/* Skills */}
        {skills.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <Award className="h-6 w-6 text-primary" />
              <h2>{t('curriculum.skills')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((item, index) => (
                <SkillCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <Briefcase className="h-6 w-6 text-primary" />
            <h2>{t('curriculum.experience')}</h2>
          </div>
          <div className="space-y-6">
            {workItems.map((item, index) => (
              <ExperienceCard key={item.id} item={item} index={index} t={t} />
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h2>{t('curriculum.education')}</h2>
          </div>
          <div className="space-y-6">
            {educationItems.map((item, index) => (
              <ExperienceCard key={item.id} item={item} index={index} t={t} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ExperienceCard({ item, index, t }: { item: any, index: number, t: (key: string) => string }) {
  const formatDate = (date: string | null) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl">{item.title}</CardTitle>
                {item.featured && (
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                )}
              </div>
              {item.company && (
                <CardDescription className="text-lg font-medium text-foreground mt-1">
                  {item.company}
                </CardDescription>
              )}
              {item.location && (
                <p className="text-sm text-muted-foreground mt-1">{item.location}</p>
              )}
            </div>
            {(item.startDate || item.endDate) && (
              <Badge variant="outline" className="flex items-center gap-1 w-fit">
                <Calendar className="h-3 w-3" />
                {item.startDate ? formatDate(item.startDate) : ''} - 
                {item.endDate ? formatDate(item.endDate) : ` ${t('curriculum.present')}`}
              </Badge>
            )}
          </div>
        </CardHeader>
        {item.description && (
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-line">
              {item.description}
            </p>
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {item.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}

function SkillCard({ item, index }: { item: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{item.title}</CardTitle>
            {item.tags?.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
            ))}
          </div>
        </CardHeader>
        {item.description && (
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}