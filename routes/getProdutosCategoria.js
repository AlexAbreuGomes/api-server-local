const sql = require('mssql');
const config = require('../config/db'); // Importa a configuração do banco de dados

// Função para buscar produtos por categoria
const getProductsByCategory = async (req, res) => {
    const { categoryId } = req.query; // Pegando o id da categoria dos parâmetros da URL

    // Verifica se o 'categoryId' foi passado
    if (!categoryId) {
        return res.status(400).json({ error: 'categoryId é obrigatório' });
    }

    try {
        await sql.connect(config);
        console.log('Conectado ao banco de dados');

        const result = await sql.query(`SELECT * FROM produtos WHERE category_id = ${categoryId}`);
        
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        res.status(500).send('Erro ao buscar produtos');
    }
};

// Exporta a função como um manipulador de requisições
module.exports = async (req, res) => {
    if (req.method === 'GET') {
        return getProductsByCategory(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
