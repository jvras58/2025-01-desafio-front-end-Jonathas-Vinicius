# PesquIA - Desafio SIAPESQ

## 📖 Sobre o Projeto
O **pesquIA** é um sistema ERP focado no segmento de pescaria, permitindo o gerenciamento de produtos e operações de compra e venda.


## 🛠️ Stack Tecnológica Principal

Este projeto foi desenvolvido utilizando tecnologias modernas para criar uma aplicação web robusta e escalável:

- **Next.js**: Framework React para renderização híbrida e otimização de performance
- **shadcn/UI**: Biblioteca de componentes reutilizáveis e personalizáveis
- **Auth.js**: Sistema completo de autenticação e gerenciamento de sessões
- **TypeScript**: Tipagem estática para desenvolvimento mais seguro
- **Prisma**: ORM para interação com banco de dados

### Stack do Projeto

Este projeto é uma aplicação web que utiliza **Next.js**, um framework React focado em renderização do lado servidor e funcionalidades modernas de desenvolvimento web.

As tecnologias utilizadas são:

| **Tecnologia**        | **Versão**       |
|-----------------------|------------------|
| **Runtime**           |                  |
| Node.js               | v18.x.x          |
| **Framework**         |                  |
| Next.js               | v15.x.x          |
| **Banco de Dados**    |                  |
| prisma                | v5.x.x           |
| **Devtime**           |                  |
| npm                   | v9.x.x           |

## 🚀 Características Principais
##  Arquitetura e Padrões
 - Arquitetura Moderna: Utiliza App Router do Next.js 15
 - Server Components: Maximiza performance com React Server Components
 - API Routes: Sistema de rotas API integrado
 - TypeScript: Tipo seguro em toda a base de código
 - React Hook Form: Gerenciamento avançado de formulários
 - Zod: Validação de dados type-safe

 ### 🏗 Arquitetura do Projeto
```

    └── pesquia/
        ├── {} components.json
        ├── 🛠️ eslint.config.mjs
        ├── 🛠️ next.config.ts
        ├── {} package-lock.json
        ├── {} package.json
        ├── 🛠️ postcss.config.mjs
        ├── 🛠️ tailwind.config.js
        ├── {} tsconfig.json
        ├── .env-sample
        ├── 📁app/
        │   ├── globals.css
        │   ├── layout.tsx
        │   ├── page.tsx
        │   ├── 📁api/
        │   │   └── 📁auth/
        │   │       └── [...nextauth]/
        │   │           └── route.ts
        │   └── 📁auth/
        │       ├── cadastro/
        │       │   └── ⚛ page.tsx
        │       └── login/
        │           └── ⚛ page.tsx
        ├── 📁components/
        │   ├── auth/
        │   │   └── ⚛ login-form.tsx
        |   |   └── ⚛ register-form.tsx
        │   └── ui/
        │       ├── ⚛ button.tsx
        ├── 📁lib/
        │   ├── 🇹 auth.ts
        │   ├── 🇹 gemini.ts
        │   ├── 🇹 getQueryClient.ts
        │   └── 🇹 utils.ts
        ├── 📁prisma/
        │   ├── schema.prisma
        │   └── migrations/
        ├── 📁providers/
        │   └── providers.tsx
        └── 📁schemas/
            └── 🇹 login-schema.ts
            └── 🇹 register-schema.ts
```

## Autenticação e Segurança
 - Auth.js: Sistema de autenticação


## ⚙️ Instalação e Configuração

Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:

   ```bash
   git clone https://github.com/usuario/repositorio-sample.git
   cd repositorio-sample
   cd pesquia
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o arquivo `.env` na raiz do projeto com suas credenciais use o arquivo `env-example`

4. Inicie o ambiente de desenvolvimento:
```bash
# Gera o cliente do Prisma e apliqua as migrations
npx prisma generate && npx prisma migrate dev

# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
```

   > O servidor será iniciado em modo de desenvolvimento com hot-reload

5. Visualize o Homepage:
   ```
   http://localhost:3000/
   ```
   > A página principal da landing page será carregada


## ⚙️ Instalação e Configuração COM DOCKER

### Pré-requisitos

- Docker Engine instalado e configurado.  
  [Veja como instalar o Docker Engine](https://docs.docker.com/engine/install/)

### Passos para rodar em produção com Docker

1. **Configure o arquivo `.env`**

   Antes de iniciar, crie e configure o arquivo `.env` na pasta `/pesquia` conforme o modelo `.env-sample`.  
   > **Dica:** Apenas as variáveis necessárias para produção (ex: `AUTH_SECRET`, `DATABASE_URL`) precisam estar presentes.

2. **Build e execução do container**

   No terminal, dentro da pasta `/pesquia`, execute:

   ```sh
   docker compose build app-production
   docker compose up app-production
   ```

   Aguarde o carregamento dos comandos.

3. **Acesse a aplicação**

   Abra no navegador:
   ```
   http://localhost:3000/
   ```

   A landing page principal será carregada.

### Observações sobre variáveis de ambiente

- Apenas as variáveis especificadas na seção `environment` do `compose.yml` serão passadas para o container.
- Exemplo: para passar apenas `AUTH_SECRET` do `.env`, garanta que ela está definida no `.env` e referenciada assim no `compose.yml`:

  ```yaml
  environment:
    - AUTH_SECRET=${AUTH_SECRET}
  ```

- No `compose.yml` também é possível carregar todas as variáveis do `.env` usando:
  ```yaml
  env_file: .env
  ```
  Porém, o bloco `environment` é prioritário na execução e sobrescreve valores do `env_file` caso haja conflito.

> Se quiser passar apenas algumas variáveis, basta removê-las do `env_file` e manter apenas no `environment`.

## 💻 Funcionalidades Principais

[landing Page](http://localhost:3000/)
[login Page](http://localhost:3000/auth/login)
[Cadastro Page](http://localhost:3000/auth/register)
[Home Page](http://localhost:3000/dashboard)
[Crud Products](http://localhost:3000/dashboard/produtos)



## 📝 CHECKLIST:

[Checklist](/docs/SIAPESQ/CHECKPOINT.MD)

## 📝 DESAFIO:

[Desafio](/docs/SIAPESQ/DESAFIO.MD)

## 📝 Documentação:

[Documentação_do_Projeto](/docs/PesquIA/DOCS.MD)

## 📝 Autor

- **jvras**

## 📜 Licença

Este projeto ainda não possui licença definida.

## 📖 Documentação principais consultadas:

[Next.js 15](https://nextjs.org/docs/getting-started)

[Next.js caching](https://nextjs.org/docs/app/building-your-application/caching)

[Auth.js](https://authjs.dev/)

[Tanstack](https://tanstack.com/)

[React-hook-forms](https://react-hook-form.com/)

[zod](https://zod.dev/)


