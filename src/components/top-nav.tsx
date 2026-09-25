'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { logoutAction } from '@/lib/auth';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AudioWaveform, LogOut, Settings, User } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { fadeInDown } from '@/lib/motion';

interface TopNavProps {
  userEmail?: string | null;
}

export function TopNav({ userEmail }: TopNavProps) {
  const initials = userEmail
    ? userEmail.split('@')[0].slice(0, 2).toUpperCase()
    : 'U';

  return (
    <motion.header
      id="top-nav"
      initial="hidden"
      animate="visible"
      variants={fadeInDown}
      className="bg-background/80 fixed top-0 right-0 left-0 z-50 flex h-14 items-center border-b border-white/8 px-4 backdrop-blur-md"
    >
      {/* Logo — aligned with left rail width */}
      <Link
        href="/dashboard"
        className="font-heading flex w-56 shrink-0 items-center gap-2.5 font-bold tracking-tight"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600">
          <AudioWaveform className="h-4 w-4 text-white" />
        </span>
        <span className="text-base">Voxudio</span>
      </Link>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                id="user-menu-trigger"
                variant="ghost"
                className="h-8 w-8 rounded-full p-0"
              />
            }
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-600 text-xs font-bold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <p className="text-sm font-medium">{userEmail ?? 'User'}</p>
                <p className="text-muted-foreground text-xs">Signed in</p>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                render={
                  <Link
                    href="/profile"
                    className="flex cursor-pointer items-center gap-2"
                  />
                }
              >
                <User className="h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                render={
                  <Link
                    href="/settings"
                    className="flex cursor-pointer items-center gap-2"
                  />
                }
              >
                <Settings className="h-4 w-4" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <form action={logoutAction}>
              <DropdownMenuItem
                nativeButton
                render={
                  <button
                    id="logout-btn"
                    type="submit"
                    className="text-destructive flex w-full cursor-pointer items-center gap-2"
                  />
                }
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
}
