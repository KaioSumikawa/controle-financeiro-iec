import { Router } from 'express'
import {
  listarLancamentos,
  criarLancamento,
  atualizarLancamento,
  excluirLancamento,
} from '../controllers/lancamentos.controller.js'

const router = Router()

router.get('/', listarLancamentos)
router.post('/', criarLancamento)
router.put('/:id', atualizarLancamento)
router.delete('/:id', excluirLancamento)

export default router
