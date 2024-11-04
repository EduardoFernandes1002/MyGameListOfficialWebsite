const express = require('express');
const app = express();
const path = require('path');
const connection = require('./database');
const bodyParser = require('body-parser'); // Adicione isso para processar dados do formulário

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para lidar com login
app.post('/login', (req, res) => {
    const { login, senha } = req.body;

    // Aqui você pode realizar a verificação no banco de dados sem logar a senha
    connection.query('SELECT * FROM user WHERE (ds_email = ? OR nm_nickname = ?) AND cdSenha = ?', [login, login, senha], (error, results) => {
        if (error) {
            return res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor!' });
        }
        if (results.length > 0) {
            return res.json({ sucesso: true, mensagem: 'Login bem-sucedido!' });
        } else {
            return res.status(400).json({ sucesso: false, mensagem: 'Credenciais inválidas!' });
        }
    });
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'templates', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'templates', 'login.html'));
});

app.use(express.urlencoded({ extended: true })); // Adicione isso para processar dados de formulários


// Inicie o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
