const express = require('express')
const pool = require('./config/db')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API mvtech-works rodando 🚀')
})

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.json({ database_time: result.rows[0] })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao conectar ao banco' })
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})