const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false})); //apenas dados simples
app.use(bodyParser.json()); //Apenas formato JSON

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Controll-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
})

const rotaProdutos = require('./routes/produtos');
const rotaUsuario = require('./routes/usuario');
const rotaMovimentacao = require('./routes/movimentacao');
const rotaCategoria = require('./routes/categoria');

app.use('/produtos', rotaProdutos);
app.use('/usuarios', rotaUsuario);
app.use('/movimentacao', rotaMovimentacao);
app.use('/categoria', rotaCategoria);


//Quando não encontra rota
app.use((req, res, next) =>{
    const erro = new Error('Não encontrado')
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);

    return res.send({
        erro:{
            mensagem: error.message
        }
    });
});

module.exports = app;