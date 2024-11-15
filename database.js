const db = require('mysql2')
const connection = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'GameList'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar o banco de dados:', err);
    } else {
        console.log('Conexão bem sucedida!');
    }
});

module.exports = connection;