'use client';

import * as React from 'react';

type SidebarContextValue = {
  isExpanded: boolean;
  isMobileOpen: boolean;
  toggle: () => void;
  setMobileOpen: (open: boolean) => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const [isMobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('sidebar-expanded');
      if (saved !== null) {
        setIsExpanded(saved !== 'false');
      }
    } catch {
      // Ignore errors when localStorage is disabled or restricted
    }
  }, []);

  const toggle = React.useCallback(() => {
    setIsExpanded((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('sidebar-expanded', String(next));
      } catch {
        // Ignore errors when localStorage is disabled or restricted
      }
      return next;
    });
  }, []);

  return (
    <SidebarContext.Provider
      value={{ isExpanded, isMobileOpen, toggle, setMobileOpen }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider');
  return ctx;
}
