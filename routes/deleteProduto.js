const sql = require('mssql');
const config = require('../config/db');

module.exports = async (req, res) => {
    if (req.method === 'DELETE') {
        const productId = parseInt(req.params.id, 10); // Altere aqui para usar req.params.id
        console.log(`Requisição recebida para excluir o produto com ID: ${productId}`);

        if (isNaN(productId)) {
            return res.status(400).send('ID do produto inválido');
        }

        try {
            await sql.connect(config);
            console.log('Conectado ao banco de dados');

            const result = await sql.query`DELETE FROM produtos WHERE id = ${productId}`;

            if (result.rowsAffected[0] === 0) {
                return res.status(404).send('Produto não encontrado');
            }

            res.status(204).send();
        } catch (err) {
            console.error('Erro ao excluir produto: ', err);
            res.status(500).send('Erro ao excluir produto');
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
