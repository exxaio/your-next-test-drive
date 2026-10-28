import { cookies } from 'next/headers';
import { getSession } from '@/lib/session';
import { TopNav } from '@/components/top-nav';
import { LeftRail } from '@/components/left-rail';
import { PageTransition } from '@/components/animations';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, cookieStore] = await Promise.all([getSession(), cookies()]);

  // Honour the persisted cookie (shadcn writes "sidebar_state") so the sidebar
  // opens in the correct state on SSR without a flash.
  const sidebarOpen = cookieStore.get('sidebar_state')?.value !== 'false';

  return (
    <SidebarProvider defaultOpen={sidebarOpen}>
      <LeftRail />
      <SidebarInset className="min-h-screen">
        <TopNav userEmail={session?.email} />
        <div className="p-6">
          <div className="mx-auto max-w-3xl">
            <PageTransition>{children}</PageTransition>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
