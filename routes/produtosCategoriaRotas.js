const express = require('express');
const sql = require('mssql');
const config = require('../config/db'); // Importa a configuração do banco de dados

const router = express.Router();

// Rota para buscar produtos por categoria
router.get('/', async (req, res) => {
    const { categoryId } = req.query; // Pegando o id da categoria dos parâmetros da URL

    // Verifica se o 'categoryId' foi passado
    if (!categoryId) {
        return res.status(400).json({ error: 'categoryId é obrigatório' });
    }

    try {
        await sql.connect(config);
        console.log('Conectado ao banco de dados');

        const result = await sql.query(`SELECT * FROM produtos WHERE category_id = ${categoryId}`);
        console.log('Produtos retornados:', result.recordset);

        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        res.status(500).send('Erro ao buscar produtos');
    }
});

module.exports = router; // Exporta as rotas para serem usadas no index.js
