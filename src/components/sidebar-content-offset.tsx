'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { useSidebar } from '@/lib/sidebar-context';

const EXPANDED_WIDTH = 240;
const COLLAPSED_WIDTH = 56;

/**
 * Wraps main content and applies animated left padding to match the sidebar width.
 * On mobile (<md breakpoint), no left padding is applied since the sidebar is an overlay sheet.
 */
export function SidebarContentOffset({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded } = useSidebar();
  const [isMd, setIsMd] = React.useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(min-width: 768px)').matches;
  });

  // Listen for media query changes to update responsive state
  React.useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsMd(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const paddingLeft = isMd
    ? isExpanded
      ? EXPANDED_WIDTH
      : COLLAPSED_WIDTH
    : 0;

  return (
    <motion.main
      id="main-content"
      className="flex-1 pt-14"
      initial={{ paddingLeft }}
      animate={{ paddingLeft }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.main>
  );
}
