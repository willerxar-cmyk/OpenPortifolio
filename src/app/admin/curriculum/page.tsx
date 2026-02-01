'use client';

import { useCurriculum } from '@/hooks/useCurriculum';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Star, Calendar } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useI18n } from '@/contexts/I18nContext';

export default function AdminCurriculumPage() {
  const { items, isLoading, deleteItem } = useCurriculum();
  const { t } = useI18n();

  const formatDate = (date: string | null) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const workItems = items.filter(item => item.type === 'work');
  const educationItems = items.filter(item => item.type === 'education');
  const skillItems = items.filter(item => item.type === 'skill');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('admin.curriculum')}</h1>
          <p className="text-muted-foreground mt-1">Manage your work experience and education</p>
        </div>
        <Link href="/admin/curriculum/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Items</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No items yet</p>
              <Link href="/admin/curriculum/new">
                <Button variant="outline">Create your first item</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b"
                    >
                      <TableCell>
                        <Badge 
                          variant={item.type === 'work' ? 'default' : item.type === 'education' ? 'secondary' : 'outline'}
                          className="capitalize"
                        >
                          {item.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {item.featured && (
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          )}
                          {item.title}
                        </div>
                      </TableCell>
                      <TableCell>{item.company || '-'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {item.startDate ? formatDate(item.startDate) : 'N/A'}
                          {' - '}
                          {item.endDate ? formatDate(item.endDate) : t('curriculum.present')}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => deleteItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
