'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Settings2,
  Sparkles,
  Mic2,
  FileAudio,
  HelpCircle,
  AudioWaveform,
  Plus,
} from 'lucide-react';

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
};

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/projects', icon: FileAudio },
  { label: 'Record', href: '/record', icon: Mic2 },
  { label: 'Setup', href: '/setup', icon: Sparkles },
];

const bottomItems: NavItem[] = [
  { label: 'Help', href: '/help', icon: HelpCircle },
  { label: 'Settings', href: '/settings', icon: Settings2 },
];

export function LeftRail() {
  const pathname = usePathname();

  return (
    <Sidebar
      id="left-rail"
      collapsible="icon"
      className="border-r border-white/8 bg-background/95 backdrop-blur-md"
    >
      {/* Header: logo + collapse trigger */}
      <SidebarHeader className="h-14 flex-row items-center gap-0 border-b border-white/8 p-0">
        {/* Expanded: logo link */}
        <Link
          href="/dashboard"
          className="group flex flex-1 items-center gap-2.5 overflow-hidden rounded-lg px-3 py-0 outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 group-data-[collapsible=icon]:hidden"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-sm transition-transform group-hover:scale-105">
            <AudioWaveform className="h-4 w-4 text-white" />
          </span>
          <span className="font-heading truncate text-base font-bold tracking-tight transition-colors group-hover:text-violet-400">
            Voxudio
          </span>
        </Link>

        {/* Collapsed: icon-only logo */}
        <Link
          href="/dashboard"
          className="hidden h-14 w-full items-center justify-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 group-data-[collapsible=icon]:flex"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-sm">
            <AudioWaveform className="h-4 w-4 text-white" />
          </span>
        </Link>

        <SidebarTrigger className="mr-1 shrink-0 text-muted-foreground hover:text-foreground group-data-[collapsible=icon]:hidden" />
      </SidebarHeader>

      <SidebarContent className="gap-0 pt-2">
        {/* New project */}
        <div className="px-2 pb-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="New project"
                className="bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20 hover:bg-violet-500/20 hover:text-violet-400 hover:ring-violet-500/30 active:scale-[0.98]"
              >
                <Plus />
                <span>New project</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        {/* Main nav */}
        <SidebarMenu className="px-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  render={
                    <Link
                      href={item.href}
                      id={`nav-${item.href.replace('/', '')}`}
                    />
                  }
                  isActive={isActive}
                  tooltip={item.label}
                  className={cn(
                    isActive &&
                      'bg-violet-500/15 text-violet-400 ring-1 ring-violet-500/20 hover:bg-violet-500/20 hover:text-violet-400',
                  )}
                >
                  <item.icon strokeWidth={isActive ? 2.5 : 2} />
                  <span>{item.label}</span>
                </SidebarMenuButton>
                {item.badge && (
                  <SidebarMenuBadge className="rounded-full bg-violet-500/20 text-violet-400">
                    {item.badge}
                  </SidebarMenuBadge>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Bottom nav */}
      <SidebarFooter className="gap-0 pb-3">
        <SidebarSeparator className="mb-2 opacity-30" />
        <SidebarMenu className="px-2">
          {bottomItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href);
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  render={
                    <Link
                      href={item.href}
                      id={`nav-${item.href.replace('/', '')}`}
                    />
                  }
                  isActive={isActive}
                  tooltip={item.label}
                  className={cn(
                    isActive &&
                      'bg-violet-500/15 text-violet-400 ring-1 ring-violet-500/20 hover:bg-violet-500/20 hover:text-violet-400',
                  )}
                >
                  <item.icon strokeWidth={isActive ? 2.5 : 2} />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
