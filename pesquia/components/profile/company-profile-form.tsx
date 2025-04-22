"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Building2, MapPin, Phone, Mail, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from 'sonner'
import { enterpriseProfileFormValues, enterpriseSchema } from "@/schemas/enterprise-schema"
import { fetcher } from "@/lib/api"
import { Avatar, AvatarFallback } from "../ui/avatar"

interface EnterpriseData {
  enterprise: {
    id: string
    name: string
    cnpj: string
    emailCommercial: string
    phone: string
    address: string
    city: string
    cep: string
    createdAt: string
    updatedAt: string
  }
}

export function CompanyProfileForm() {
  const queryClient = useQueryClient()

  const { data: enterpriseData, isLoading: isFetching, error } = useQuery<EnterpriseData>({
    queryKey: ['enterprise'],
    queryFn: () => fetcher('/api/enterprise'),
    staleTime: Infinity,
  })

  const form = useForm<enterpriseProfileFormValues>({
    resolver: zodResolver(enterpriseSchema),
    defaultValues: {
      companyName: "",
      cnpj: "",
      companyCep: "",
      address: "",
      // city: "",
      // state: "",
      phone: "",
      email: "",

    },
    mode: "onChange",
  })

  useEffect(() => {
    if (enterpriseData?.enterprise) {
      form.reset({
        companyName: enterpriseData.enterprise.name || "",
        cnpj: enterpriseData.enterprise.cnpj || "",
        companyCep: enterpriseData.enterprise.cep || "",
        address: enterpriseData.enterprise.address || "",
        city: enterpriseData.enterprise.city || "",
        phone: enterpriseData.enterprise.phone || "",
        email: enterpriseData.enterprise.emailCommercial || "",
      })
    }
  }, [enterpriseData, form])

  const mutation = useMutation({
    mutationFn: (data: enterpriseProfileFormValues) =>
      fetcher('/api/enterprise', {
        method: 'PUT',
        body: JSON.stringify({
          companyName: data.companyName,
          cnpj: data.cnpj,
          emailCommercial: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          companyCep: data.companyCep,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enterprise'] })
      toast.success('Empresa atualizada com sucesso', {
        description: 'As informações da empresa foram atualizadas.',
      })
    },
    onError: (error: any) => {
      toast.error('Erro ao atualizar empresa', {
        description: `Ocorreu um erro: ${error.message}`,
      })
    },
  })

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
        <CardTitle>Dados da Empresa</CardTitle>
        <CardDescription>Atualize as informações da sua empresa</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))}>
          <CardContent className="space-y-6 pt-4">
            {/* Logo Section */}
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback>
                  {enterpriseData?.enterprise?.name
                    ? enterpriseData.enterprise.name.slice(0, 6)
                    : ''}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm font-medium">Logo da Empresa</h3>
                <p className="text-sm text-muted-foreground">
                  A logo será exibida em documentos e na interface do sistema
                </p>
              </div>
            </div>

            {/* Company Information Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Informações Básicas</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Empresa</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="Nome da sua empresa" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cnpj"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CNPJ</FormLabel>
                      <FormControl>
                        <Input placeholder="00.000.000/0001-00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-medium text-muted-foreground">Contato</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="contato@empresa.com" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="(00) 0000-0000" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-medium text-muted-foreground">Endereço</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="Rua, número, complemento" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Sua cidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                {/* <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <Input placeholder="UF" maxLength={2} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="companyCep"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <Input placeholder="00000-000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 border-t pt-6 mt-4">
            <Button type="submit" disabled={mutation.isPending} className="bg-primary hover:bg-primary/90">
              {mutation.isPending ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </>
  )
}