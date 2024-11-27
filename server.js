const express = require("express");
const app = express();
const path = require("path");
const connection = require("./database");
const jwt = require("jsonwebtoken");

const secretKey = "N&3!5P@d92q4z7Yb#fR8^uL1%$xVsG0w";

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "templates")));

app.use(express.json());

// Caminho das paginas
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "templates", "index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "templates", "login.html"));
});

app.get("/rank", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "templates", "rank.html"));
});

// Rota para enviar o HTML
app.get("/info/:gameId", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "templates", "infoJogos.html"));
});

// Rota para retornar os dados do jogo
app.get("/jogo/:gameId", (req, res) => {
    const gameId = req.params.gameId;

    connection.query(
        "SELECT id_jogo, nm_jogo, ds_imagem, nr_nota, ds_sinopse FROM t_jogo WHERE id_jogo = ?",
        [gameId],
        (error, results) => {
            if (error) {
                return res
                    .status(500)
                    .json({ sucesso: false, mensagem: "Erro no servidor!" });
            }

            if (results.length > 0) {
                return res.json({
                    sucesso: true,
                    jogo: results[0], // Retorna o primeiro (e único) jogo encontrado
                });
            } else {
                return res
                    .status(404)
                    .json({ sucesso: false, mensagem: "Jogo não encontrado!" });
            }
        }
    );
});

app.get("/registro", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "templates", "registro.html"));
});

app.get('/perfil_redirect', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "templates", "perfil.html"));
});

app.get('/perfil_redirect', verificarToken, (req, res) => {
    const token = req.headers.authorization.split(" ")[1]; // Extrai o token do header
    res.redirect(`/perfil.html?token=${token}`);
});




