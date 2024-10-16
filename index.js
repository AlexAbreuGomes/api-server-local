const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const config = require('./config/db'); // Importa a configuração do banco de dados
const produtosRotas = require('./routes/produtosRotas'); // Rotas para produtos
const categoriasRotas = require('./routes/categoriasRotas'); // Rotas para categorias
const produtosPorCategoriaRotas = require('./routes/produtosCategoriaRotas'); // Rotas para produtos por categoria
const produtosDetalhesRotas = require('./routes/produtosDetalhesRotas'); // Rota para detalhes de produtos


const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do CORS
app.use(cors({
    origin: '*', // Ajuste conforme necessário
}));

// Rotas
app.use('/products', produtosRotas); // Usa o arquivo de rotas de produtos
app.use('/categories', categoriasRotas); // Usa o arquivo de rotas de categorias
app.use('/produtosCategoria', produtosPorCategoriaRotas); // Usa o arquivo de rotas de produtos por categoria
app.use('/produtosDetalhes', produtosDetalhesRotas); // Usa o arquivo de rotas de detalhes de produtos


// Rota para um status simples de "alive"
app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

// Conectando ao banco de dados e iniciando o servidor
sql.connect(config).then(() => {
    console.log('Conectado ao banco de dados');
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(err => {
    console.error('Erro ao conectar ao banco de dados: ', err);
});
