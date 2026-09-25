'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/lib/sidebar-context';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { SidebarToggle } from '@/components/sidebar-toggle';
import {
  LayoutDashboard,
  Settings2,
  Sparkles,
  Mic2,
  FileAudio,
  HelpCircle,
  PanelLeftOpen,
  AudioWaveform,
  Plus,
} from 'lucide-react';

export {
  SidebarToggle,
  type SidebarToggleProps,
} from '@/components/sidebar-toggle';

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

const EXPANDED_WIDTH = 240;
const COLLAPSED_WIDTH = 56;

function NavItemRow({
  item,
  pathname,
  isExpanded,
  onClick,
}: {
  item: NavItem;
  pathname: string;
  isExpanded: boolean;
  onClick?: () => void;
}) {
  const isActive =
    pathname === item.href ||
    (item.href !== '/dashboard' && pathname.startsWith(item.href));

  const linkEl = (
    <Link
      href={item.href}
      id={`nav-${item.href.replace('/', '')}`}
      onClick={onClick}
      className={cn(
        'group relative flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50',
        isExpanded ? 'justify-start' : 'justify-center px-0',
        isActive
          ? 'bg-violet-500/15 text-violet-400 shadow-sm ring-1 ring-violet-500/20'
          : 'text-muted-foreground hover:bg-accent hover:text-foreground',
      )}
    >
      {isActive && (
        <span className="absolute left-0 h-5 w-0.5 rounded-r-full bg-violet-500" />
      )}
      <item.icon
        className="h-[18px] w-[18px] shrink-0"
        strokeWidth={isActive ? 2.5 : 2}
      />
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.span
            key="label"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="truncate"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
      {item.badge && isExpanded && (
        <span className="ml-auto shrink-0 rounded-full bg-violet-500/20 px-1.5 py-0.5 text-xs text-violet-400">
          {item.badge}
        </span>
      )}
    </Link>
  );

  if (isExpanded) {
    return linkEl;
  }

  return (
    <Tooltip>
      <TooltipTrigger render={linkEl} />
      <TooltipContent side="right" sideOffset={8}>
        {item.label}
      </TooltipContent>
    </Tooltip>
  );
}

function SidebarInner({
  isExpanded,
  onToggle,
  onNavClick,
}: {
  isExpanded: boolean;
  onToggle: () => void;
  onNavClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* Header: logo + toggle */}
      <div
        className={cn(
          'flex h-14 shrink-0 items-center border-b border-white/8 transition-all',
          isExpanded ? 'justify-between px-3' : 'justify-center',
        )}
      >
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="flex items-center overflow-hidden"
            >
              <Link
                href="/dashboard"
                onClick={onNavClick}
                className="group flex items-center gap-2.5 rounded-lg p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-sm transition-transform group-hover:scale-105">
                  <AudioWaveform className="h-4 w-4 text-white" />
                </span>
                <span className="font-heading truncate text-base font-bold tracking-tight transition-colors group-hover:text-violet-400">
                  Voxudio
                </span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <SidebarToggle
          id="sidebar-toggle"
          isExpanded={isExpanded}
          onToggle={onToggle}
          side="right"
        />
      </div>

      {/* New chat / action button */}
      <div className={cn('px-2 py-3', isExpanded ? '' : 'flex justify-center')}>
        {isExpanded ? (
          <motion.button
            layout
            className="flex w-full items-center gap-2.5 rounded-xl bg-violet-500/10 px-3 py-2.5 text-sm font-medium text-violet-400 ring-1 ring-violet-500/20 transition-all hover:bg-violet-500/20 hover:ring-violet-500/30 active:scale-[0.98]"
            onClick={onNavClick}
          >
            <Plus className="h-4 w-4 shrink-0" />
            <span>New project</span>
          </motion.button>
        ) : (
          <Tooltip>
            <TooltipTrigger
              render={
                <button
                  id="sidebar-new"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20 transition-all hover:bg-violet-500/20 active:scale-[0.98]"
                />
              }
            >
              <Plus className="h-4 w-4" />
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              New project
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* Main nav */}
      <nav
        className={cn(
          'flex flex-1 flex-col gap-0.5 overflow-y-auto',
          isExpanded ? 'px-2' : 'items-center px-1.5',
        )}
      >
        {navItems.map((item) => (
          <NavItemRow
            key={item.href}
            item={item}
            pathname={pathname}
            isExpanded={isExpanded}
            onClick={onNavClick}
          />
        ))}
      </nav>

      {/* Bottom nav */}
      <div
        className={cn(
          'pb-3',
          isExpanded ? 'px-2' : 'flex flex-col items-center px-1.5',
        )}
      >
        <Separator
          className={cn('mb-2 opacity-30', isExpanded ? 'mx-1' : 'w-6')}
        />
        {bottomItems.map((item) => (
          <NavItemRow
            key={item.href}
            item={item}
            pathname={pathname}
            isExpanded={isExpanded}
            onClick={onNavClick}
          />
        ))}
      </div>
    </div>
  );
}

