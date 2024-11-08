const express = require('express');
const app = express();
const path = require('path');
const connection = require('./database')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Caminho das paginas

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'templates', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'templates', 'login.html'));
});

app.get('/info', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'templates', 'infoJogos.html'));
});

app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'templates', 'registro.html'));
});

app.get('/perfil', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'templates', 'perfil.html'));
});



// Validação do login do usuario
app.post('/login', async (req, res) => {
    const { login, senha } = req.body;

    // Consulta no banco para pegar o usuário com o login digitado (email/nickname)
    connection.query('SELECT * FROM user WHERE ds_email = ? OR nm_nickname = ?', [login, login], (error, results) => {
        if (error) {
            return res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor!' });
        }

        if (results.length > 0) {
            const user = results[0];

            // Comparar a senha informada com a senha armazenada do banco
            if (senha === user.cdSenha) {
                return res.json({ sucesso: true, mensagem: 'Login bem-sucedido!' });
            } else {
                return res.status(400).json({ sucesso: false, mensagem: 'Credenciais inválidas!' });
            }
        } else {
            return res.status(400).json({ sucesso: false, mensagem: 'Credenciais inválidas!' });
        }
    });
});

// Rota para registro de usuário
app.post('/registro', async (req, res) => {
    const { email, nickname, senha } = req.body;

    try {
        // Verificar se já existe um usuário com o mesmo email ou apelido
        const [existingUser] = await connection.promise().query(
            'SELECT * FROM user WHERE ds_email = ? OR nm_nickname = ?',
            [email, nickname]
        );

        if (existingUser.length > 0) {
            const conflictMessage = existingUser[0].ds_email === email
                ? 'Email já está em uso.'
                : 'Apelido já está em uso.';
            return res.status(400).json({ sucesso: false, mensagem: conflictMessage });
        }

        // Inserir novo usuário com a senha diretamente e nivel_permissao padrão de 3
        await connection.promise().query(
            'INSERT INTO user (ds_email, nm_nickname, cdSenha, Permissao_idPermissao) VALUES (?, ?, ?, ?)',
            [email, nickname, senha, 3]
        );

        res.json({ sucesso: true, mensagem: 'Registro realizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor!' + error });
    }
});

// Iniciando servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});