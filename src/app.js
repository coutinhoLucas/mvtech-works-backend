const express = require('express')

const authRoutes = require('./routes/auth.routes')
const usuarioRoutes = require('./routes/usuarios.routes')

const app = express()

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/usuarios', usuarioRoutes)

app.get('/', (req, res) => {
  res.json({ status: 'API online' })
})

module.exports = app