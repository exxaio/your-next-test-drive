import { getSession } from '@/lib/session';
import { TopNav } from '@/components/top-nav';
import { LeftRail } from '@/components/left-rail';
import { PageTransition } from '@/components/animations';
import { SidebarProvider } from '@/lib/sidebar-context';
import { SidebarContentOffset } from '@/components/sidebar-content-offset';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <TopNav userEmail={session?.email} />
        <LeftRail />
        {/* SidebarContentOffset handles dynamic left padding based on sidebar state */}
        <SidebarContentOffset>
          <div className="mx-auto max-w-3xl p-6">
            <PageTransition>{children}</PageTransition>
          </div>
        </SidebarContentOffset>
      </div>
    </SidebarProvider>
  );
}
