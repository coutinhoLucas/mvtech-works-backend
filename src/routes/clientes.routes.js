const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const {
  criarCliente,
  listarClientes,
  buscarClientePorId,
  atualizarCliente,
  deletarCliente
} = require('../controllers/clientes.controller')

router.use(auth)

router.post('/', criarCliente)
router.get('/', listarClientes)
router.get('/:id', buscarClientePorId)
router.put('/:id', atualizarCliente)
router.delete('/:id', deletarCliente)

module.exports = router