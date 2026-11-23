import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import lancamentosRoutes from './routes/lancamentos.routes.js'

const app = express()
const PORT = Number(process.env.PORT) || 3000

// Middlewares
app.use(cors())
app.use(express.json())

// Health Check
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: Math.floor(process.uptime()),
  })
})

// Rotas
app.use('/api/lancamentos', lancamentosRoutes)

// Rota inicial
app.get('/', (_req, res) => {
  res.json({
    mensagem: 'API do Controle Financeiro funcionando!',
  })
})

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
