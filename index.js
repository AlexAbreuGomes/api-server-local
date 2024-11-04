const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const config = require('./config/db');

const produtosRotas = require('./routes/getProdutos');
const categoriasRotas = require('./routes/getCategorias');
const produtosPorCategoriaRotas = require('./routes/getProdutosCategoria');
const produtosDetalhesRotas = require('./routes/getProdutosDetalhes');
const postProdutosRotas = require('./routes/postProdutos');
const postCategoriaRotas = require('./routes/postCategoria');
const deleteProduto = require('./routes/deleteProduto');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// Variável para manter a conexão do banco de dados
let isConnected = false;

// Função para conectar ao banco de dados
const connectDB = async () => {
    if (!isConnected) {
        try {
            await sql.connect(config);
            isConnected = true;
            console.log('Conectado ao banco de dados');
        } catch (err) {
            console.error('Erro ao conectar ao banco de dados:', err);
        }
    }
};

// Define as rotas
app.use('/products', produtosRotas);
app.use('/categories', categoriasRotas);
app.use('/produtosCategoria', produtosPorCategoriaRotas);
app.use('/produtosDetalhes', produtosDetalhesRotas);
app.use('/addProduto', postProdutosRotas);
app.use('/addCategoria', postCategoriaRotas);
app.use('/deleteProduto', deleteProduto);

// Rota para verificar o status da API
app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

// Exporte a função para ser usada pelo Vercel
module.exports = async (req, res) => {
    await connectDB(); // Conecta ao banco de dados, se não estiver conectado
    app(req, res); // Processa a requisição usando o Express
};
