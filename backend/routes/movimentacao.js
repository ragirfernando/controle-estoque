const express = require('express');
const router = express.Router();
const login = require('../middleware/login')

const MovimentacaoController = require('../controllers/movimentacao-controller')


router.post('/entrada', login, MovimentacaoController.postEntradaProdutoMovimentacao);
router.post('/saida', login, MovimentacaoController.postSaidaProdutoMovimentacao);
router.get('/movimentacoes', login, MovimentacaoController.getMovimentacoes);

module.exports = router;