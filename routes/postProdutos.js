const sql = require('mssql');
const config = require('../config/db'); // Importa a configuração do banco de dados

// Função para inserir um novo produto
const addProduct = async (req, res) => {
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
        request.input('name', sql.NVarChar(255), name);
        request.input('image', sql.NVarChar(500), image);
        request.input('price', sql.Decimal(10, 2), price);
        request.input('url', sql.NVarChar(500), url);
        request.input('category_id', sql.Int, category_id);
        request.input('description', sql.NVarChar(sql.MAX), description);
        
        await request.query(query);
        console.log('Produto inserido com sucesso');

        // Respondendo com sucesso
        res.status(201).json({ message: 'Produto inserido com sucesso' });
    } catch (err) {
        console.error('Erro ao inserir produto: ', err);
        res.status(500).json({ message: 'Erro ao inserir produto', error: err });
    }
};

// Exporta a função como um manipulador de requisições
module.exports = async (req, res) => {
    if (req.method === 'POST') {
        return addProduct(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
