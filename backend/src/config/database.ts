import 'dotenv/config'
import { Pool, types } from 'pg'

// Mantém os campos DATE no formato YYYY-MM-DD, sem conversão para Date.
types.setTypeParser(1082, (valor: string) => valor)

// Configuração de SSL para ambientes de produção
const ssl =
  process.env.DB_SSL === 'true'
    ? { rejectUnauthorized: false }
    : false

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl,
})

export default pool
