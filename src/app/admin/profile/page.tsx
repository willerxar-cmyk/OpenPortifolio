'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import { Save, User, Briefcase, GraduationCap, Award, Languages, Heart, Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Lock, EyeOff, Globe, Link2, FileText, Download, Printer } from 'lucide-react';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Types for curriculum sections
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

interface Interest {
  id: string;
  name: string;
  icon: string;
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
  stats: {
    projectsCompleted: number;
    yearsExperience: number;
    happyClients: number;
    awards: number;
  };
  curriculum: {
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    languages: Language[];
    certifications: Certification[];
    interests: Interest[];
  };
  availableForHire: boolean;
}

const SOCIAL_PLATFORMS = [
  { value: 'github', label: 'GitHub', icon: 'github' },
  { value: 'linkedin', label: 'LinkedIn', icon: 'linkedin' },
  { value: 'twitter', label: 'Twitter / X', icon: 'twitter' },
  { value: 'dribbble', label: 'Dribbble', icon: 'dribbble' },
  { value: 'behance', label: 'Behance', icon: 'behance' },
  { value: 'instagram', label: 'Instagram', icon: 'instagram' },
  { value: 'facebook', label: 'Facebook', icon: 'facebook' },
  { value: 'youtube', label: 'YouTube', icon: 'youtube' },
  { value: 'tiktok', label: 'TikTok', icon: 'tiktok' },
  { value: 'medium', label: 'Medium', icon: 'medium' },
  { value: 'dev', label: 'Dev.to', icon: 'dev' },
  { value: 'other', label: 'Outro', icon: 'link' },
];

