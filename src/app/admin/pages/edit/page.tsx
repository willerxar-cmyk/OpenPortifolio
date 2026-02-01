'use client';

import { useState, useEffect } from 'react';
import { Puck } from '@measured/puck';
import type { Data } from '@measured/puck';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePages } from '@/hooks/usePages';
import { toast } from 'sonner';
import { slugify } from '@/lib/slug';

// Mesma configuração do Puck
const config = {
  components: {
    Heading: {
      fields: {
        text: { type: 'text' },
        align: {
          type: 'radio',
          options: [
            { label: 'Esquerda', value: 'left' },
            { label: 'Centro', value: 'center' },
            { label: 'Direita', value: 'right' },
          ],
        },
      },
      defaultProps: {
        text: 'Título',
        align: 'center',
      },
      render: (props: { text: string; align: string }) => {
        const alignMap: { [key: string]: string } = {
          left: 'text-left',
          center: 'text-center',
          right: 'text-right',
        };
        const alignClass = alignMap[props.align] || 'text-center';
        return <h1 className={`text-4xl font-bold mb-6 ${alignClass}`}>{props.text}</h1>;
      },
    },
    Text: {
      fields: {
        content: { type: 'textarea' },
      },
      defaultProps: {
        content: 'Conteúdo...',
      },
      render: (props: { content: string }) => (
        <p className="text-lg text-muted-foreground mb-6">{props.content}</p>
      ),
    },
    Button: {
      fields: {
        label: { type: 'text' },
        url: { type: 'text' },
        variant: {
          type: 'select',
          options: [
            { label: 'Primário', value: 'primary' },
            { label: 'Secundário', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
          ],
        },
      },
      defaultProps: {
        label: 'Botão',
        url: '#',
        variant: 'primary',
      },
      render: (props: { label: string; url: string; variant: string }) => {
        const variantMap: { [key: string]: string } = {
          primary: 'bg-primary text-primary-foreground',
          secondary: 'bg-secondary text-secondary-foreground',
          outline: 'border-2 border-primary text-primary',
        };
        const variantClass = variantMap[props.variant] || 'bg-primary text-primary-foreground';
        return (
          <a href={props.url} className={`inline-flex items-center justify-center rounded-lg px-8 py-3 mb-6 ${variantClass}`}>
            {props.label}
          </a>
        );
      },
    },
    Card: {
      fields: {
        title: { type: 'text' },
        content: { type: 'textarea' },
      },
      defaultProps: {
        title: 'Card',
        content: 'Conteúdo...',
      },
      render: (props: { title: string; content: string }) => (
        <div className="p-6 bg-card border rounded-xl mb-6">
          <h3 className="text-xl font-semibold mb-3">{props.title}</h3>
          <p className="text-muted-foreground">{props.content}</p>
        </div>
      ),
    },
    Image: {
      fields: {
        src: { type: 'text' },
        alt: { type: 'text' },
      },
      defaultProps: {
        src: '/images/placeholder.jpg',
        alt: 'Imagem',
      },
      render: (props: { src: string; alt: string }) => (
        <img src={props.src} alt={props.alt} className="w-full h-auto rounded-xl mb-6" />
      ),
    },
    Space: {
      fields: {
        height: {
          type: 'select',
          options: [
            { label: 'Pequeno', value: 'small' },
            { label: 'Médio', value: 'medium' },
            { label: 'Grande', value: 'large' },
          ],
        },
      },
      defaultProps: { height: 'medium' },
      render: (props: { height: string }) => {
        const heightMap: { [key: string]: string } = {
          small: '24px',
          medium: '48px',
          large: '96px',
        };
        return <div style={{ height: heightMap[props.height] || '48px' }} />;
      },
    },
  },
};

export default function EditPagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageId = searchParams.get('id');
  const { getPageById, updatePage, isLoading } = usePages();
  
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [data, setData] = useState<Data>({
    content: [],
    root: { props: {} },
  });

  useEffect(() => {
    if (pageId) {
      const page = getPageById(pageId);
      if (page) {
        setTitle(page.title);
        setSlug(page.slug);
        setData(page.content || { content: [], root: { props: {} } });
      }
    }
  }, [pageId, getPageById]);

  const handleSave = async () => {
    if (!pageId) return;
    
    try {
      await updatePage(pageId, {
        title,
        slug,
        content: data,
      });
      toast.success('Página atualizada!');
      router.push('/admin/pages');
    } catch (error) {
      toast.error('Erro ao salvar');
    }
  };

  if (isLoading) {
    return <div className="p-10 text-center">Carregando...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b bg-background p-4">
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/pages">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Editar Página</h1>
              <p className="text-sm text-muted-foreground">Edite o conteúdo com o editor visual</p>
            </div>
          </div>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Salvar
          </Button>
        </div>
      </div>

      <div className="bg-muted/50 border-b p-4">
        <div className="w-full max-w-[1200px] mx-auto">
          <Card>
            <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Puck config={config as any} data={data} onChange={setData} />
      </div>
    </div>
  );
}
