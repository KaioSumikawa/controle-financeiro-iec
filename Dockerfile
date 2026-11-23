# Etapa 1: construir a aplicação
FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable

# Copia os arquivos de dependências
COPY backend/package.json backend/pnpm-lock.yaml backend/pnpm-workspace.yaml ./

# Instala todas as dependências
RUN pnpm install --frozen-lockfile

# Copia o código do backend
COPY backend/ ./

# Compila o TypeScript
RUN pnpm build


# Etapa 2: imagem de produção
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable

# Copia os arquivos necessários para instalar dependências de produção
COPY backend/package.json backend/pnpm-lock.yaml backend/pnpm-workspace.yaml ./

# Instala somente as dependências de produção
RUN pnpm install --prod --frozen-lockfile

# Copia o JavaScript compilado
COPY --from=builder /app/dist ./dist

# Expõe a porta padrão
EXPOSE 3000

# Inicia a API
CMD ["node", "dist/server.js"]
