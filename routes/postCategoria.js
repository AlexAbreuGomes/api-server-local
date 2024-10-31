// routes/postCategoria.js
const express = require('express');
const sql = require('mssql');
const config = require('../config/db'); // Importa a configuração do banco de dados

const router = express.Router();

// Rota POST para adicionar uma nova categoria
router.post('/', async (req, res) => {
    // Obtém os dados do corpo da requisição
    const { title, image } = req.body;

    try {
        // Conecta ao banco de dados usando a configuração
        await sql.connect(config);

        // Define a consulta SQL para inserir uma nova categoria
        const query = `
            INSERT INTO categorias (title, image)
            VALUES (@title, @image)
        `;

        // Cria a requisição e define os parâmetros
        const request = new sql.Request();
        request.input('title', sql.NVarChar(255), title); // Define o tipo e valor de title
        request.input('image', sql.NVarChar(500), image); // Define o tipo e valor de image

        // Executa a consulta para inserir a categoria
        await request.query(query);

        // Responde com uma mensagem de sucesso
        res.status(201).json({ message: 'Categoria inserida com sucesso!' });
    } catch (err) {
        console.error('Erro ao inserir categoria: ', err);
        res.status(500).json({ message: 'Erro ao inserir categoria', error: err });
    }
});

module.exports = router;