export function LeftRail() {
  const { isExpanded, isMobileOpen, toggle, setMobileOpen } = useSidebar();

  // Keyboard shortcut (⌘B or Ctrl+B / ⌘[ or Ctrl+[) like Claude and ChatGPT
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in form inputs
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (
        (e.metaKey || e.ctrlKey) &&
        (e.key.toLowerCase() === 'b' || e.key === '[')
      ) {
        e.preventDefault();
        if (isMobileOpen) {
          setMobileOpen(false);
        } else {
          toggle();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggle, isMobileOpen, setMobileOpen]);

  return (
    <TooltipProvider delay={200}>
      {/* Desktop sidebar */}
      <motion.aside
        id="left-rail"
        initial={{
          x: -20,
          opacity: 0,
          width: isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
        }}
        animate={{
          x: 0,
          opacity: 1,
          width: isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
        }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="bg-background/95 fixed top-0 bottom-0 left-0 z-50 hidden flex-col border-r border-white/8 backdrop-blur-md md:flex"
      >
        <SidebarInner isExpanded={isExpanded} onToggle={toggle} />
      </motion.aside>

      {/* Mobile toggle button (visible on small screens <md) */}
      <Tooltip>
        <TooltipTrigger
          render={
            <button
              id="mobile-sidebar-trigger"
              onClick={() => setMobileOpen(true)}
              className="bg-background/80 text-muted-foreground hover:bg-accent/80 hover:text-foreground fixed top-2.5 left-3.5 z-50 flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 shadow-sm backdrop-blur-md transition-all outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 active:scale-95 md:hidden"
              aria-label="Open sidebar"
              aria-expanded={isMobileOpen}
            />
          }
        >
          <PanelLeftOpen className="h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          Open sidebar
        </TooltipContent>
      </Tooltip>

      {/* Mobile sheet */}
      <Sheet open={isMobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="bg-background/95 w-72 border-r border-white/8 p-0 backdrop-blur-xl"
        >
          <SidebarInner
            isExpanded={true}
            onToggle={() => setMobileOpen(false)}
            onNavClick={() => setMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
}

export function MobileSidebarTrigger({ className }: { className?: string }) {
  const { isMobileOpen, setMobileOpen } = useSidebar();
  return (
    <button
      id="mobile-sidebar-trigger"
      onClick={() => setMobileOpen(true)}
      className={cn(
        'bg-background/80 text-muted-foreground hover:bg-accent/80 hover:text-foreground flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 shadow-sm backdrop-blur-md transition-all outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 active:scale-95 md:hidden',
        className,
      )}
      aria-label="Open sidebar"
      aria-expanded={isMobileOpen}
    >
      <PanelLeftOpen className="h-4 w-4" />
    </button>
  );
}
