import type { Request, Response } from 'express'
import pool from '../config/database.js'
import type { Lancamento, NovoLancamento } from '../types/lancamento.js'

export async function listarLancamentos(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const resultado = await pool.query<
      Omit<Lancamento, 'valor'> & { valor: string }
    >(
      'SELECT * FROM lancamentos ORDER BY data DESC, id DESC',
    )

    const lancamentos: Lancamento[] = resultado.rows.map(
      (lancamento) => ({
        ...lancamento,
        valor: Number(lancamento.valor),
      }),
    )

    res.status(200).json(lancamentos)
  } catch (erro) {
    console.error('Erro ao listar lançamentos:', erro)

    res.status(500).json({
      mensagem: 'Erro interno ao buscar lançamentos.',
    })
  }
}

export async function criarLancamento(
  req: Request<object, object, NovoLancamento>,
  res: Response,
): Promise<void> {
  try {
    const { descricao, valor, tipo, categoria, data } = req.body

    if (
      !descricao?.trim() ||
      !Number.isFinite(valor) ||
      valor <= 0 ||
      !['receita', 'despesa'].includes(tipo) ||
      !categoria?.trim() ||
      !data
    ) {
      res.status(400).json({
        mensagem: 'Dados do lançamento inválidos.',
      })
      return
    }

    const resultado = await pool.query<
      Omit<Lancamento, 'valor'> & { valor: string }
    >(
      `INSERT INTO lancamentos (descricao, valor, tipo, categoria, data)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [descricao.trim(), valor, tipo, categoria.trim(), data],
    )

    const lancamento: Lancamento = {
      ...resultado.rows[0],
      valor: Number(resultado.rows[0].valor),
    }

    res.status(201).json(lancamento)
  } catch (erro) {
    console.error('Erro ao criar lançamento:', erro)

    res.status(500).json({
      mensagem: 'Erro interno ao cadastrar lançamento.',
    })
  }
}

export async function atualizarLancamento(
  req: Request<{ id: string }, object, NovoLancamento>,
  res: Response,
): Promise<void> {
  try {
    const id = Number(req.params.id)
    const { descricao, valor, tipo, categoria, data } = req.body

    if (
      !Number.isInteger(id) ||
      id <= 0 ||
      !descricao?.trim() ||
      !Number.isFinite(valor) ||
      valor <= 0 ||
      !['receita', 'despesa'].includes(tipo) ||
      !categoria?.trim() ||
      !data
    ) {
      res.status(400).json({
        mensagem: 'Dados do lançamento inválidos.',
      })
      return
    }

    const resultado = await pool.query<
      Omit<Lancamento, 'valor'> & { valor: string }
    >(
      `UPDATE lancamentos
       SET descricao = $1,
           valor = $2,
           tipo = $3,
           categoria = $4,
           data = $5
       WHERE id = $6
       RETURNING *`,
      [descricao.trim(), valor, tipo, categoria.trim(), data, id],
    )

    if (resultado.rows.length === 0) {
      res.status(404).json({
        mensagem: 'Lançamento não encontrado.',
      })
      return
    }

    const lancamento: Lancamento = {
      ...resultado.rows[0],
      valor: Number(resultado.rows[0].valor),
    }

    res.status(200).json(lancamento)
  } catch (erro) {
    console.error('Erro ao atualizar lançamento:', erro)

    res.status(500).json({
      mensagem: 'Erro interno ao atualizar lançamento.',
    })
  }
}

export async function excluirLancamento(
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> {
  try {
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        mensagem: 'ID do lançamento inválido.',
      })
      return
    }

    const resultado = await pool.query(
      'DELETE FROM lancamentos WHERE id = $1 RETURNING id',
      [id],
    )

    if (resultado.rows.length === 0) {
      res.status(404).json({
        mensagem: 'Lançamento não encontrado.',
      })
      return
    }

    res.status(200).json({
      mensagem: 'Lançamento excluído com sucesso.',
    })
  } catch (erro) {
    console.error('Erro ao excluir lançamento:', erro)

    res.status(500).json({
      mensagem: 'Erro interno ao excluir lançamento.',
    })
  }
}
