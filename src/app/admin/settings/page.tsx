'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Save, Globe, Palette, Search, FileEdit, Check } from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';

const languages = [
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

const themes = [
  { id: 'modern', label: 'Moderno', description: 'Design clean e minimalista' },
  { id: 'creative', label: 'Criativo', description: 'Cores vibrantes e animações' },
  { id: 'professional', label: 'Profissional', description: 'Layout corporativo elegante' },
  { id: 'dark', label: 'Dark Mode', description: 'Tema escuro sofisticado' },
];

export default function AdminSettingsPage() {
  const { t, locale } = useI18n();
  const [activeTab, setActiveTab] = useState('general');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  
  const [settings, setSettings] = useState({
    // General
    mainLanguage: locale,
    theme: 'modern',
    siteName: 'Portfolio',
    siteDescription: 'Creative Portfolio showcasing design, development, and 3D work',
    
    // SEO
    metaTitle: {
      pt: 'Portfólio Criativo | Design, Código & 3D',
      en: 'Creative Portfolio | Design, Code & 3D',
      es: 'Portafolio Creativo | Diseño, Código & 3D',
    },
    metaDescription: {
      pt: 'Um showcase de trabalhos criativos em design, desenvolvimento, modelagem 3D e artes digitais',
      en: 'A showcase of creative work spanning design, development, 3D modeling, and digital arts',
      es: 'Una muestra de trabajos creativos en diseño, desarrollo, modelado 3D y artes digitales',
    },
    keywords: 'portfolio, design, development, 3d, creative, web development, ui/ux',
    author: 'Willer Xavier Reis',
    robots: 'index, follow',
    
    // Features
    enableBlog: true,
    enablePortfolio: true,
    enableCurriculum: true,
    enableDarkMode: true,
    enableAnimations: true,
    enableAnalytics: false,
    analyticsId: '',
    
    // Advanced
    cacheEnabled: true,
    lazyLoading: true,
    imageOptimization: true,
  });

  const handleSave = async () => {
    setSaveStatus('saving');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateMeta = (lang: string, field: 'metaTitle' | 'metaDescription', value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: value,
      },
    }));
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Configurações</h1>
            <p className="text-muted-foreground mt-1">Gerencie idioma, tema, SEO e preferências do site</p>
          </div>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={saveStatus === 'saving'}
          className="gap-2"
        >
          {saveStatus === 'saving' ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Salvando...
            </>
          ) : saveStatus === 'saved' ? (
            <>
              <Check className="h-4 w-4" />
              Salvo!
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Salvar Configurações
            </>
          )}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="general" className="gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Geral</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Aparência</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="gap-2">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">SEO</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="gap-2">
            <FileEdit className="h-4 w-4" />
            <span className="hidden sm:inline">Avançado</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Idioma Principal</CardTitle>
              <CardDescription>
                Defina o idioma padrão do seu portfólio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    onClick={() => updateSetting('mainLanguage', lang.code)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      settings.mainLanguage === lang.code
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{lang.flag}</div>
                    <div className="font-medium">{lang.label}</div>
                    <div className="text-xs text-muted-foreground">{lang.code.toUpperCase()}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informações do Site</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Nome do Site</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => updateSetting('siteName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Descrição</Label>
                <Textarea
                  id="siteDescription"
                  rows={3}
                  value={settings.siteDescription}
                  onChange={(e) => updateSetting('siteDescription', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tema Visual</CardTitle>
              <CardDescription>
                Escolha o template que melhor representa seu trabalho
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    onClick={() => updateSetting('theme', theme.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      settings.theme === theme.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="font-medium mb-1">{theme.label}</div>
                    <div className="text-sm text-muted-foreground">{theme.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Funcionalidades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Blog</Label>
                  <div className="text-sm text-muted-foreground">Exibir seção de blog</div>
                </div>
                <Switch
                  checked={settings.enableBlog}
                  onCheckedChange={(checked) => updateSetting('enableBlog', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Portfólio</Label>
                  <div className="text-sm text-muted-foreground">Exibir seção de projetos</div>
                </div>
                <Switch
                  checked={settings.enablePortfolio}
                  onCheckedChange={(checked) => updateSetting('enablePortfolio', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Currículo</Label>
                  <div className="text-sm text-muted-foreground">Exibir seção de currículo</div>
                </div>
                <Switch
                  checked={settings.enableCurriculum}
                  onCheckedChange={(checked) => updateSetting('enableCurriculum', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <div className="text-sm text-muted-foreground">Permitir tema escuro</div>
                </div>
                <Switch
                  checked={settings.enableDarkMode}
                  onCheckedChange={(checked) => updateSetting('enableDarkMode', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Animações</Label>
                  <div className="text-sm text-muted-foreground">Ativar animações e transições</div>
                </div>
                <Switch
                  checked={settings.enableAnimations}
                  onCheckedChange={(checked) => updateSetting('enableAnimations', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Global</CardTitle>
              <CardDescription>
                Configure as meta tags para cada idioma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="pt" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  {languages.map((lang) => (
                    <TabsTrigger key={lang.code} value={lang.code} className="gap-2">
                      <span>{lang.flag}</span>
                      <span className="hidden sm:inline">{lang.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {languages.map((lang) => (
                  <TabsContent key={lang.code} value={lang.code} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Meta Título</Label>
                      <Input
                        value={settings.metaTitle[lang.code as keyof typeof settings.metaTitle]}
                        onChange={(e) => updateMeta(lang.code, 'metaTitle', e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        {(settings.metaTitle[lang.code as keyof typeof settings.metaTitle] || '').length}/60 caracteres
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Meta Descrição</Label>
                      <Textarea
                        rows={3}
                        value={settings.metaDescription[lang.code as keyof typeof settings.metaDescription]}
                        onChange={(e) => updateMeta(lang.code, 'metaDescription', e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        {(settings.metaDescription[lang.code as keyof typeof settings.metaDescription] || '').length}/160 caracteres
                      </p>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurações Avançadas SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords (separadas por vírgula)</Label>
                <Input
                  id="keywords"
                  value={settings.keywords}
                  onChange={(e) => updateSetting('keywords', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Autor</Label>
                <Input
                  id="author"
                  value={settings.author}
                  onChange={(e) => updateSetting('author', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Robots</Label>
                <Select
                  value={settings.robots}
                  onValueChange={(value) => updateSetting('robots', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="index, follow">Indexar e Seguir (Padrão)</SelectItem>
                    <SelectItem value="noindex, follow">Não Indexar, Seguir</SelectItem>
                    <SelectItem value="index, nofollow">Indexar, Não Seguir</SelectItem>
                    <SelectItem value="noindex, nofollow">Não Indexar, Não Seguir</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>
                Otimize a velocidade do seu site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cache de Páginas</Label>
                  <div className="text-sm text-muted-foreground">Armazenar páginas em cache para carregamento mais rápido</div>
                </div>
                <Switch
                  checked={settings.cacheEnabled}
                  onCheckedChange={(checked) => updateSetting('cacheEnabled', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Lazy Loading de Imagens</Label>
                  <div className="text-sm text-muted-foreground">Carregar imagens apenas quando visíveis</div>
                </div>
                <Switch
                  checked={settings.lazyLoading}
                  onCheckedChange={(checked) => updateSetting('lazyLoading', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Otimização de Imagens</Label>
                  <div className="text-sm text-muted-foreground">Compressão automática e formato WebP</div>
                </div>
                <Switch
                  checked={settings.imageOptimization}
                  onCheckedChange={(checked) => updateSetting('imageOptimization', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Google Analytics</Label>
                  <div className="text-sm text-muted-foreground">Rastrear visitantes do site</div>
                </div>
                <Switch
                  checked={settings.enableAnalytics}
                  onCheckedChange={(checked) => updateSetting('enableAnalytics', checked)}
                />
              </div>
              {settings.enableAnalytics && (
                <div className="space-y-2 pt-2">
                  <Label htmlFor="analyticsId">Tracking ID (GA4)</Label>
                  <Input
                    id="analyticsId"
                    placeholder="G-XXXXXXXXXX"
                    value={settings.analyticsId}
                    onChange={(e) => updateSetting('analyticsId', e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
