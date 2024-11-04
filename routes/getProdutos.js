const sql = require('mssql');
const config = require('../config/db'); // Importa a configuração do banco de dados

// Função para buscar todos os produtos
const getProducts = async (req, res) => {
    console.log('Requisição recebida para /api/products');

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
};

// Exporta a função como um manipulador de requisições
module.exports = async (req, res) => {
    if (req.method === 'GET') {
        return getProducts(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
