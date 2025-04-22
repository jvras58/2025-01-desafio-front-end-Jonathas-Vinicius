"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserProfileForm } from "@/components/profile/user-profile-form"
// import { CompanyProfileForm } from "@/components/profile/company-profile-form"
import { Card } from "@/components/ui/card"

export function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6 md:w-[400px]">
        <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
        <TabsTrigger value="company">Dados da Empresa</TabsTrigger>
      </TabsList>
      <TabsContent value="personal">
        <Card>
          <UserProfileForm />
        </Card>
      </TabsContent>
      <TabsContent value="company">
        <Card>
          {/* <CompanyProfileForm /> */}
        </Card>
      </TabsContent>
    </Tabs>
  )
}
