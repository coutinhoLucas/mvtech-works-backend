const express = require('express')
const router = express.Router()

const { criarUsuario } = require('../controllers/usuarios.controller')

router.post('/', criarUsuario)

module.exports = router