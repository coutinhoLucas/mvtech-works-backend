const pool = require('./config/db')

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.json({ database_time: result.rows[0] })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao conectar ao banco' })
  }
})