export interface Lancamento {
  id: number
  descricao: string
  valor: number
  tipo: 'receita' | 'despesa'
  categoria: string
  data: string
  criado_em: Date
}

export interface NovoLancamento {
  descricao: string
  valor: number
  tipo: 'receita' | 'despesa'
  categoria: string
  data: string
}