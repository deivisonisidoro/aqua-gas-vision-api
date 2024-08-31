# Desafio Técnico - Gestão de Consumo de Água e Gás

## Descrição

Este projeto implementa o back-end para um serviço que gerencia a leitura individualizada de consumo de água e gás. Utiliza Inteligência Artificial (IA) para obter medições a partir de fotos dos medidores, proporcionando uma solução eficiente e moderna para coleta de dados.

## Arquitetura

O projeto segue os princípios da Arquitetura Limpa, garantindo uma separação clara entre as camadas da aplicação, facilitando a manutenção e escalabilidade:

- **Camada de Apresentação (`src/presentation`)**: Gerencia as requisições HTTP e controla a comunicação com os usuários.
  - `measure.controller.ts`: Controlador para gerenciar as rotas e as requisições relacionadas às medições.
  - `measure.controller.spec.ts`: Testes para o controlador de medições.

- **Camada de Aplicação (`src/application`)**: Contém a lógica de negócio e serviços que orquestram as operações.
  - `services/measure.service.ts`: Serviço responsável pela lógica de negócio relacionada às medições.
  - `services/measure.service.spec.ts`: Testes para o serviço de medições.

- **Camada de Domínio (`src/domain`)**: Representa o modelo de dados e regras de negócio.
  - `dto/`: Objetos de transferência de dados.
  - `entities/`: Entidades que representam os modelos de dados.
  - `enums/`: Enumerações usadas na aplicação.
  - `factories/`: Fábricas para criação de instâncias de entidades.
  - `mapper/`: Mapeadores para conversão entre diferentes representações de dados.
  - `providers/`: Provedores que fornecem serviços específicos.
  - `repositories/`: Repositórios para acesso e manipulação dos dados.
  - `services/`: Serviços de domínio que encapsulam a lógica específica do domínio.

- **Camada de Infraestrutura (`src/infrastructure`)**: Gerencia a persistência dos dados e configurações externas.
  - `configs/`: Configurações gerais da aplicação.
  - `database/`: Configurações e scripts relacionados ao banco de dados.
  - `mappers/`: Mapeadores específicos da infraestrutura.
  - `modules/`: Módulos de infraestrutura que integram com outras partes da aplicação.
  - `providers/`: Provedores de serviços de infraestrutura.
  - `repositories/`: Repositórios de infraestrutura para acesso ao banco de dados.

## Tecnologias Utilizadas

- **NestJS**: Framework Node.js para construir back-ends escaláveis e eficientes.
- **Prisma**: ORM para TypeScript e Node.js, facilitando a interação com o banco de dados PostgreSQL.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional para armazenar e consultar dados.
- **Gemini**: Usada para analisar e extrair dados de fotos dos medidores.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

- `dist/` - Diretório gerado após a compilação TypeScript.
- `node_modules/` - Dependências do projeto.
- `prisma/` - Arquivos de configuração do Prisma, incluindo `schema.prisma`.
- `src/` - Código fonte da aplicação:
  - `application/` - Serviços e lógica de negócio.
  - `domain/` - Entidades, DTOs, e lógica de domínio.
  - `infrastructure/` - Configurações e acesso ao banco de dados.
  - `presentation/` - Controladores e lógica de apresentação.
  - `main.ts` - Ponto de entrada da aplicação.
- `test/` - Testes da aplicação.
- `.dockerignore` - Arquivo para ignorar arquivos durante a construção da imagem Docker.
- `.env` - Variáveis de ambiente para configuração local.
- `.env.example` - Exemplo de arquivo `.env`.
- `.env.test` - Variáveis de ambiente para testes.
- `.eslintrc.js` - Configuração do ESLint.
- `.gitignore` - Arquivo para ignorar arquivos no Git.
- `.prettierrc` - Configuração do Prettier.
- `docker-compose.yml` - Configuração do Docker Compose.
- `Dockerfile` - Dockerfile para a aplicação.
- `Dockerfile.postgres` - Dockerfile para o banco de dados PostgreSQL.
- `nest-cli.json` - Configuração do CLI do NestJS.
- `package.json` - Gerenciador de dependências e scripts.
- `pnpm-lock.yaml` - Lockfile do pnpm.
- `README.md` - Este arquivo.
- `tsconfig.build.json` - Configuração TypeScript para build.
- `tsconfig.json` - Configuração TypeScript geral.

## Configuração

1. Clone o repositório:

   ```bash
   git clone [URL do Repositório]
   cd [Nome do Repositório]
   ```

2. Instale as dependências:

   ```bash
   pnpm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/databasename?schema=public"
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=123
   POSTGRES_DB=dev-db
   GEMINI_API_KEY=
   PORT=3000
   ```

4. Execute as migrações do Prisma:

   ```bash
   pnpm prisma migrate dev
   ```

5. Inicie o servidor:

   ```bash
   pnpm start
   ```

## Testes

Para rodar os testes, execute:

```bash
pnpm test
```

Para testes e2e, execute:

```bash
pnpm test:e2e
```

## Docker

Para construir e rodar a aplicação usando Docker, utilize:

- **Construir a imagem Docker**:

   ```bash
   docker build -t app-image -f Dockerfile .
   ```

- **Executar a aplicação com Docker Compose**:

   ```bash
   docker-compose up
   ```

