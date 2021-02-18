const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const login = require('../middleware/login')

const CategoriaController = require('../controllers/categoria-controller')

router.post('/', login, CategoriaController.postCategoria);
router.put('/', login, CategoriaController.putCategoria);
router.get('/', login, CategoriaController.getCategoria);
router.get('/categoriaId', login, CategoriaController.getCategoriaId);

module.exports = router;