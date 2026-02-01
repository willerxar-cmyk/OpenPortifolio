'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

interface NavLinkProps {
  item: NavItem
}

export default function NavLink({ item }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === item.href

  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
        isActive
          ? 'bg-primary text-primary-foreground shadow-md'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      )}
    >
      <item.icon className="h-4 w-4" />
      <span>{item.label}</span>
    </Link>
  )
}
