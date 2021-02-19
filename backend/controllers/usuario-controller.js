const mysql = require('../mysql');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.postUsuario = async (req, res, next) => {
    try {
        const consultaUsuarioCadastrado = `SELECT * FROM usuario where email = ?`;
        const usuarioCadastrado = await mysql.execute(consultaUsuarioCadastrado, [req.body.email]);

        if (usuarioCadastrado.length > 0) {
            res.status(409).send({ mensagem: 'Usuário já cadastrado' })

        } else {
            const query = `INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)`;

            const senhaHash = await bcrypt.hash(req.body.senha, 10);

            const result = await mysql.execute(query, [req.body.nome, req.body.email, senhaHash]);

            response = {
                mensagem: 'Usuário criado com sucesso',
                usuarioCriado: {
                    id: result.insertId,
                    nome: req.body.nome,
                    email: req.body.email,
                }
            }
            return res.status(200).send({ response })
        }

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

exports.postUsuarioLogin = async (req, res, next) => {
    try {
        console.log(req.body.senha)
        const consultaUsuarioCadastrado = `SELECT * FROM usuario where email = ?`;
        const usuarioCadastrado = await mysql.execute(consultaUsuarioCadastrado, [req.body.email]);

        if (usuarioCadastrado.length < 1) {
            return res.status(401).send({ mensagem: 'Falha na autenticação' })

        }
        const match = await bcrypt.compare(req.body.senha, usuarioCadastrado[0].senha);

        if (usuarioCadastrado) {
            if (match) {
                const token = jwt.sign({
                    nome: usuarioCadastrado[0].nome,
                    email: usuarioCadastrado[0].email
                },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "24h"
                    });

                response = {
                    user: usuarioCadastrado,
                    token: token
                }

                return res.status(200).send(response)
            }
        }

        return res.status(401).send({ message: 'Falha na autenticação' })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}




