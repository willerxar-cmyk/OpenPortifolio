'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Save, Globe, Palette, Search, Menu, Check } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';
import { MenuEditor } from '@/components/MenuEditor';
import { toast } from 'sonner';

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
  const { locale } = useI18n();
  const [activeTab, setActiveTab] = useState('general');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  
  const [settings, setSettings] = useState({
    mainLanguage: locale,
    theme: 'modern',
    siteName: 'Portfolio',
    siteDescription: 'Creative Portfolio showcasing design, development, and 3D work',
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
    keywords: 'portfolio, design, development, 3d, creative',
    author: 'Willer Xavier Reis',
    robots: 'index, follow',
    enableBlog: true,
    enablePortfolio: true,
    enableDarkMode: true,
    enableAnimations: true,
  });

  const handleSave = async () => {
    setSaveStatus('saving');
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaveStatus('saved');
    toast.success('Configurações salvas!');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground mt-1">Gerencie idioma, tema, SEO e menu do site</p>
        </div>
        <Button onClick={handleSave} disabled={saveStatus === 'saving'} className="gap-2">
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
              Salvar
            </>
          )}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 lg:w-[750px]">
          <TabsTrigger value="general" className="gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Geral</span>
          </TabsTrigger>
          <TabsTrigger value="menu" className="gap-2">
            <Menu className="h-4 w-4" />
            <span className="hidden sm:inline">Menu</span>
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
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Avançado</span>
          </TabsTrigger>
        </TabsList>

        {/* General */}
        <TabsContent value="general" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Idioma Principal</CardTitle>
            </CardHeader>
            <CardContent>
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
                <Label>Nome do Site</Label>
                <Input
                  value={settings.siteName}
                  onChange={(e) => updateSetting('siteName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea
                  rows={3}
                  value={settings.siteDescription}
                  onChange={(e) => updateSetting('siteDescription', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Menu */}
        <TabsContent value="menu" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Editor de Menu</CardTitle>
            </CardHeader>
            <CardContent>
              <MenuEditor />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tema Visual</CardTitle>
            </CardHeader>
            <CardContent>
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
                  <Label>Dark Mode</Label>
                  <div className="text-sm text-muted-foreground">Permitir tema escuro</div>
                </div>
                <Switch
                  checked={settings.enableDarkMode}
                  onCheckedChange={(checked) => updateSetting('enableDarkMode', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO */}
        <TabsContent value="seo" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Global</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="pt">
                <TabsList className="grid w-full grid-cols-3">
                  {languages.map((lang) => (
                    <TabsTrigger key={lang.code} value={lang.code} className="gap-2">
                      <span>{lang.flag}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {languages.map((lang) => (
                  <TabsContent key={lang.code} value={lang.code} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Meta Título</Label>
                      <Input
                        value={settings.metaTitle[lang.code as keyof typeof settings.metaTitle]}
                        onChange={(e) => setSettings({
                          ...settings,
                          metaTitle: { ...settings.metaTitle, [lang.code]: e.target.value }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Meta Descrição</Label>
                      <Textarea
                        rows={3}
                        value={settings.metaDescription[lang.code as keyof typeof settings.metaDescription]}
                        onChange={(e) => setSettings({
                          ...settings,
                          metaDescription: { ...settings.metaDescription, [lang.code]: e.target.value }
                        })}
                      />
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced */}
        <TabsContent value="advanced" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Avançadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Keywords</Label>
                <Input
                  value={settings.keywords}
                  onChange={(e) => updateSetting('keywords', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Autor</Label>
                <Input
                  value={settings.author}
                  onChange={(e) => updateSetting('author', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
