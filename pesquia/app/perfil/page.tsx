import { ProfileSettings } from '@/components/profile/profile-settings';

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>
        <p className="text-muted-foreground">
          Gerencie suas informações pessoais e dados da empresa
        </p>
      </div>
      <ProfileSettings />
    </div>
  );
}
