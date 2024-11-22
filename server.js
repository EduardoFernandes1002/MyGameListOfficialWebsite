const express = require('express');
const app = express();
const path = require('path');
const connection = require('./database')
const jwt = require('jsonwebtoken');

const secretKey = "N&3!5P@d92q4z7Yb#fR8^uL1%$xVsG0w";

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Caminho das paginas

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'templates', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'templates', 'login.html'));
});

// Rota para informações de um jogo específico
app.get('/info/:gameId', (req, res) => {
    const gameId = req.params.gameId; 

    connection.query(
        'SELECT id_jogo, nm_jogo, ds_imagem, nr_nota, FROM T_Jogo WHERE id_jogo = ?',
        [gameId],
        (error, results) => {
            if (error) {
                return res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor!' });
            }

            if (results.length > 0) {
                res.sendFile(path.join(__dirname, 'public', 'templates', 'infoJogos.html'));
                return results
            } else {
                return res.status(404).json({ sucesso: false, mensagem: 'Jogo não encontrado!' });
            }
        }
    );
});


app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'templates', 'registro.html'));
});

app.get('/perfil', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'templates', 'perfil.html'));
});

// Rota para buscar jogos ordenados pela maior nota, sem filtrar por st_game
app.get('/jogos', (req, res) => {
    // Consulta SQL ajustada para pegar os 4 jogos com maior nota, sem considerar o st_game
    connection.query(
        'SELECT id_jogo, nm_jogo, ds_imagem, nr_nota FROM T_Jogo ORDER BY nr_nota DESC LIMIT 4;',
        (error, results) => {
            if (error) {
                return res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor!' });
            }

            if (results.length > 0) {
                // Envia os 4 jogos com maior nota
                res.json({ sucesso: true, jogos: results });
            } else {
                res.status(404).json({ sucesso: false, mensagem: 'Nenhum jogo encontrado!' });
            }
        }
    );
});



// Validação do login do usuario
app.post('/login', async (req, res) => {
    const { login, senha } = req.body;

    // Consulta no banco para pegar o usuário com o login digitado (email/nickname)
    connection.query('SELECT * FROM T_USUARIO WHERE ds_email = ? OR nm_apelido = ?', [login, login], (error, results) => {
        if (error) {
            return res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor!' });
        }

        if (results.length > 0) {
            const user = results[0];

            // Comparar a senha informada com a senha armazenada do banco
            if (senha === user.ds_senha) {
                const token = jwt.sign({ id: user.id_usuario }, secretKey, { expiresIn: '1h' });
                return res.json({ sucesso: true, mensagem: 'Login bem-sucedido!', token});
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
            'SELECT * FROM T_USUARIO WHERE ds_email = ? OR nm_apelido = ?',
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
            'INSERT INTO T_USUARIO (ds_email, nm_apelido, ds_senha, id_permissao) VALUES (?, ?, ?, ?)',
            [email, nickname, senha, 1]
        );

        res.json({ sucesso: true, mensagem: 'Registro realizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor!' + error });
    }
});

app.post('/perfil', async(req, res)=> {

    const jogoJSON = req.body

    connection.query("SELECT nm_jogo FROM t_jogo;", (error, results) => {
        if (error) {
            return res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor!' });
        }

        if(results.length > 0) {
            jogoJSON = results;
        }
    });

});


// Iniciando servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

