const mysql = require('../mysql');


exports.postProduto = async (req, res, next) => {
    try {
        console.log(req.body.nome)
        const query = `INSERT INTO produto (nome, preco, quantidade, id_categoria) VALUES (?, ?, ?, ?)`;

        const result = await mysql.execute(query, [
            req.body.nome,
            req.body.preco,
            req.body.quantidade,
            req.body.id_categoria
        ]);


        const response = {
            message: 'Produto inserido com sucesso',
            produto: {
                id: result.insertId,
                nome: req.body.nome,
                preco: req.body.preco,
                quantidade: req.body.quantidade,
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/produtos/'
                }
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


exports.putProduto = async (req, res, next) => {
    console.log(new Date)
    try {
        const query = `UPDATE produto
                       SET 
                        nome =?,
                        preco =?,
                        quantidade =?,
                        id_categoria =?
                    WHERE id =?`;

        const result = await mysql.execute(query, [
            req.body.nome,
            req.body.preco,
            req.body.quantidade,
            req.body.id_categoria,
            req.body.id
        ]);

        const response = {
            message: 'Produto atualizado com sucesso',
            produto: {
                id: req.body.id,
                nome: req.body.nome,
                preco: req.body.preco,
                quantidade: req.body.quantidade,
                request: {
                    type: 'PUT',
                    url: 'http://localhost:3000/produtos/'
                }
            }
        }
        return res.status(200).send({ response })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}



exports.getProduto = async (req, res, next) => {
    console.log(req.usuario)
    try {
        const result = await mysql.execute(
            `select produto.id as idProduto, produto.nome, produto.preco, produto.quantidade, categoria.id as idCategoria, categoria.descricao 
            from produto
            inner join categoria on categoria.id = produto.id_categoria;`
        )
        const response = {
            produtos: result.map(prod => {
                return {
                    id: prod.idProduto,
                    preco: prod.preco,
                    nome: prod.nome,
                    quantidade: prod.quantidade,
                    categoria: {
                        id: prod.idCategoria,
                        descricao: prod.descricao
                    },
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna todos os produtos',
                        url: 'http://localhost:3000/produtos/'
                    }
                }
            })
        }
        return res.status(200).send({ response })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

exports.getProdutoId = async (req, res, next) => {
    try {
        const query = `select produto.id as idProduto, produto.nome, produto.preco, produto.quantidade, categoria.id as idCategoria, categoria.descricao from produto
        inner join categoria on categoria.id = produto.id_categoria
        where produto.id = ?`;

        const result = await mysql.execute(query, [
            req.body.id
        ]);
        const response = {
            produto: result.map(prod => {
                return {
                    id: prod.idProduto,
                    nome: prod.nome,
                    preco: prod.preco,
                    quantidade: prod.quantidade,
                    categoria: {
                        id: prod.idCategoria,
                        descricao: prod.descricao
                    },
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna produto por id',
                        url: 'http://localhost:3000/produtos/'
                    }
                }
            })

        }
        return res.status(200).send({ response })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}