app.get("/perfil/:id_lista", verificarToken, async (req, res) => {
    const idUsuario = req.userId; // Pega o ID do usuário do token
    const { id_lista } = req.params; // Pega o ID da lista da URL

    try {
        // Query para buscar os jogos do usuario com base no id_lista e o apelido do usuário pelo idUsuario
        const queryJogos = `
      SELECT 
        j.id_jogo,
        j.ds_imagem,
        j.nm_jogo
      FROM t_jogo j
      INNER JOIN t_jogo_adicionado ja 
        ON j.id_jogo = ja.id_jogo
      INNER JOIN t_lista l 
        ON ja.id_lista = l.id_lista
      WHERE l.id_lista = ? AND l.id_usuario = ?
    `;

        const queryApelido = `
      SELECT nm_apelido FROM t_usuario WHERE id_usuario = ?
    `;

        const [resultJogos] = await connection.promise().query(queryJogos, [id_lista, idUsuario]);
        const [resultApelido] = await connection.promise().query(queryApelido, [idUsuario]);

        if (resultJogos.length === 0) {
            return res.status(404).json({ mensagem: "Nenhum jogo encontrado na lista" });
        }

        if (resultApelido.length === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        const nm_apelido = resultApelido[0].nm_apelido;
        const jogos = resultJogos.map(row => ({
            id_jogo: row.id_jogo,
            ds_imagem: row.ds_imagem,
            nm_jogo: row.nm_jogo
        }));

        res.json({ apelido: nm_apelido, jogos: jogos });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao buscar informações do perfil.");
    }
});



// algo especifico para ranks por agora
app.get("/jogos/rank", (req, res) => {
    const queryJogosGerais = `
      SELECT 
          j.id_jogo,
          j.nm_jogo,
          j.ds_imagem,
          j.nr_nota 
      FROM t_jogo j
      ORDER BY j.nr_nota DESC;
    `;

    connection.query(queryJogosGerais, (error, resultadosGerais) => {
        if (error) {
            return res
                .status(500)
                .json({ sucesso: false, mensagem: "Erro ao buscar jogos gerais!" });
        }

        res.json({
            sucesso: true,
            jogosGerais: resultadosGerais,
        });
    });
});

app.get("/jogos", (req, res) => {
    const queryJogosGerais = `SELECT 
        j.id_jogo,
        j.nm_jogo,
        j.ds_imagem,
        j.nr_nota 
    FROM t_jogo j
    ORDER BY j.nr_nota DESC LIMIT 10;`;

    const queryJogosAcao = `
        SELECT j.id_jogo, j.nm_jogo, j.ds_imagem, j.nr_nota 
        FROM t_jogo j
        JOIN t_genero_do_jogo gj ON j.id_jogo = gj.id_jogo
        WHERE gj.id_genero = 10
        ORDER BY j.nr_nota DESC
        LIMIT 10;
    `;

    // Executar as duas consultas paralelamente
    connection.query(queryJogosGerais, (errorGerais, resultadosGerais) => {
        if (errorGerais) {
            return res
                .status(500)
                .json({ sucesso: false, mensagem: "Erro ao buscar jogos gerais!" });
        }

        connection.query(queryJogosAcao, (errorAcao, resultadosAcao) => {
            if (errorAcao) {
                return res
                    .status(500)
                    .json({ sucesso: false, mensagem: "Erro ao buscar jogos de ação!" });
            }

            res.json({
                sucesso: true,
                jogosGerais: resultadosGerais,
                jogosAcao: resultadosAcao,
            });
        });
    });
});

app.get("/jogos/rank", (req, res) => {
    // Consulta SQL ajustada para pegar os 4 jogos com maior nota, sem considerar o st_game
    connection.query(
        "SELECT id_jogo, nm_jogo, ds_imagem, nr_nota FROM t_jogo ORDER BY nr_nota DESC;",
        (error, results) => {
            if (error) {
                return res
                    .status(500)
                    .json({ sucesso: false, mensagem: "Erro no servidor!" });
            }

            if (results.length > 0) {
                // Envia os 4 jogos com maior nota
                res.json({ sucesso: true, jogos: results });
            } else {
                res
                    .status(404)
                    .json({ sucesso: false, mensagem: "Nenhum jogo encontrado!" });
            }
        }
    );
});


// Validação do login do usuario
app.post("/login", async (req, res) => {
    const { login, senha } = req.body;

    // Consulta no banco para pegar o usuário com o login digitado (email/nickname)
    connection.query(
        "SELECT * FROM t_usuario WHERE ds_email = ? OR nm_apelido = ?",
        [login, login],
        (error, results) => {
            if (error) {
                return res
                    .status(500)
                    .json({ sucesso: false, mensagem: "Erro no servidor!" });
            }

            if (results.length > 0) {
                const user = results[0];

                // Comparar a senha informada com a senha armazenada do banco
                if (senha === user.ds_senha) {
                    const token = jwt.sign({ id: user.id_usuario }, secretKey, {
                        expiresIn: "1h",
                    });
                    return res.json({
                        sucesso: true,
                        mensagem: "Login bem-sucedido!",
                        token,
                    });
                } else {
                    return res
                        .status(400)
                        .json({ sucesso: false, mensagem: "Credenciais inválidas!" });
                }
            } else {
                return res
                    .status(400)
                    .json({ sucesso: false, mensagem: "Credenciais inválidas!" });
            }
        }
    );
});

// Rota para registro de usuário
app.post("/registro", async (req, res) => {
    const { email, nickname, senha } = req.body;

    try {
        // Verificar se já existe um usuário com o mesmo email ou apelido
        const [existingUser] = await connection
            .promise()
            .query("SELECT * FROM t_usuario WHERE ds_email = ? OR nm_apelido = ?", [
                email,
                nickname,
            ]);

        if (existingUser.length > 0) {
            const conflictMessage =
                existingUser[0].ds_email === email
                    ? "Email já está em uso."
                    : "Apelido já está em uso.";
            return res
                .status(400)
                .json({ sucesso: false, mensagem: conflictMessage });
        }

        // Inserir novo usuário com a senha diretamente e nivel_permissao padrão de 3
        await connection
            .promise()
            .query(
                "INSERT INTO t_usuario (ds_email, nm_apelido, ds_senha, id_permissao) VALUES (?, ?, ?, ?)",
                [email, nickname, senha, 1]
            );

        res.json({ sucesso: true, mensagem: "Registro realizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        res
            .status(500)
            .json({ sucesso: false, mensagem: "Erro no servidor!" + error });
    }
});

// Lógica para avaliação da nota pessoal e media da nota total
app.post("/avaliacao", async (req, res) => {
    const { nota, data, idUsuario, jogoId } = req.body;
    console.log(`Recebido: nota=${nota}, id=${idUsuario} data=${data}, jogoId=${jogoId}`);

    if (!nota || !data || !jogoId || !idUsuario) {
        return res
            .status(400)
            .json({ error: "Parâmetros faltando: nota, data ou jogoId." });
    }

    try {
        // Verifica se já existe uma avaliação para o usuário e o jogo
        const checkQuery = `
            SELECT COUNT(*) AS count 
            FROM t_avaliacao 
            WHERE id_usuario = ? AND id_jogo = ?;
        `;

        const [rows] = await connection.promise().query(checkQuery, [idUsuario, jogoId]);
        const count = rows[0].count;

        console.log(`Avaliação existente: ${count > 0 ? "Sim" : "Não"}`);

        // Se já existir uma avaliação, faz um UPDATE
        if (count > 0) {
            const updateQuery = `
                UPDATE t_avaliacao 
                SET nr_usuario_nota = ?, dt_envio = ? 
                WHERE id_usuario = ? AND id_jogo = ?;
            `;
            await connection.promise().query(updateQuery, [nota, data, idUsuario, jogoId]);
            console.log("Avaliação atualizada com sucesso!");
        } else {
            // Caso contrário, faz um INSERT
            const insertQuery = `
                INSERT INTO t_avaliacao (dt_envio, nr_usuario_nota, id_jogo, id_usuario)
                VALUES (?, ?, ?, ?);
            `;
            await connection.promise().query(insertQuery, [data, nota, jogoId, idUsuario]);
            console.log("Avaliação salva com sucesso!");
        }

        // Agora, calcula a média das notas do jogo
        const mediaQuery = `
            SELECT AVG(nr_usuario_nota) AS media 
            FROM t_avaliacao 
            WHERE id_jogo = ?;
        `;
        const [mediaRows] = await connection.promise().query(mediaQuery, [jogoId]);
        const mediaNota = mediaRows[0].media;

        console.log(`Média calculada: ${mediaNota}`);

        // Atualiza a nota média do jogo
        const updateGameQuery = `
            UPDATE t_jogo 
            SET nr_nota = ? 
            WHERE id_jogo = ?;
        `;
        await connection.promise().query(updateGameQuery, [mediaNota, jogoId]);

        console.log(`Nota média do jogo ${jogoId} atualizada para ${mediaNota}`);

        // Envia a resposta para o cliente apenas uma vez, após todas as operações
        return res.status(200).json({
            message: "Avaliação salva e média do jogo atualizada com sucesso!",
            media: mediaNota,
        });
    } catch (error) {
        console.error("Erro ao salvar ou atualizar a avaliação:", error);
        return res
            .status(500)
            .json({
                error:
                    "Erro ao salvar ou atualizar a avaliação. Tente novamente mais tarde.",
            });
    }
});


function gerarToken(userId) {
    const token = jwt.sign({ id: userId }, secretKey, { expiresIn: '30d' });
    return token;
}

function verificarToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ sucesso: false, mensagem: "Token não fornecido!" });
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2) {
        return res.status(401).json({ sucesso: false, mensagem: "Token malformado!" });
    }

    const token = tokenParts[1];
    if (!token) {
        return res.status(401).json({ sucesso: false, mensagem: "Token ausente!" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ sucesso: false, mensagem: "Token inválido ou expirado!" });
        }
        req.userId = decoded.id; // ID do usuário está no token
        next();
    });
}

// Iniciando servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
