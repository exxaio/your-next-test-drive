'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useSidebar } from '@/lib/sidebar-context';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export interface SidebarToggleProps {
  isExpanded?: boolean;
  onToggle?: () => void;
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  id?: string;
}

export function SidebarToggle({
  isExpanded: controlledExpanded,
  onToggle: controlledToggle,
  className,
  side = 'right',
  id = 'sidebar-toggle',
}: SidebarToggleProps) {
  const sidebar = useSidebar();
  const isExpanded = controlledExpanded ?? sidebar.isExpanded;
  const onToggle = controlledToggle ?? sidebar.toggle;

  const [isMac, setIsMac] = React.useState(true);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && navigator?.userAgent) {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent));
    }
  }, []);

  const shortcutText = isMac ? '⌘B' : 'Ctrl+B';
  const label = isExpanded ? 'Close sidebar' : 'Open sidebar';

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            id={id}
            variant="ghost"
            size="icon-sm"
            onClick={onToggle}
            aria-label={label}
            aria-expanded={isExpanded}
            className={cn(
              'relative rounded-lg text-muted-foreground transition-all duration-150',
              'hover:bg-accent/80 hover:text-foreground active:scale-95',
              'focus-visible:ring-2 focus-visible:ring-violet-500/50',
              className,
            )}
          />
        }
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isExpanded ? 'close' : 'open'}
            initial={{ opacity: 0, scale: 0.8, rotate: isExpanded ? -20 : 20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: isExpanded ? 20 : -20 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="flex items-center justify-center"
          >
            {isExpanded ? (
              <PanelLeftClose className="h-4 w-4" />
            ) : (
              <PanelLeftOpen className="h-4 w-4" />
            )}
          </motion.span>
        </AnimatePresence>
      </TooltipTrigger>
      <TooltipContent side={side} sideOffset={8} className="flex items-center gap-1.5">
        <span>{label}</span>
        <kbd
          data-slot="kbd"
          className="rounded border border-white/10 bg-background/30 px-1 py-0.5 font-mono text-[10px] text-muted-foreground"
        >
          {shortcutText}
        </kbd>
      </TooltipContent>
    </Tooltip>
  );
}
