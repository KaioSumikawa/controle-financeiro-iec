# Controle Financeiro — API

API REST para gerenciamento de lançamentos financeiros pessoais, desenvolvida com Node.js, Express, TypeScript e PostgreSQL.

Este repositório contém o backend do projeto, preparado para execução em container Docker e integração com um fluxo de entrega contínua utilizando GitHub Actions e Render.

## Tecnologias utilizadas

- Node.js
- Express
- TypeScript
- PostgreSQL
- node-postgres (pg)
- CORS
- Dotenv
- Docker

## Funcionalidades

- Listagem de lançamentos financeiros.
- Cadastro de receitas e despesas.
- Edição de lançamentos existentes.
- Exclusão de lançamentos.
- Persistência dos dados em PostgreSQL.
- Validação dos dados recebidos pela API.
- Endpoint de verificação de saúde da aplicação (Health Check).

## Pré-requisitos

Para executar o projeto localmente, é necessário ter instalado:

- Node.js 22 ou superior.
- pnpm.
- PostgreSQL.

Para executar utilizando Docker:

- Docker Desktop ou Docker Engine.

## Configuração do banco de dados

Inicie o PostgreSQL e crie um banco de dados chamado `controle_financeiro`.

Em seguida, execute o seguinte comando SQL:

```sql
CREATE TABLE lancamentos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(150) NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('receita', 'despesa')),
    categoria VARCHAR(60) NOT NULL,
    data DATE NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Configuração do backend

Acesse a pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
pnpm install
```

Crie um arquivo `.env` dentro da pasta `backend`, utilizando o arquivo `.env.example` como referência:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=controle_financeiro
DB_SSL=false
```

Altere os valores conforme a configuração do PostgreSQL instalado na sua máquina.

Para compilar o TypeScript:

```bash
pnpm build
```

Para iniciar a API:

```bash
pnpm start
```

A API estará disponível em:

`http://localhost:3000`

## Execução com Docker

Na raiz do projeto, execute o comando para construir a imagem:

```bash
docker build -t controle-financeiro-iec .
```

Para iniciar o container:

```bash
docker run --rm -p 3000:3000 --env-file backend/.env controle-financeiro-iec
```

A API estará disponível em `http://localhost:3000`.

## Health Check

O endpoint de verificação de saúde permite confirmar se a API está em execução.

**Requisição:**

```http
GET /api/health
```

**Resposta esperada:**

```json
{
  "status": "ok",
  "uptime": 120
}
```

O campo `uptime` representa o tempo de execução do processo em segundos.

## Endpoints da API

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/health` | Verifica a disponibilidade da API |
| GET | `/api/lancamentos` | Lista os lançamentos |
| POST | `/api/lancamentos` | Cadastra um lançamento |
| PUT | `/api/lancamentos/:id` | Atualiza um lançamento |
| DELETE | `/api/lancamentos/:id` | Exclui um lançamento |

As requisições que enviam dados utilizam o formato JSON.

## Estrutura do projeto

```text
controle-financeiro-iec/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── types/
│   │   └── server.ts
│   ├── .env.example
│   ├── package.json
│   ├── pnpm-lock.yaml
│   └── tsconfig.json
│
├── .dockerignore
├── .gitignore
├── Dockerfile
└── README.md
```

## Projeto acadêmico

Projeto desenvolvido como atividade acadêmica da FATEC Registro, com foco em Docker, integração contínua e entrega contínua (CI/CD).
