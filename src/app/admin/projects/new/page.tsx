'use client';

import { useProjects } from '@/hooks/useProjects';
import { useI18n } from '@/contexts/I18nContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from 'next/link';
import { ArrowLeft, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import categoriesData from '@/data/categories.json';

export default function NewProjectPage() {
  const { addProject } = useProjects();
  const { t } = useI18n();
  const router = useRouter();
  const { categories } = categoriesData;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    link: '',
    githubUrl: '',
    category: '',
    subcategory: '',
    tags: '',
    published: true,
    featured: false,
  });
  
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProject = {
      title: formData.title,
      description: formData.description,
      imageUrl: formData.imageUrl || null,
      link: formData.link || null,
      githubUrl: formData.githubUrl || null,
      category: formData.category,
      subcategory: formData.subcategory,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      published: formData.published,
      featured: formData.featured,
    };
    
    addProject(newProject);
    setMessage('Project created successfully!');
    
    setTimeout(() => {
      router.push('/admin/projects');
    }, 1000);
  };

  const selectedCategory = categories.find(c => c.id === formData.category);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Button variant="ghost" asChild className="mb-4 -ml-4">
          <Link href="/admin/projects">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.addNew')} Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input 
                id="title" 
                required 
                placeholder="My Awesome Project"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea 
                id="description" 
                required 
                placeholder="Describe your project..."
                rows={4}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            {/* Category & Subcategory */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({...formData, category: value, subcategory: ''})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {t(cat.key)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Subcategory</Label>
                <Select 
                  value={formData.subcategory} 
                  onValueChange={(value) => setFormData({...formData, subcategory: value})}
                  disabled={!selectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategory?.subcategories.map((sub) => (
                      <SelectItem key={sub.id} value={sub.id}>
                        {t(sub.key)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* URLs */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input 
                  id="imageUrl" 
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="link">Project Link</Label>
                <Input 
                  id="link" 
                  placeholder="https://..."
                  value={formData.link}
                  onChange={e => setFormData({...formData, link: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input 
                  id="githubUrl" 
                  placeholder="https://github.com/..."
                  value={formData.githubUrl}
                  onChange={e => setFormData({...formData, githubUrl: e.target.value})}
                />
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input 
                id="tags" 
                placeholder="React, Next.js, TypeScript"
                value={formData.tags}
                onChange={e => setFormData({...formData, tags: e.target.value})}
              />
            </div>

            {/* Toggles */}
            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked: boolean) => setFormData({...formData, published: checked})}
                />
                <Label htmlFor="published">Published</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked: boolean) => setFormData({...formData, featured: checked})}
                />
                <Label htmlFor="featured" className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500" />
                  Featured
                </Label>
              </div>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full">
              {t('admin.save')} Project
            </Button>

            {message && (
              <p className="text-sm text-green-600 text-center">{message}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
