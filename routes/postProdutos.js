const express = require('express');
const sql = require('mssql');
const config = require('../config/db'); // Importa a configuração do banco de dados

const router = express.Router();

// Rota para inserir um novo produto
router.post('/', async (req, res) => {
    console.log('Requisição recebida para inserir produto');

    // Obtendo os dados do produto do corpo da requisição
    const { name, image, price, url, category_id, description } = req.body;

    try {
        // Conectando ao banco de dados usando a configuração
        await sql.connect(config);
        console.log('Conectado ao banco de dados');

        // Preparando a consulta SQL para inserir um novo produto
        const query = `
            INSERT INTO produtos (name, image, price, url, category_id, description)
            VALUES (@name, @image, @price, @url, @category_id, @description)
        `;

        // Criando e executando a consulta com os parâmetros
        const request = new sql.Request();
        request.input('name', sql.NVarChar(255), name); // nvarchar(255)
        request.input('image', sql.NVarChar(500), image); // nvarchar(500)
        request.input('price', sql.Decimal(10, 2), price); // decimal(10,2)
        request.input('url', sql.NVarChar(500), url); // nvarchar(500)
        request.input('category_id', sql.Int, category_id); // int
        request.input('description', sql.NVarChar(sql.MAX), description); // nvarchar(MAX)
        
        await request.query(query);
        console.log('Produto inserido com sucesso');

        // Respondendo com sucesso
        res.status(201).send('Produto inserido com sucesso');
    } catch (err) {
        console.error('Erro ao inserir produto: ', err);
        res.status(500).send('Erro ao inserir produto');
    }
});

module.exports = router; // Exporta a rota para ser usada no index.js