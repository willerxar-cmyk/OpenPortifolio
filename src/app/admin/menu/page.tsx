'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { GripVertical, Plus, Trash2, Save, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  isExternal?: boolean;
}

const defaultMenuItems: MenuItem[] = [
  { id: '1', label: 'Home', href: '/' },
  { id: '2', label: 'Portfolio', href: '/portfolio' },
  { id: '3', label: 'Blog', href: '/blog' },
  { id: '4', label: 'Currículo', href: '/curriculum' },
];

export default function AdminMenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(defaultMenuItems);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load saved menu from localStorage or API
    const saved = localStorage.getItem('portfolio_menu');
    if (saved) {
      try {
        setMenuItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse menu:', e);
      }
    }
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(menuItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setMenuItems(items);
  };

  const addMenuItem = () => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      label: 'New Item',
      href: '/',
    };
    setMenuItems([...menuItems, newItem]);
  };

  const updateMenuItem = (id: string, field: keyof MenuItem, value: string | boolean) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const saveMenu = async () => {
    setIsLoading(true);
    try {
      // Save to localStorage (in production, this would be an API call)
      localStorage.setItem('portfolio_menu', JSON.stringify(menuItems));
      toast.success('Menu salvo com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar menu');
    } finally {
      setIsLoading(false);
    }
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
            <h1 className="text-3xl font-bold">Editor de Menu</h1>
            <p className="text-muted-foreground mt-1">Personalize os itens da navegação</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={addMenuItem} variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Adicionar Item
          </Button>
          <Button onClick={saveMenu} disabled={isLoading} className="gap-2">
            <Save className="h-4 w-4" />
            {isLoading ? 'Salvando...' : 'Salvar Menu'}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Itens do Menu</CardTitle>
          <CardDescription>
            Arraste para reordenar. Clique para editar. Os itens aparecerão na navbar do site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="menu-items">
              {(provided: DroppableProvided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                  {menuItems.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`p-4 rounded-lg border bg-card transition-all ${
                            snapshot.isDragging ? 'shadow-lg border-primary' : 'border-border'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div {...provided.dragHandleProps} className="cursor-move">
                              <GripVertical className="h-5 w-5 text-muted-foreground" />
                            </div>
                            
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label className="text-xs">Label</Label>
                                <Input
                                  value={item.label}
                                  onChange={(e) => updateMenuItem(item.id, 'label', e.target.value)}
                                  placeholder="Nome do item"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label className="text-xs">URL</Label>
                                <Input
                                  value={item.href}
                                  onChange={(e) => updateMenuItem(item.id, 'href', e.target.value)}
                                  placeholder="/caminho"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label className="text-xs">Ícone (opcional)</Label>
                                <Input
                                  value={item.icon || ''}
                                  onChange={(e) => updateMenuItem(item.id, 'icon', e.target.value)}
                                  placeholder="Nome do ícone Lucide"
                                />
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeMenuItem(item.id)}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {menuItems.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground mb-4">Nenhum item no menu</p>
              <Button onClick={addMenuItem} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar primeiro item
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview do Menu</CardTitle>
          <CardDescription>Como aparecerá no site</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 p-4 bg-muted rounded-lg">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="px-4 py-2 bg-background rounded-full border text-sm font-medium flex items-center gap-2"
              >
                {item.label}
                {item.isExternal && <ExternalLink className="h-3 w-3" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
