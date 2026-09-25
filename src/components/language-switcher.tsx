'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LOCALE_LABELS: Record<string, { short: string; full: string }> = {
  en: { short: 'EN', full: 'English' },
  'zh-CN': { short: '简', full: '简体中文' },
  'zh-TW': { short: '繁', full: '繁體中文' },
};

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps = {}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = React.useTransition();

  const activeLabel = LOCALE_LABELS[locale]?.short ?? locale.toUpperCase();

  function switchLocale(next: string) {
    // `usePathname()` returns the locale-prefixed path (e.g. `/zh-CN/dashboard`).
    // Passing it directly to router.replace with a new locale would double-prefix
    // the URL (e.g. `/en/zh-CN/dashboard`). Strip the current locale segment first.
    let cleanPathname = pathname || '/';
    for (const loc of routing.locales) {
      if (cleanPathname === `/${loc}`) {
        cleanPathname = '/';
        break;
      } else if (cleanPathname.startsWith(`/${loc}/`)) {
        cleanPathname = cleanPathname.slice(loc.length + 1);
        break;
      }
    }
    startTransition(() => {
      router.replace(cleanPathname, { locale: next });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            id="language-switcher-trigger"
            aria-label="Switch language"
            className={cn(
              // Pill button — theme-aware border via dark: variant
              'text-foreground hover:bg-muted/80 relative flex h-8 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/35 bg-transparent p-0 text-xs font-bold transition-colors outline-none hover:border-black/50 dark:border-white/35 dark:hover:border-white/55',
              'focus-visible:ring-ring/30 focus-visible:ring-2',
              isPending && 'pointer-events-none opacity-60',
              className,
            )}
          />
        }
      >
        <span>{activeLabel}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {routing.locales.map((loc) => {
          const label = LOCALE_LABELS[loc];
          const isActive = loc === locale;
          return (
            <DropdownMenuItem
              key={loc}
              onClick={() => switchLocale(loc)}
              className={cn(
                'flex items-center justify-between gap-2',
                isActive && 'font-semibold',
              )}
            >
              <span>{label?.full ?? loc}</span>
              {isActive && (
                <Check className="h-3.5 w-3.5 shrink-0 opacity-70" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
