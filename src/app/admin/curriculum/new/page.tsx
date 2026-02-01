'use client';

import { useState } from 'react';
import { useCurriculum } from '@/hooks/useCurriculum';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Link from 'next/link';
import { ArrowLeft, Star } from 'lucide-react';
import categoriesData from '@/data/categories.json';
import { ImageUpload } from '@/components/ui/image-upload';

export default function NewCurriculumPage() {
  const { addItem } = useCurriculum();
  const router = useRouter();
  const { categories } = categoriesData;
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    imageUrl: '',
    type: 'work' as 'work' | 'education' | 'skill',
    category: '',
    tags: '',
    featured: false,
  });
  
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem = {
      title: formData.title,
      company: formData.company || null,
      location: formData.location || null,
      startDate: formData.startDate || null,
      endDate: formData.endDate || null,
      description: formData.description || null,
      imageUrl: formData.imageUrl || null,
      type: formData.type,
      category: formData.category,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      featured: formData.featured,
      order: 0,
    };
    
    addItem(newItem);
    setMessage('Item created successfully!');
    
    setTimeout(() => {
      router.push('/admin/curriculum');
    }, 1000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Button variant="ghost" asChild className="mb-4 -ml-4">
          <Link href="/admin/curriculum">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Curriculum
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Add Curriculum Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value: 'work' | 'education' | 'skill') => setFormData({...formData, type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work">Work Experience</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="skill">Skill</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title / Degree *</Label>
              <Input 
                id="title" 
                required 
                placeholder="Senior Developer / BS Computer Science"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>

            {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="company">Company / Institution</Label>
              <Input 
                id="company" 
                placeholder="Acme Corp / University of Tech"
                value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="City, Country"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>
            
            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input 
                  id="startDate" 
                  type="date"
                  value={formData.startDate}
                  onChange={e => setFormData({...formData, startDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input 
                  id="endDate" 
                  type="date"
                  value={formData.endDate}
                  onChange={e => setFormData({...formData, endDate: e.target.value})}
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({...formData, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe your responsibilities or achievements..."
                rows={4}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            {/* Image Upload - Logo/Certificate */}
            <div className="space-y-2">
              <Label>Logo / Certificate Image</Label>
              <ImageUpload
                value={formData.imageUrl}
                onChange={(url) => setFormData({...formData, imageUrl: url || ''})}
                folder="curriculum"
                aspectRatio="square"
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input 
                id="tags" 
                placeholder="React, Leadership, Management"
                value={formData.tags}
                onChange={e => setFormData({...formData, tags: e.target.value})}
              />
            </div>

            {/* Featured Toggle */}
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

            {/* Submit */}
            <Button type="submit" className="w-full">
              Add Item
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
