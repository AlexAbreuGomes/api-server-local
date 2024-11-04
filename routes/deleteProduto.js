const sql = require('mssql');
const config = require('../config/db');

module.exports = async (req, res) => {
    if (req.method === 'DELETE') {
        const productId = parseInt(req.query.id, 10); // Pega o ID do produto da query string
        console.log(`Requisição recebida para excluir o produto com ID: ${productId}`);

        if (isNaN(productId)) {
            return res.status(400).send('ID do produto inválido'); // Retorna 400 Bad Request se o ID não for válido
        }

        try {
            // Conectando ao banco de dados usando a configuração
            await sql.connect(config);
            console.log('Conectado ao banco de dados');

            // Executando a consulta SQL para excluir o produto
            const result = await sql.query`DELETE FROM produtos WHERE id = ${productId}`;

            // Verifica se algum produto foi excluído
            if (result.rowsAffected[0] === 0) {
                return res.status(404).send('Produto não encontrado');
            }

            // Enviando uma resposta de sucesso
            res.status(204).send(); // Retorna 204 No Content
        } catch (err) {
            console.error('Erro ao excluir produto: ', err);
            res.status(500).send('Erro ao excluir produto');
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
