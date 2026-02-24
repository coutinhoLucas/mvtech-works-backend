const pool = require('../config/db')

exports.criarCliente = async (req, res) => {
  const { nome, telefone } = req.body

  try {
    const result = await pool.query(
      'INSERT INTO clientes (nome, telefone) VALUES ($1, $2) RETURNING *',
      [nome, telefone]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao criar cliente' })
  }
}

exports.listarClientes = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM clientes ORDER BY id DESC'
    )

    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao listar clientes' })
  }
}

exports.buscarClientePorId = async (req, res) => {
  const { id } = req.params

  try {
    const result = await pool.query(
      'SELECT * FROM clientes WHERE id = $1',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar cliente' })
  }
}

exports.atualizarCliente = async (req, res) => {
  const { id } = req.params
  const { nome, telefone } = req.body

  try {
    const result = await pool.query(
      `UPDATE clientes 
       SET nome = $1, telefone = $2
       WHERE id = $3
       RETURNING *`,
      [nome, telefone, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao atualizar cliente' })
  }
}

exports.deletarCliente = async (req, res) => {
  const { id } = req.params

  try {
    const result = await pool.query(
      'DELETE FROM clientes WHERE id = $1 RETURNING *',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' })
    }

    res.json({ message: 'Cliente removido com sucesso' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao deletar cliente' })
  }
}