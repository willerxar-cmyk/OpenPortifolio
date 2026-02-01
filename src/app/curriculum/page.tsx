'use client';

import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Languages, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Youtube,
  ExternalLink,
  Lock,
  CheckCircle2,
  Calendar
} from "lucide-react";
import { motion } from 'framer-motion';
import { useI18n } from '@/contexts/I18nContext';

// Types matching the profile structure
interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
}

interface Language {
  id: string;
  name: string;
  proficiency: 'basic' | 'conversational' | 'fluent' | 'native';
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

interface ProfileData {
  profile: {
    name: string;
    title: string;
    bio: string;
    email: string;
    emailPrivate: boolean;
    phone: string;
    phonePrivate: boolean;
    location: string;
    website: string;
    avatar: string;
    social: SocialLink[];
  };
  curriculum: {
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    languages: Language[];
    certifications: Certification[];
    interests: { id: string; name: string; icon: string }[];
  };
  availableForHire: boolean;
}

const platformIcons: { [key: string]: React.ReactNode } = {
  github: <Github className="h-5 w-5" />,
  linkedin: <Linkedin className="h-5 w-5" />,
  twitter: <Twitter className="h-5 w-5" />,
  instagram: <Instagram className="h-5 w-5" />,
  youtube: <Youtube className="h-5 w-5" />,
};

const levelColors = {
  beginner: 'bg-blue-500',
  intermediate: 'bg-green-500',
  advanced: 'bg-orange-500',
  expert: 'bg-purple-500',
};

const levelLabels = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
  expert: 'Especialista',
};

const proficiencyLabels = {
  basic: 'Básico',
  conversational: 'Conversacional',
  fluent: 'Fluente',
  native: 'Nativo',
};

