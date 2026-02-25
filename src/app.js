const express = require('express')
const cors = require('cors');

const authRoutes = require('./routes/auth.routes')
const usuarioRoutes = require('./routes/usuarios.routes')
const clientesRoutes = require('./routes/clientes.routes')

const app = express()

app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://mvtech-works-frontend.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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