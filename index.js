const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const config = require('./config/db'); // Certifique-se de que o caminho esteja correto

// Importação das rotas
const produtosRotas = require('./routes/getProdutos');
const categoriasRotas = require('./routes/getCategorias');
const produtosPorCategoriaRotas = require('./routes/getProdutosCategoria');
const produtosDetalhesRotas = require('./routes/getProdutosDetalhes');
const postProdutosRotas = require('./routes/postProdutos');
const postCategoriaRotas = require('./routes/postCategoria');
const deleteProduto = require('./routes/deleteProduto'); // A rota de exclusão

const app = express();

// Middleware
app.use(cors({ origin: '*' })); // Permitir todas as origens
app.use(express.json()); // Para suportar JSON no corpo da requisição

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

// Definindo as rotas
app.use('/products', produtosRotas); // Rotas para produtos
app.use('/categories', categoriasRotas); // Rotas para categorias
app.use('/produtosCategoria', produtosPorCategoriaRotas); // Produtos por categoria
app.use('/produtosDetalhes', produtosDetalhesRotas); // Detalhes dos produtos
app.use('/addProduto', postProdutosRotas); // Adicionar produtos
app.use('/addCategoria', postCategoriaRotas); // Adicionar categorias
app.delete('/deleteProduto/:id', deleteProduto); // Exclusão de produtos

// Rota para verificar o status da API
app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

// Exportar a função para ser usada pelo Vercel
module.exports = async (req, res) => {
    await connectDB(); // Conecta ao banco de dados, se não estiver conectado
    app(req, res); // Processa a requisição usando o Express
};
