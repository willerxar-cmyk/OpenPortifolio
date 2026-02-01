'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, Eye, EyeOff, FileText } from 'lucide-react';
import { usePages } from '@/hooks/usePages';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function AdminPagesPage() {
  const { pages, isLoading, deletePage, updatePage, getStats } = usePages();

  const handleTogglePublished = async (id: string, current: boolean) => {
    await updatePage(id, { published: !current, status: !current ? 'published' : 'draft' });
    toast.success(current ? 'Página ocultada' : 'Página publicada');
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta página?')) {
      await deletePage(id);
      toast.success('Página excluída');
    }
  };

  const stats = getStats();

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Páginas</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie as páginas do seu site • {stats.published} publicadas • {stats.drafts} rascunhos
          </p>
        </div>
        <Link href="/admin/pages/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nova Página
          </Button>
        </Link>
      </div>

      {/* Pages Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Página</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Atualizado</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                </TableCell>
              </TableRow>
            ) : pages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p className="mb-4">Nenhuma página criada ainda</p>
                  <Link href="/admin/pages/new">
                    <Button variant="outline">Criar primeira página</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ) : (
              pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      {page.title}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    /{page.slug}
                  </TableCell>
                  <TableCell>
                    {page.published ? (
                      <Badge className="bg-emerald-500/15 text-emerald-600 border border-emerald-500/20">
                        Publicada
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Rascunho</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(page.updatedAt), 'dd/MM/yyyy HH:mm')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleTogglePublished(page.id, page.published)}
                      >
                        {page.published ? (
                          <Eye className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                      <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                        <Link href={`/admin/pages/edit?id=${page.id}`}>
                          <Pencil className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(page.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
