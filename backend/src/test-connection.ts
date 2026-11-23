import pool from './config/database.js'

async function testarConexao(): Promise<void> {
  try {
    const resultado = await pool.query('SELECT NOW()')

    console.log('Conexão com PostgreSQL estabelecida!')
    console.log('Horário do banco:', resultado.rows[0].now)
  } catch (erro) {
    console.error('Erro ao conectar com PostgreSQL:', erro)
  } finally {
    await pool.end()
  }
}

testarConexao()