'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import profileData from '@/data/profile.json';

export default function AdminProfilePage() {
  const { profile } = profileData;
  
  const [formData, setFormData] = useState({
    name: profile.name,
    title: profile.title,
    bio: profile.bio,
    email: profile.email,
    phone: profile.phone,
    location: profile.location,
    website: profile.website,
    avatar: profile.avatar,
    social: {
      github: profile.social.github,
      linkedin: profile.social.linkedin,
      twitter: profile.social.twitter,
      dribbble: profile.social.dribbble,
      behance: profile.social.behance,
    }
  });
  
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to the server
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Edit Profile</h1>
            <p className="text-muted-foreground mt-1">Update your personal information and avatar</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar Section */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ImageUpload
              value={formData.avatar}
              onChange={(url) => setFormData({...formData, avatar: url || ''})}
              folder="avatar"
              aspectRatio="square"
            />
            <p className="text-sm text-muted-foreground text-center">
              Recommended: Square image, at least 400x400px
            </p>
          </CardContent>
        </Card>

        {/* Profile Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input 
                    id="name" 
                    required 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title / Position</Label>
                  <Input 
                    id="title" 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  rows={4}
                  value={formData.bio}
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website" 
                    value={formData.website}
                    onChange={e => setFormData({...formData, website: e.target.value})}
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input 
                      id="github" 
                      value={formData.social.github}
                      onChange={e => setFormData({...formData, social: {...formData.social, github: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input 
                      id="linkedin" 
                      value={formData.social.linkedin}
                      onChange={e => setFormData({...formData, social: {...formData.social, linkedin: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input 
                      id="twitter" 
                      value={formData.social.twitter}
                      onChange={e => setFormData({...formData, social: {...formData.social, twitter: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dribbble">Dribbble</Label>
                    <Input 
                      id="dribbble" 
                      value={formData.social.dribbble}
                      onChange={e => setFormData({...formData, social: {...formData.social, dribbble: e.target.value}})}
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full gap-2">
                <Save className="h-4 w-4" />
                Save Profile
              </Button>

              {message && (
                <p className="text-sm text-green-600 text-center">{message}</p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
