const pool = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
  const { email, senha } = req.body

  try {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Usuário não encontrado' })
    }

    const usuario = result.rows[0]

    const senhaValida = await bcrypt.compare(senha, usuario.senha)

    if (!senhaValida) {
      return res.status(400).json({ error: 'Senha inválida' })
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    )

    res.json({ token })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro no login' })
  }
}