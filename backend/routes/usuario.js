const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


const UsuariosController = require('../controllers/usuario-controller')

router.post('/cadastro', UsuariosController.postUsuario);
router.post('/login', UsuariosController.postUsuarioLogin);


module.exports = router;