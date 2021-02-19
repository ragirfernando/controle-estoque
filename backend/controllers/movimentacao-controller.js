const mysql = require('../mysql');

exports.getMovimentacoes = async (req, res, next) => {
    try {
        const movimentacaoes = await mysql.execute(`
        select movimentacao.id, 
        movimentacao.data_hora, 
        usuario.nome as usuario, 
        produto.nome as produto, 
        movimentacao.tipo, 
        movimentacao.quantidade_old, 
        movimentacao.quantidade_new
        from movimentacao
            inner join usuario on usuario.id = movimentacao.id_usuario
            inner join produto on produto.id = movimentacao.id_produto;`);

        return res.status(201).send(movimentacaoes);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

exports.postEntradaProdutoMovimentacao = async (req, res, next) => {
    try {
        const produtoId = await mysql.execute(`SELECT *FROM produto WHERE id = ?`, [req.body.id]);
        const idProduto = produtoId[0].id;
        const quantidadeProdutoOld = produtoId[0].quantidade

        const usuarioEmail = await mysql.execute(`SELECT * FROM usuario WHERE email = ?`, [req.usuario.email]);
        const idUsuario = usuarioEmail[0].id;
        const quantidadeInformada = req.body.quantidade;
        if(quantidadeInformada < 1 ){
            return res.status(412).send({erro: "Informe a quantidade"});
        }

        const quantidadeNew = quantidadeProdutoOld + quantidadeInformada;
        const tipoOperacao = req.body.tipo;

        const result = await mysql.execute(`UPDATE produto SET quantidade = ? WHERE id =?`, [quantidadeNew, req.body.id]);

        const queryMovimentacao = `INSERT INTO movimentacao 
        (data_hora, id_usuario, id_produto, tipo, quantidade_old, quantidade_new) 
        VALUES (?, ?, ?, ?, ?, ?);`;

        const salvarMovimentacao = await mysql.execute(queryMovimentacao, [
            new Date(),
            idUsuario,
            idProduto,
            tipoOperacao,
            quantidadeProdutoOld,
            quantidadeNew
        ]);

        const response = {
            message: 'Entrada de produto realizada com sucesso',
            request: {
                type: 'POST'
            }

        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

exports.postSaidaProdutoMovimentacao = async (req, res, next) => {
    try {
        const produtoId = await mysql.execute(`SELECT *FROM produto WHERE id = ?`, [req.body.id]);
        const idProduto = produtoId[0].id;
        const quantidadeProdutoOld = produtoId[0].quantidade

        const usuarioEmail = await mysql.execute(`SELECT * FROM usuario WHERE email = ?`, [req.usuario.email]);
        const idUsuario = usuarioEmail[0].id;
        const quantidadeInformada = req.body.quantidade;

        if(quantidadeInformada < 1 ){
            return res.status(412).send({erro: "Informe a quantidade"});
        }

        if(quantidadeInformada > quantidadeProdutoOld ){
            return res.status(412).send({erro: "Estoque insuficiente"});
        }


        const quantidadeNew = quantidadeProdutoOld - quantidadeInformada;
        const tipoOperacao = req.body.tipo;

        const result = await mysql.execute(`UPDATE produto SET quantidade = ? WHERE id =?`, [quantidadeNew, req.body.id]);

        const queryMovimentacao = `INSERT INTO movimentacao 
        (data_hora, id_usuario, id_produto, tipo, quantidade_old, quantidade_new) 
        VALUES (?, ?, ?, ?, ?, ?);`;

        const salvarMovimentacao = await mysql.execute(queryMovimentacao, [
            new Date(),
            idUsuario,
            idProduto,
            tipoOperacao,
            quantidadeProdutoOld,
            quantidadeNew
        ]);

        const response = {
            message: 'Saida de produto realizada com sucesso',
            request: {
                type: 'POST'
            }

        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};







