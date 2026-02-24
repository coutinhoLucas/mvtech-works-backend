const express = require('express')

const authRoutes = require('./routes/auth.routes')
const usuarioRoutes = require('./routes/usuarios.routes')
const clientesRoutes = require('./routes/clientes.routes')

const app = express()

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/usuarios', usuarioRoutes)
app.use('/clientes', clientesRoutes)

app.get('/', (req, res) => {
  res.json({ status: 'API online' })
})

const auth = require('./middleware/auth')

app.get('/perfil', auth, (req, res) => {
  res.json(req.usuario)
})

module.exports = app