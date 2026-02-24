const pool = require('../config/db')
const bcrypt = require('bcrypt')

exports.criarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body

  try {
    const senhaHash = await bcrypt.hash(senha, 10)

    const result = await pool.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email',
      [nome, email, senhaHash]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao criar usuário' })
  }
}