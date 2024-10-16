require('dotenv').config(); // Carrega as variáveis do .env

// Configuração da conexão com o banco de dados
const config = {
    user: process.env.DB_USER,        // Usuário do banco de dados vindo do arquivo .env
    password: process.env.DB_PASSWORD, // Senha do banco de dados vindo do arquivo .env
    server: process.env.DB_SERVER,     // Servidor do banco de dados vindo do arquivo .env
    database: process.env.DB_DATABASE, // Nome do banco de dados vindo do arquivo .env
    options: {
        encrypt: true,                 // Mantido para conexões Azure
        trustServerCertificate: true,  // Necessário para certificados autoassinados
    },
};

module.exports = config; // Exporta o objeto de configuração
