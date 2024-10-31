const express = require('express');
const sql = require('mssql');
const config = require('../config/db'); // Importa a configuração do banco de dados

const router = express.Router();

// Rota para buscar todos os produtos
router.get('/', async (req, res) => {
    console.log('Requisição recebida para /products');
    
    try {
        // Conectando ao banco de dados usando a configuração
        await sql.connect(config);
        console.log('Conectado ao banco de dados');

        // Executando a consulta SQL para obter todos os produtos
        const result = await sql.query('SELECT * FROM produtos');
        

        // Enviando os dados de produtos como resposta JSON
        res.json(result.recordset);
    } catch (err) {
        console.error('Erro ao buscar produtos: ', err);
        res.status(500).send('Erro ao buscar produtos');
    }
});

module.exports = router; // Exporta as rotas para serem usadas no index.js
