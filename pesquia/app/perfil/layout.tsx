import type React from 'react';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { auth } from '@/lib/auth';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'Perfil-PesquIA',
  description: 'Perfil do Usuario do sistema pesquIA',
};

export default async function PerfilLayout({
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
      <Header user={session.user} />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-4 md:p-6 bg-muted/40">{children}</main>
      </div>
    </div>
  );
}
