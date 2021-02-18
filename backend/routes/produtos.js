const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const login = require('../middleware/login')

const ProdutosController = require('../controllers/produtos-controller')


router.get('/', login, ProdutosController.getProduto);
router.get('/id', ProdutosController.getProdutoId);
router.post('/cadastrar', ProdutosController.postProduto);
router.put('/atualizar', ProdutosController.putProduto);




module.exports = router;