export default function CurriculumPage() {
  const { t } = useI18n();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch('/api/profile');
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { year: 'numeric' });
  };

  const formatMonthYear = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="w-full max-w-[1200px] mx-auto px-4 py-20 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-32 w-32 bg-muted rounded-full mx-auto"></div>
          <div className="h-8 w-64 bg-muted rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="w-full max-w-[1200px] mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Erro ao carregar currículo</p>
      </div>
    );
  }

  const { profile, curriculum } = profileData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Hero Section - Two Column Layout */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column - Photo */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 rounded-3xl blur-xl opacity-30"></div>
                <Avatar className="relative h-48 w-48 md:h-56 md:w-56 border-4 border-white shadow-2xl rounded-3xl">
                  <AvatarImage 
                    src={profile.avatar} 
                    alt={profile.name}
                    className="object-cover rounded-3xl"
                  />
                  <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-primary to-purple-600 text-white rounded-3xl">
                    {profile.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || '?'}
                  </AvatarFallback>
                </Avatar>
                
                {profileData.availableForHire && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg flex items-center gap-1"
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    Disponível
                  </motion.div>
                )}
              </motion.div>

              {/* Social Links - Below Photo */}
              {profile.social.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-2 mt-6"
                >
                  {profile.social.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 text-muted-foreground hover:text-primary border border-border/50"
                      title={social.platform}
                    >
                      {platformIcons[social.platform] || <ExternalLink className="h-5 w-5" />}
                    </a>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Right Column - Info */}
            <div className="md:col-span-8 text-center md:text-left space-y-5">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {profile.name}
                </h1>
                <p className="text-xl md:text-2xl text-primary font-medium mt-2">
                  {profile.title}
                </p>
              </motion.div>

              {/* Bio */}
              {(curriculum.summary || profile.bio) && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground text-lg leading-relaxed max-w-xl"
                >
                  {curriculum.summary || profile.bio}
                </motion.p>
              )}

              {/* Contact Info Row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center md:justify-start gap-4 text-sm"
              >
                {profile.location && (
                  <div className="flex items-center gap-1.5 text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                    <MapPin className="h-4 w-4 text-primary" />
                    {profile.location}
                  </div>
                )}
                {profile.email && !profile.emailPrivate && (
                  <a 
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-1.5 text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {profile.email}
                  </a>
                )}
                {profile.phone && !profile.phonePrivate && (
                  <a 
                    href={`tel:${profile.phone}`}
                    className="flex items-center gap-1.5 text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    {profile.phone}
                  </a>
                )}
                {profile.website && (
                  <a 
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    <Globe className="h-4 w-4" />
                    Website
                  </a>
                )}
              </motion.div>

              {/* Download CV Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button size="lg" className="gap-2 rounded-full px-8 shadow-lg hover:shadow-xl transition-shadow">
                  <Download className="w-4 h-4" />
                  {t('curriculum.downloadCV')}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Content Sections */}
        <div className="space-y-12">
          
          {/* Experience Timeline */}
          {curriculum.experience.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Experiência Profissional</h2>
              </div>
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent md:left-6"></div>
                
                <div className="space-y-8">
                  {curriculum.experience.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-12 md:pl-16"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-2 md:left-4 top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-md"></div>
                      
                      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border/50">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                            <p className="text-lg text-primary font-medium">{exp.company}</p>
                            {exp.location && (
                              <p className="text-sm text-muted-foreground mt-1">{exp.location}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full whitespace-nowrap">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatMonthYear(exp.startDate)} — {exp.current ? 'Atual' : formatMonthYear(exp.endDate)}
                          </div>
                        </div>
                        {exp.description && (
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {/* Education Timeline */}
          {curriculum.education.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-purple-500/10 rounded-xl">
                  <GraduationCap className="h-6 w-6 text-purple-500" />
                </div>
                <h2 className="text-2xl font-bold">Formação Acadêmica</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {curriculum.education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border/50"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-lg font-bold">{edu.degree}</h3>
                        <p className="text-primary font-medium">{edu.institution}</p>
                      </div>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full whitespace-nowrap">
                        {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                      </span>
                    </div>
                    {edu.field && (
                      <p className="text-sm text-muted-foreground mb-2">{edu.field}</p>
                    )}
                    {edu.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed">{edu.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Skills Section - Visual Bars */}
          {curriculum.skills.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-orange-500/10 rounded-xl">
                  <Award className="h-6 w-6 text-orange-500" />
                </div>
                <h2 className="text-2xl font-bold">Habilidades</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {curriculum.skills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-border/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {levelLabels[skill.level]}
                      </Badge>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 
                          skill.level === 'beginner' ? '25%' :
                          skill.level === 'intermediate' ? '50%' :
                          skill.level === 'advanced' ? '75%' : '100%'
                        }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className={`h-full rounded-full ${levelColors[skill.level]}`}
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Languages */}
          {curriculum.languages.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-blue-500/10 rounded-xl">
                  <Languages className="h-6 w-6 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold">Idiomas</h2>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {curriculum.languages.map((lang) => (
                  <div
                    key={lang.id}
                    className="bg-white rounded-xl px-5 py-3 shadow-sm border border-border/50 flex items-center gap-3"
                  >
                    <span className="font-medium">{lang.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {proficiencyLabels[lang.proficiency]}
                    </Badge>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Certifications */}
          {curriculum.certifications.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-green-500/10 rounded-xl">
                  <Award className="h-6 w-6 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold">Certificações</h2>
              </div>
              
              <div className="space-y-3">
                {curriculum.certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-white rounded-xl p-5 shadow-sm border border-border/50 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                  >
                    <div>
                      <h3 className="font-bold text-lg">{cert.name}</h3>
                      <p className="text-muted-foreground">{cert.issuer}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{formatMonthYear(cert.date)}</span>
                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Interests */}
          {curriculum.interests.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-bold mb-4">Interesses</h2>
              <div className="flex flex-wrap gap-2">
                {curriculum.interests.map((interest) => (
                  <span
                    key={interest.id}
                    className="px-4 py-2 bg-muted/50 rounded-full text-sm text-muted-foreground"
                  >
                    {interest.name}
                  </span>
                ))}
              </div>
            </motion.section>
          )}

          {/* Private Info Footer */}
          {(profile.emailPrivate || profile.phonePrivate) && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3 text-sm text-amber-800"
            >
              <Lock className="h-5 w-5 text-amber-600 flex-shrink-0" />
              <span>
                Algumas informações de contato estão ocultas. Baixe o PDF completo para acessar todas as informações.
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
