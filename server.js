const express = require('express');
const app = express();
const path = require('path');
const connection = require('./database');
const bodyParser = require('body-parser'); // Adicione isso para processar dados do formulário

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Validação do login do usuario
app.post('/login', (req, res) => {
    const { login, senha } = req.body;

    // Consulta no banco para pegar o usuário com o login informado (email ou nickname)
    connection.query('SELECT * FROM user WHERE ds_email = ? OR nm_nickname = ?', [login, login], (error, results) => {
        if (error) {
            return res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor!' });
        }

        if (results.length > 0) {
            const user = results[0];  // Pega o primeiro usuário encontrado

            // Comparação da senha informada com a senha armazenada no banco
            bcrypt.compare(senha, user.cdSenha, (err, result) => {
                if (err) {
                    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao verificar a senha!' });
                }
                if (result) {
                    return res.json({ sucesso: true, mensagem: 'Login bem-sucedido!' });
                } else {
                    return res.status(400).json({ sucesso: false, mensagem: 'Credenciais inválidas!' });
                }
            });
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


app.get('/perfil', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'templates', 'perfil.html'));
});

app.use(express.urlencoded({ extended: true })); // Adicione isso para processar dados de formulários


// Inicie o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
