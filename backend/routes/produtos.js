const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const login = require('../middleware/login')

const ProdutosController = require('../controllers/produtos-controller')

router.get('/produtos', login, ProdutosController.getProduto);
router.get('/produtos/id', login, ProdutosController.getProdutoId);
router.post('/cadastrar', login, ProdutosController.postProduto);
router.put('/atualizar', ProdutosController.putProduto);

module.exports = router;