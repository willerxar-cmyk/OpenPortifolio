'use client';

import { useState } from 'react';
import { Puck } from '@measured/puck';
import type { Data } from '@measured/puck';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePages } from '@/hooks/usePages';
import { toast } from 'sonner';
import { slugify as generateSlug } from '@/lib/slug';

// Configuração simples do Puck
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
        text: 'Título da Página',
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
        content: 'Digite seu conteúdo aqui...',
      },
      render: (props: any) => (
        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{props.content}</p>
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
        label: 'Clique aqui',
        url: '#',
        variant: 'primary',
      },
      render: (props: { label: string; url: string; variant: string }) => {
        const variantMap: { [key: string]: string } = {
          primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
          secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
          outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
        };
        const variantClass = variantMap[props.variant] || 'bg-primary text-primary-foreground';
        return (
          <div className="mb-6">
            <a
              href={props.url}
              className={`inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium transition-all ${variantClass}`}
            >
              {props.label}
            </a>
          </div>
        );
      },
    },
    Card: {
      fields: {
        title: { type: 'text' },
        content: { type: 'textarea' },
        icon: { type: 'text' },
      },
      defaultProps: {
        title: 'Título do Card',
        content: 'Conteúdo do card...',
        icon: '',
      },
      render: (props: any) => (
        <div className="p-6 bg-card border rounded-xl shadow-sm mb-6">
          <h3 className="text-xl font-semibold mb-3">{props.title}</h3>
          <p className="text-muted-foreground">{props.content}</p>
        </div>
      ),
    },
    Image: {
      fields: {
        src: { type: 'text' },
        alt: { type: 'text' },
        caption: { type: 'text' },
      },
      defaultProps: {
        src: '/images/placeholder.jpg',
        alt: 'Imagem',
        caption: '',
      },
      render: (props: any) => (
        <figure className="mb-6">
          <img 
            src={props.src} 
            alt={props.alt} 
            className="w-full h-auto rounded-xl object-cover"
            style={{ maxHeight: '400px' }}
          />
          {props.caption && (
            <figcaption className="text-sm text-muted-foreground text-center mt-3">
              {props.caption}
            </figcaption>
          )}
        </figure>
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
      defaultProps: {
        height: 'medium',
      },
      render: (props: { height: string }) => {
        const heightMap: { [key: string]: string } = {
          small: '24px',
          medium: '48px',
          large: '96px',
        };
        const heightValue = heightMap[props.height] || '48px';
        return <div style={{ height: heightValue }} />;
      },
    },
    Divider: {
      fields: {},
      defaultProps: {},
      render: () => <hr className="my-8 border-border" />,
    },
  },
};

export default function NewPagePage() {
  const router = useRouter();
  const { addPage } = usePages();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [data, setData] = useState<Data>({
    content: [],
    root: { props: {} },
  });

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(value));
    }
  };

  const handleSave = async () => {
    if (!title) {
      toast.error('Digite um título para a página');
      return;
    }

    try {
      await addPage({
        title,
        slug: slug || generateSlug(title),
        status: 'draft',
        published: false,
        metaTitle: { pt: title, en: title, es: title },
        metaDescription: { pt: '', en: '', es: '' },
        content: data,
      });
      
      toast.success('Página criada com sucesso!');
      router.push('/admin/pages');
    } catch (error) {
      toast.error('Erro ao criar página');
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-background p-4">
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/pages">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Nova Página</h1>
              <p className="text-sm text-muted-foreground">Crie uma nova página com o editor visual</p>
            </div>
          </div>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Salvar Página
          </Button>
        </div>
      </div>

      {/* Page Info */}
      <div className="bg-muted/50 border-b p-4">
        <div className="w-full max-w-[1200px] mx-auto">
          <Card>
            <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título da Página *</Label>
                <Input
                  id="title"
                  placeholder="Ex: Sobre Nós"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  placeholder="sobre-nos"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Puck Editor */}
      <div className="flex-1 overflow-hidden">
        <Puck
          config={config as any}
          data={data}
          onChange={setData}
        />
      </div>
    </div>
  );
}
