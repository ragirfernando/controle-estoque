const mysql = require('../mysql');


exports.postCategoria = async (req, res, next) => {
    try {
        const query = `INSERT INTO categoria (descricao) VALUES (?)`;
        const result = await mysql.execute(query, [req.body.descricao]);

        const response = {
            message: 'Categoria inserido com sucesso',
            categoria: {
                id: result.insertId,
                descricao: req.body.descricao,
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/categoria/'
                }
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


exports.putCategoria = async (req, res, next) => {
    console.log(new Date)
    try {
        const query = `UPDATE categoria SET descircao = ? WHERE id = ?`;

        const result = await mysql.execute(query, [req.body.descricao, req.body.id]);

        const response = {
            message: 'Categoria atualizado com sucesso',
            categoria: {
                id: req.body.id,
                descricao: req.body.descricao,
                request: {
                    type: 'PUT',
                    url: 'http://localhost:3000/categoria/'
                }
            }
        }
        return res.status(200).send({ response })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}



exports.getCategoria = async (req, res, next) => {
    try {
        const categorias = await mysql.execute(`SELECT *FROM categoria`)
        // const response = {
        //     categoria: result,
        //     request: {
        //         tipo: 'GET',
        //         descricao: 'Retorna todas as categorias',
        //         url: 'http://localhost:3000/categoria/'
        //     }

        // }
        return res.status(200).send(categorias)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }

}

exports.getCategoriaId = async (req, res, next) => {
    try {
        const result = await mysql.execute(`SELECT *FROM categoria WHERE id = ?`, [req.body.id])
        const response = {
            categoria: result,
            request: {
                tipo: 'GET',
                descricao: 'Retorna categoria por id',
                url: 'http://localhost:3000/categoria/'
            }

        }
        return res.status(200).send({ response })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }

}




