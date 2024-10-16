const express = require('express');
const sql = require('mssql');
const config = require('../config/db'); // Importa a configuração do banco de dados

const router = express.Router();

// Rota para buscar detalhes de um produto por ID
router.get('/', async (req, res) => {
    const { Id } = req.query; // Obtém o ID do produto da query string
    console.log(`Requisição recebida para /produtosDetalhes?Id=${Id}`);

    try {
        // Conectando ao banco de dados usando a configuração
        await sql.connect(config);
        console.log('Conectado ao banco de dados');

        // Executando a consulta SQL para obter o produto pelo ID
        const result = await sql.query`SELECT * FROM produtos WHERE id = ${Id}`;
        
        // Verifica se o produto foi encontrado
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        console.log('Dados retornados:', result.recordset);
        // Enviando os dados do produto como resposta JSON
        res.json(result.recordset[0]); // Retorna apenas um produto
    } catch (err) {
        console.error('Erro ao buscar produto: ', err);
        res.status(500).send('Erro ao buscar produto');
    }
});

module.exports = router; // Exporta as rotas para serem usadas no index.js
