// index.js
const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const config = require('./config/db');

// Importa as rotas existentes
const produtosRotas = require('./routes/produtosRotas');
const categoriasRotas = require('./routes/categoriasRotas');
const produtosPorCategoriaRotas = require('./routes/produtosCategoriaRotas');
const produtosDetalhesRotas = require('./routes/produtosDetalhesRotas');
const postProdutosRotas = require('./routes/postProdutos');
const postCategoriaRotas = require('./routes/postCategoria'); // Nova rota para inserir categoria

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Define as rotas
app.use('/products', produtosRotas);
app.use('/categories', categoriasRotas);
app.use('/produtosCategoria', produtosPorCategoriaRotas);
app.use('/produtosDetalhes', produtosDetalhesRotas);
app.use('/addProduct', postProdutosRotas);
app.use('/addCategory', postCategoriaRotas); // Adiciona a rota para inserir categorias

// Rota para verificar o status da API
app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

// Conecta ao banco de dados e inicia o servidor
sql.connect(config).then(() => {
    console.log('Conectado ao banco de dados');
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
});
