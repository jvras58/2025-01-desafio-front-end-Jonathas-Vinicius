'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import {
  UserProfileFormValues,
  userProfileSchema,
} from '@/schemas/user-schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '@/lib/api';

interface UserProfileData {
  profile: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export function UserProfileForm() {
  //TODO: investigar como ele funciona pq na minha cabeça ele deveria vir por padrão já que estamos injetando no layout... pelo providers mas pelo que to entendendo o usequeryclient le do contexto do react query o mesmo que esta no layout...
  const queryClient = useQueryClient();

  const {
    data: userData,
    isLoading: isFetching,
    error,
  } = useQuery<UserProfileData>({
    queryKey: ['userProfile'],
    queryFn: () => fetcher('/api/profile'),
    staleTime: Infinity,
  });

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: '',
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  //TODO: O useEffect é necessário aqui? não tem outra forma??
  useEffect(() => {
    if (userData?.profile) {
      form.reset({
        name: userData.profile.name ?? '',
        email: userData.profile.email ?? '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [userData, form]);

  const mutation = useMutation({
    mutationFn: (data: UserProfileFormValues) => {
      return fetcher('/api/profile', {
        method: 'PUT',
        body: JSON.stringify({
          name: data.name || '',
          email: data.email || '',
          currentPassword: data.currentPassword || '',
          newPassword: data.newPassword || '',
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      toast.success('Perfil atualizado com sucesso', {
        description: 'Suas informações pessoais foram atualizadas.',
      });
    },
    onError: (error: Error) => {
      toast.error('Erro ao atualizar perfil', {
        description: `Ocorreu um erro ao atualizar suas informações: ${error.message}`,
      });
    },
  });

  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="animate-spin mr-2 h-5 w-5" />
        <span>Carregando dados…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center text-destructive py-8">
        <AlertCircle className="mr-2 h-5 w-5" />
        <span>Erro: {(error as Error).message}</span>
      </div>
    );
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Informações Pessoais</CardTitle>
        <CardDescription>
          Atualize suas informações pessoais e credenciais de acesso
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))}>
          <CardContent className="space-y-6 pt-4">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback>
                  {userData?.profile?.name
                    ? userData.profile.name.slice(0, 2)
                    : 'US'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm font-medium">Foto de Perfil</h3>
                <p className="text-sm text-muted-foreground">
                  Sua foto será exibida em seu perfil
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Dados Pessoais
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Nome Completo</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            className="pl-10"
                            placeholder="Seu nome completo"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            className="pl-10"
                            placeholder="seu.email@exemplo.com"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Alterar Senha
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="currentPassword">
                        Senha Atual
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="currentPassword"
                            className="pl-10"
                            type="password"
                            placeholder="Digite sua senha atual"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      {/*FIXME: isso não esta funcionando na pratica kk é obrigatorio colocar a senha atual (que ate que é util... talvez fazer os nova senha ser opcional quando tiver nesse forms )  */}
                      <FormDescription>
                        Deixe em branco para manter a senha atual
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="newPassword">Nova Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="newPassword"
                            className="pl-10"
                            type="password"
                            placeholder="Digite sua nova senha"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="confirmPassword">
                        Confirmar Nova Senha
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            className="pl-10"
                            type="password"
                            placeholder="Confirme sua nova senha"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 border-t pt-6 mt-4">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="bg-primary hover:bg-primary/90"
            >
              {mutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </>
  );
}
