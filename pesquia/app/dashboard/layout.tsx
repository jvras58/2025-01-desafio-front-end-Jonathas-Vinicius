import type React from 'react';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { auth } from '@/lib/auth';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'Dashboard-PesquIA',
  description: 'Dashboard do sistema pesquIA',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-4 md:p-6 bg-muted/40">{children}</main>
      </div>
    </div>
  );
}
