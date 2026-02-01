'use client';

import { useState } from 'react';
import { Puck } from '@measured/puck';
import type { Data } from '@measured/puck';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

// Configuração do Puck com componentes básicos
const config = {
  components: {
    Heading: {
      fields: {
        text: { type: 'text' },
      },
      defaultProps: {
        text: 'Título',
      },
      render: (props: any) => (
        <h2 className="text-3xl font-bold mb-4">{props.text}</h2>
      ),
    },
    Text: {
      fields: {
        content: { type: 'textarea' },
      },
      defaultProps: {
        content: 'Digite seu texto aqui...',
      },
      render: (props: any) => (
        <p className="text-muted-foreground mb-4">{props.content}</p>
      ),
    },
    Button: {
      fields: {
        label: { type: 'text' },
        url: { type: 'text' },
      },
      defaultProps: {
        label: 'Clique aqui',
        url: '#',
      },
      render: (props: any) => (
        <a
          href={props.url}
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 mb-4 hover:bg-primary/90"
        >
          {props.label}
        </a>
      ),
    },
    Card: {
      fields: {
        title: { type: 'text' },
        description: { type: 'textarea' },
      },
      defaultProps: {
        title: 'Título do Card',
        description: 'Descrição do card...',
      },
      render: (props: any) => (
        <div className="p-6 bg-card border rounded-lg shadow-sm mb-4">
          <h3 className="text-lg font-semibold mb-2">{props.title}</h3>
          <p className="text-muted-foreground">{props.description}</p>
        </div>
      ),
    },
  },
};

export default function AdminEditorPage() {
  const [data, setData] = useState<Data>({
    content: [],
    root: { props: {} },
  });

  const handleSave = () => {
    localStorage.setItem('puck_page_home', JSON.stringify(data));
    toast.success('Página salva com sucesso!');
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-background p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Editor Visual</h1>
            <p className="text-sm text-muted-foreground">
              Arraste componentes para editar sua página
            </p>
          </div>
        </div>
        
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Salvar
        </Button>
      </div>

      {/* Editor Puck */}
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