export default function AdminProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch('/api/profile');
      const data = await response.json();
      
      // Migrate old social format to new array format
      let socialLinks: SocialLink[] = [];
      if (data.profile?.social && Array.isArray(data.profile.social)) {
        socialLinks = data.profile.social;
      } else if (data.profile?.social && typeof data.profile.social === 'object') {
        // Convert old object format to array
        socialLinks = Object.entries(data.profile.social)
          .filter(([_, url]) => url)
          .map(([platform, url]) => ({
            id: Date.now().toString() + Math.random(),
            platform,
            url: url as string,
          }));
      }
      
      // Ensure curriculum structure exists
      const fullData = {
        ...data,
        profile: {
          ...data.profile,
          emailPrivate: data.profile?.emailPrivate ?? false,
          phonePrivate: data.profile?.phonePrivate ?? false,
          social: socialLinks,
        },
        curriculum: data.curriculum || {
          summary: '',
          experience: [],
          education: [],
          skills: [],
          languages: [],
          certifications: [],
          interests: [],
        },
        availableForHire: data.availableForHire ?? true,
      };
      
      setProfileData(fullData);
    } catch (error) {
      toast.error('Erro ao carregar dados do perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!profileData) return;
    
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      
      if (response.ok) {
        toast.success('Perfil salvo com sucesso!');
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      toast.error('Erro ao salvar perfil');
    }
  };

  const updateProfile = (field: string, value: any) => {
    if (!profileData) return;
    setProfileData({
      ...profileData,
      profile: { ...profileData.profile, [field]: value },
    });
  };

  const updateStats = (field: string, value: number) => {
    if (!profileData) return;
    setProfileData({
      ...profileData,
      stats: { ...profileData.stats, [field]: value },
    });
  };

  // Curriculum CRUD operations
  const addItem = <T extends { id: string }>(section: keyof ProfileData['curriculum'], item: Omit<T, 'id'>) => {
    if (!profileData) return;
    const newItem = { ...item, id: Date.now().toString() } as T;
    setProfileData({
      ...profileData,
      curriculum: {
        ...profileData.curriculum,
        [section]: [...(profileData.curriculum[section] as unknown as T[]), newItem],
      },
    });
  };

  const updateItem = <T extends { id: string }>(section: keyof ProfileData['curriculum'], id: string, updates: Partial<T>) => {
    if (!profileData) return;
    setProfileData({
      ...profileData,
      curriculum: {
        ...profileData.curriculum,
        [section]: (profileData.curriculum[section] as unknown as T[]).map((item) =>
          item.id === id ? { ...item, ...updates } : item
        ),
      },
    });
  };

  const deleteItem = <T extends { id: string }>(section: keyof ProfileData['curriculum'], id: string) => {
    if (!profileData) return;
    setProfileData({
      ...profileData,
      curriculum: {
        ...profileData.curriculum,
        [section]: (profileData.curriculum[section] as unknown as T[]).filter((item) => item.id !== id),
      },
    });
  };

  const moveItem = <T extends { id: string }>(section: keyof ProfileData['curriculum'], id: string, direction: 'up' | 'down') => {
    if (!profileData) return;
    const items = [...(profileData.curriculum[section] as unknown as T[])];
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;
    
    [items[index], items[newIndex]] = [items[newIndex], items[index]];
    
    setProfileData({
      ...profileData,
      curriculum: { ...profileData.curriculum, [section]: items },
    });
  };

  if (loading) return <div className="p-10 text-center">Carregando...</div>;
  if (!profileData) return <div className="p-10 text-center">Erro ao carregar perfil</div>;

  const { profile, stats, curriculum, availableForHire } = profileData;

  const renderSection = (title: string, icon: React.ReactNode, sectionKey: string, content: React.ReactNode) => (
    <Card className="overflow-hidden">
      <CardHeader 
        className="cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setActiveSection(activeSection === sectionKey ? null : sectionKey)}
      >
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            {title}
          </div>
          {activeSection === sectionKey ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </CardTitle>
      </CardHeader>
      {activeSection === sectionKey && <CardContent className="pt-4">{content}</CardContent>}
    </Card>
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Perfil e Currículo</h1>
          <p className="text-muted-foreground mt-1">Gerencie suas informações pessoais e currículo profissional</p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Salvar Tudo
        </Button>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informações Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <Label>Foto de Perfil</Label>
              <ImageUpload
                value={profile.avatar}
                onChange={(url) => updateProfile('avatar', url || '')}
                folder="avatar"
                aspectRatio="square"
              />
            </div>
            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome *</Label>
                  <Input 
                    value={profile.name}
                    onChange={(e) => updateProfile('name', e.target.value)}
                    placeholder="Seu nome completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Título / Cargo</Label>
                  <Input 
                    value={profile.title}
                    onChange={(e) => updateProfile('title', e.target.value)}
                    placeholder="Ex: Desenvolvedor Full Stack"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea 
                  value={profile.bio}
                  onChange={(e) => updateProfile('bio', e.target.value)}
                  placeholder="Uma breve descrição sobre você"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Email</Label>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={profile.emailPrivate}
                        onCheckedChange={(checked) => updateProfile('emailPrivate', checked)}
                      />
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Lock className="h-3 w-3" />
                        Privado (apenas PDF)
                      </span>
                    </div>
                  </div>
                  <Input 
                    type="email"
                    value={profile.email}
                    onChange={(e) => updateProfile('email', e.target.value)}
                    placeholder="seu@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Telefone</Label>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={profile.phonePrivate}
                        onCheckedChange={(checked) => updateProfile('phonePrivate', checked)}
                      />
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Lock className="h-3 w-3" />
                        Privado (apenas PDF)
                      </span>
                    </div>
                  </div>
                  <Input 
                    value={profile.phone}
                    onChange={(e) => updateProfile('phone', e.target.value)}
                    placeholder="+55 (11) 99999-9999"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Localização</Label>
                  <Input 
                    value={profile.location}
                    onChange={(e) => updateProfile('location', e.target.value)}
                    placeholder="Cidade, Estado"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input 
                    value={profile.website}
                    onChange={(e) => updateProfile('website', e.target.value)}
                    placeholder="https://seusite.com"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">Redes Sociais</h3>
            <div className="space-y-3">
              {profile.social.map((social, index) => (
                <div key={social.id} className="flex items-center gap-3">
                  <Select
                    value={social.platform}
                    onValueChange={(value) => {
                      const newSocial = [...profile.social];
                      newSocial[index] = { ...social, platform: value };
                      setProfileData({
                        ...profileData,
                        profile: { ...profile, social: newSocial },
                      });
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {SOCIAL_PLATFORMS.map((platform) => (
                        <SelectItem key={platform.value} value={platform.value}>
                          {platform.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    value={social.url}
                    onChange={(e) => {
                      const newSocial = [...profile.social];
                      newSocial[index] = { ...social, url: e.target.value };
                      setProfileData({
                        ...profileData,
                        profile: { ...profile, social: newSocial },
                      });
                    }}
                    placeholder="https://..."
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => {
                      const newSocial = profile.social.filter((_, i) => i !== index);
                      setProfileData({
                        ...profileData,
                        profile: { ...profile, social: newSocial },
                      });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => {
                  setProfileData({
                    ...profileData,
                    profile: {
                      ...profile,
                      social: [
                        ...profile.social,
                        { id: Date.now().toString(), platform: 'other', url: '' },
                      ],
                    },
                  });
                }}
              >
                <Plus className="h-4 w-4" />
                Adicionar Rede Social
              </Button>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">Estatísticas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(stats).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                  <Input 
                    type="number"
                    value={value}
                    onChange={(e) => updateStats(key, parseInt(e.target.value) || 0)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4 flex items-center gap-2">
            <Switch 
              checked={availableForHire} 
              onCheckedChange={(checked) => setProfileData({ ...profileData, availableForHire: checked })}
            />
            <Label>Disponível para trabalho</Label>
          </div>
        </CardContent>
      </Card>

      {/* Curriculum Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Profissional</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={curriculum.summary}
            onChange={(e) => setProfileData({
              ...profileData,
              curriculum: { ...curriculum, summary: e.target.value },
            })}
            placeholder="Um resumo profissional para seu currículo..."
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Experience Section */}
      {renderSection('Experiência Profissional', <Briefcase className="h-5 w-5" />, 'experience',
        <div className="space-y-4">
          {curriculum.experience.map((exp, index) => (
            <div key={exp.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    disabled={index === 0}
                    onClick={() => moveItem<Experience>('experience', exp.id, 'up')}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    disabled={index === curriculum.experience.length - 1}
                    onClick={() => moveItem<Experience>('experience', exp.id, 'down')}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-destructive"
                  onClick={() => deleteItem<Experience>('experience', exp.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Empresa"
                  value={exp.company}
                  onChange={(e) => updateItem<Experience>('experience', exp.id, { company: e.target.value })}
                />
                <Input
                  placeholder="Cargo"
                  value={exp.role}
                  onChange={(e) => updateItem<Experience>('experience', exp.id, { role: e.target.value })}
                />
                <Input
                  placeholder="Localização"
                  value={exp.location}
                  onChange={(e) => updateItem<Experience>('experience', exp.id, { location: e.target.value })}
                />
                <div className="flex items-center gap-2">
                  <Switch
                    checked={exp.current}
                    onCheckedChange={(checked) => updateItem<Experience>('experience', exp.id, { current: checked })}
                  />
                  <Label className="text-sm">Emprego atual</Label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="month"
                  placeholder="Data início"
                  value={exp.startDate}
                  onChange={(e) => updateItem<Experience>('experience', exp.id, { startDate: e.target.value })}
                />
                {!exp.current && (
                  <Input
                    type="month"
                    placeholder="Data fim"
                    value={exp.endDate}
                    onChange={(e) => updateItem<Experience>('experience', exp.id, { endDate: e.target.value })}
                  />
                )}
              </div>
              <Textarea
                placeholder="Descrição das atividades"
                value={exp.description}
                onChange={(e) => updateItem<Experience>('experience', exp.id, { description: e.target.value })}
                rows={3}
              />
            </div>
          ))}
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => addItem<Experience>('experience', {
              company: '',
              role: '',
              location: '',
              startDate: '',
              endDate: '',
              current: false,
              description: '',
            })}
          >
            <Plus className="h-4 w-4" />
            Adicionar Experiência
          </Button>
        </div>
      )}

      {/* Education Section */}
      {renderSection('Educação', <GraduationCap className="h-5 w-5" />, 'education',
        <div className="space-y-4">
          {curriculum.education.map((edu, index) => (
            <div key={edu.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-end">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-destructive"
                  onClick={() => deleteItem<Education>('education', edu.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Instituição"
                  value={edu.institution}
                  onChange={(e) => updateItem<Education>('education', edu.id, { institution: e.target.value })}
                />
                <Input
                  placeholder="Grau (Ex: Bacharelado)"
                  value={edu.degree}
                  onChange={(e) => updateItem<Education>('education', edu.id, { degree: e.target.value })}
                />
                <Input
                  placeholder="Área de estudo"
                  value={edu.field}
                  onChange={(e) => updateItem<Education>('education', edu.id, { field: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="month"
                  placeholder="Data início"
                  value={edu.startDate}
                  onChange={(e) => updateItem<Education>('education', edu.id, { startDate: e.target.value })}
                />
                <Input
                  type="month"
                  placeholder="Data conclusão"
                  value={edu.endDate}
                  onChange={(e) => updateItem<Education>('education', edu.id, { endDate: e.target.value })}
                />
              </div>
              <Textarea
                placeholder="Descrição"
                value={edu.description}
                onChange={(e) => updateItem<Education>('education', edu.id, { description: e.target.value })}
                rows={2}
              />
            </div>
          ))}
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => addItem<Education>('education', {
              institution: '',
              degree: '',
              field: '',
              startDate: '',
              endDate: '',
              description: '',
            })}
          >
            <Plus className="h-4 w-4" />
            Adicionar Educação
          </Button>
        </div>
      )}

      {/* Skills Section */}
      {renderSection('Habilidades', <Award className="h-5 w-5" />, 'skills',
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {curriculum.skills.map((skill) => (
              <Badge key={skill.id} variant="secondary" className="gap-2 px-3 py-1">
                <span>{skill.name}</span>
                <select
                  value={skill.level}
                  onChange={(e) => updateItem<Skill>('skills', skill.id, { level: e.target.value as any })}
                  className="bg-transparent text-xs outline-none cursor-pointer"
                >
                  <option value="beginner">Iniciante</option>
                  <option value="intermediate">Intermediário</option>
                  <option value="advanced">Avançado</option>
                  <option value="expert">Especialista</option>
                </select>
                <button
                  onClick={() => deleteItem<Skill>('skills', skill.id)}
                  className="hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Nova habilidade..."
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const input = e.target as HTMLInputElement;
                  if (input.value.trim()) {
                    addItem<Skill>('skills', {
                      name: input.value.trim(),
                      level: 'intermediate',
                      category: 'general',
                    });
                    input.value = '';
                  }
                }
              }}
            />
            <Button
              variant="outline"
              onClick={() => {
                const input = document.querySelector('input[placeholder="Nova habilidade..."]') as HTMLInputElement;
                if (input?.value.trim()) {
                  addItem<Skill>('skills', {
                    name: input.value.trim(),
                    level: 'intermediate',
                    category: 'general',
                  });
                  input.value = '';
                }
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Languages Section */}
      {renderSection('Idiomas', <Languages className="h-5 w-5" />, 'languages',
        <div className="space-y-4">
          {curriculum.languages.map((lang) => (
            <div key={lang.id} className="flex items-center gap-4 border rounded-lg p-3">
              <Input
                placeholder="Idioma"
                value={lang.name}
                onChange={(e) => updateItem<Language>('languages', lang.id, { name: e.target.value })}
                className="flex-1"
              />
              <select
                value={lang.proficiency}
                onChange={(e) => updateItem<Language>('languages', lang.id, { proficiency: e.target.value as any })}
                className="border rounded px-3 py-2 text-sm"
              >
                <option value="basic">Básico</option>
                <option value="conversational">Conversacional</option>
                <option value="fluent">Fluente</option>
                <option value="native">Nativo</option>
              </select>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive"
                onClick={() => deleteItem<Language>('languages', lang.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => addItem<Language>('languages', {
              name: '',
              proficiency: 'conversational',
            })}
          >
            <Plus className="h-4 w-4" />
            Adicionar Idioma
          </Button>
        </div>
      )}

      {/* Certifications Section */}
      {renderSection('Certificações', <Award className="h-5 w-5" />, 'certifications',
        <div className="space-y-4">
          {curriculum.certifications.map((cert) => (
            <div key={cert.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                  onClick={() => deleteItem<Certification>('certifications', cert.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input
                placeholder="Nome da certificação"
                value={cert.name}
                onChange={(e) => updateItem<Certification>('certifications', cert.id, { name: e.target.value })}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Instituição emissora"
                  value={cert.issuer}
                  onChange={(e) => updateItem<Certification>('certifications', cert.id, { issuer: e.target.value })}
                />
                <Input
                  type="month"
                  placeholder="Data"
                  value={cert.date}
                  onChange={(e) => updateItem<Certification>('certifications', cert.id, { date: e.target.value })}
                />
              </div>
              <Input
                placeholder="URL da credencial (opcional)"
                value={cert.url}
                onChange={(e) => updateItem<Certification>('certifications', cert.id, { url: e.target.value })}
              />
            </div>
          ))}
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => addItem<Certification>('certifications', {
              name: '',
              issuer: '',
              date: '',
              url: '',
            })}
          >
            <Plus className="h-4 w-4" />
            Adicionar Certificação
          </Button>
        </div>
      )}

      {/* Interests Section */}
      {renderSection('Interesses', <Heart className="h-5 w-5" />, 'interests',
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {curriculum.interests.map((interest) => (
              <Badge key={interest.id} variant="outline" className="gap-2 px-3 py-1">
                <Input
                  value={interest.name}
                  onChange={(e) => updateItem<Interest>('interests', interest.id, { name: e.target.value })}
                  className="w-24 h-6 border-0 p-0 bg-transparent focus-visible:ring-0"
                />
                <button
                  onClick={() => deleteItem<Interest>('interests', interest.id)}
                  className="hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Novo interesse..."
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const input = e.target as HTMLInputElement;
                  if (input.value.trim()) {
                    addItem<Interest>('interests', {
                      name: input.value.trim(),
                      icon: '',
                    });
                    input.value = '';
                  }
                }
              }}
            />
            <Button
              variant="outline"
              onClick={() => {
                const input = document.querySelector('input[placeholder="Novo interesse..."]') as HTMLInputElement;
                if (input?.value.trim()) {
                  addItem<Interest>('interests', {
                    name: input.value.trim(),
                    icon: '',
                  });
                  input.value = '';
                }
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* PDF Preview & Download Section */}
      <Card className="overflow-hidden border-primary/20">
        <CardHeader 
          className="cursor-pointer hover:bg-muted/50 transition-colors bg-primary/5"
          onClick={() => setActiveSection(activeSection === 'pdf' ? null : 'pdf')}
        >
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Preview & Download PDF
            </div>
            {activeSection === 'pdf' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </CardTitle>
        </CardHeader>
        {activeSection === 'pdf' && (
          <CardContent className="pt-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Button 
                onClick={() => window.open('/curriculum', '_blank')}
                variant="outline"
                className="gap-2"
              >
                <EyeOff className="h-4 w-4" />
                Ver Curriculum Online
              </Button>
              <Button 
                onClick={() => {
                  const printWindow = window.open('/curriculum', '_blank');
                  if (printWindow) {
                    printWindow.onload = () => {
                      printWindow.print();
                    };
                  }
                }}
                className="gap-2"
              >
                <Printer className="h-4 w-4" />
                Imprimir / Salvar PDF
              </Button>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-2">Dicas para PDF ATS-friendly:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use a função de imprimir do navegador (Ctrl+P)</li>
                <li>Selecione "Salvar como PDF"</li>
                <li>Margens: Padrão ou Mínimas</li>
                <li>Escala: Padrão (100%)</li>
                <li>Remova cabeçalhos e rodapés nas opções</li>
                <li>O PDF incluirá todas as informações (incluindo privadas)</li>
              </ul>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
