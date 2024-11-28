const express = require("express");
const app = express();
const path = require("path");
const connection = require("./database");
const jwt = require("jsonwebtoken");
const chaveSecreta = "N&3!5P@d92q4z7Yb#fR8^uL1%$xVsG0w";

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "templates")));
app.use(express.json());

// Caminho das paginas
const serverPagina = (res, pagina) => {
    res.sendFile(path.join(__dirname, 'public', 'templates', pagina))
}

// Paginas
app.get("/", verificarToken, (req, res) => serverPagina(res, "index.html"));
app.get("/login", (req, res) => serverPagina(res, "login.html"));
app.get("/registro", (req, res) => serverPagina(res, "registro.html"));
app.get("/rank", (req, res) => serverPagina(res, "rank.html"));
app.get("/info/:gameId", (req, res) => serverPagina(res, "infoJogos.html"));
app.get("/perfil_redirect", verificarToken, (req, res) => {
    const token = req.headers.authorization.split(" ")[1]; // Extrai o token do header
    res.redirect(`/perfil.html?token=${token}`);
});

// Rota para retornar as informações
app.get("/jogo/:gameId", (req, res) => BuscarInfoJogos(req, res));
app.get("/lista/:idLista", verificarToken, (req, res) => BuscarJogosLista(req, res));
app.get("/jogos", (req, res) => BuscarJogos(req, res));
app.get("/jogos/rank", (req, res) => BuscarJogosRankeados(req, res));

//Rotas Registro, Login, Avaliação e AdicionarNaLista
app.post("/login", async (req, res) => Login(req, res));
app.post("/registro", async (req,res) => Registro(req, res));
app.post("/avalicao", async (req, res) => Avaliacao(req, res));

function BuscarInfoJogos(req, res) {
    const gameId = req.params.gameId;

    const queryLista = `
        SELECT
            id_jogo,
            nm_jogo,
            ds_imagem,
            nr_nota,
            ds_sinopse
        FROM t_jogo WHERE id_jogo = ?;
        `;

    connection.query(queryLista, [gameId], (error, results) => {
        if (error) {
            return res
                .status(500)
                .json({ sucesso: false, mensagem: "Erro no servidor!" });
        }
        if (results.length > 0) {
            return res.json({
                sucesso: true,
                jogo: results[0],
            });
        } else {
            return res
                .status(404)
                .json({ sucesso: false, mensagem: "Jogo não encontrado!" });
        }
    }
    );
}

function BuscarJogosLista(req, res) {
    const idUsuario = req.userId; // Pega o ID do usuário do token
    const idLista = req.params.idLista; // Obtém o ID da lista da URL

    const queryJogos = `
      SELECT 
          j.id_jogo,
          j.nm_jogo, 
          j.ds_imagem,
          j.nr_nota
      FROM t_jogo AS j
      INNER JOIN t_jogo_adicionado AS ja
          ON j.id_jogo = ja.id_jogo
      INNER JOIN t_lista AS l
          ON ja.id_lista = l.id_lista
      INNER JOIN t_lista_usuario AS lu
          ON l.id_lista = lu.id_lista
      WHERE 
          l.id_lista = ? AND lu.id_usuario = ?;
  `;

    connection.query(queryJogos, [idLista, idUsuario], (err, resultados) => {
        if (err) {
            console.error("Erro ao buscar jogos:", err);
            return res.status(500).json({ message: "Erro interno ao buscar jogos." });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ message: "Nenhum jogo encontrado para esta lista." });
        }
        res.json(resultados);
    });
}

function BuscarJogos(req, res) {

    const queryJogosGerais = `
    SELECT 
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
}

function BuscarJogosRankeados(req, res) {
    
    const queryJogos = `
        SELECT 
            id_jogo, 
            nm_jogo, 
            ds_imagem, 
            nr_nota 
        FROM t_jogo 
        ORDER BY nr_nota DESC;
    `;

    connection.query(queryJogos, (error, results) => {
        if (error) {
            return res
                .status(500)
                .json({ sucesso: false, mensagem: "Erro no servidor!" });
        }
        if (results.length > 0) {
            res.json({ sucesso: true, jogos: results });
        } else {
            res
                .status(404)
                .json({ sucesso: false, mensagem: "Nenhum jogo encontrado!" });
        }
    });
}

async function Login(req, res) {
    const { login, senha } = req.body;

    const queryUser = `
    SELECT * FROM t_usuario 
    WHERE ds_email = ? OR nm_apelido = ?;
    `

    // Consulta no banco para pegar o usuário com o login digitado (email/nickname)
    connection.query(queryUser, [login, login], (error, results) => {
            if (error) {
                return res
                    .status(500)
                    .json({ sucesso: false, mensagem: "Erro no servidor!" });
            }

            if (results.length > 0) {
                const user = results[0];

                // Comparar a senha informada com a senha armazenada do banco
                if (senha === user.ds_senha) {
                    const token = jwt.sign({ id: user.id_usuario }, chaveSecreta, {
                        expiresIn: "30d",
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
}

// Rota para registro de usuário
async function Registro(req, res) {
    const { email, apelido, senha } = req.body;

    const queryExisteUser = `
    SELECT * FROM t_usuario 
    WHERE ds_email = ? OR nm_apelido = ?;
    `;

    const queryCadastrar = `
    INSERT INTO t_usuario (
        ds_email,
        nm_apelido,
        ds_senha,
        id_permissao
    ) VALUES (?, ?, ?, 1);
    `;

    try {
        // Verificar se já existe um usuário com o mesmo email ou apelido
        const [existeUser] = await connection.promise().query(queryExisteUser, [email, apelido]);

        if (existeUser.length > 0) {
            const conflitoMensagem =
                existeUser[0].ds_email === email
                    ? "Email já está em uso."
                    : "Apelido já está em uso.";
            return res
                .status(400)
                .json({ sucesso: false, mensagem: conflitoMensagem });
        }

        // Inserir novo usuário com a senha diretamente e nivel_permissao padrão de 1
        await connection.promise().query(queryCadastrar, [email, apelido, senha, 1]);

        res.json({ sucesso: true, mensagem: "Registro realizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        res
            .status(500)
            .json({ sucesso: false, mensagem: "Erro no servidor!" + error });
    }
}

async function Avaliacao(req, res) {
    const { nota, data, idUsuario, jogoId } = req.body;
    console.log(
        `Recebido: nota=${nota}, id=${idUsuario} data=${data}, jogoId=${jogoId}`
    );

    if (!nota || !data || !jogoId || !idUsuario) {
        return res
            .status(400)
            .json({ error: "Parâmetros faltando: nota, data, jogoId e idUsuario." });
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
            const queryInsert = `
                INSERT INTO t_avaliacao (
                    dt_envio,
                    nr_usuario_nota,
                    id_jogo,
                    id_usuario
                ) VALUES (?, ?, ?, ?);
            `;
            await connection.promise().query(queryInsert, [data, nota, jogoId, idUsuario]);
            console.log("Avaliação salva com sucesso!");
        }

        // Agora, calcula a média das notas do jogo
        const queryMedia = `
            SELECT AVG(nr_usuario_nota) AS media 
            FROM t_avaliacao 
            WHERE id_jogo = ?;
        `;

        const [mediaRows] = await connection.promise().query(queryMedia, [jogoId]);
        const mediaNota = mediaRows[0].media;

        console.log(`Média calculada: ${mediaNota}`);

        // Atualiza a nota média do jogo
        const queryUpdateJogo = `
            UPDATE t_jogo 
            SET nr_nota = ? 
            WHERE id_jogo = ?;
        `;

        await connection.promise().query(queryUpdateJogo, [mediaNota, jogoId]);

        console.log(`Nota média do jogo ${jogoId} atualizada para ${mediaNota}`);

        // Envia a resposta para o cliente apenas uma vez, após todas as operações
        return res.status(200).json({
            message: "Avaliação salva e média do jogo atualizada com sucesso!",
            media: mediaNota,
        });
    } catch (error) {
        console.error("Erro ao salvar ou atualizar a avaliação:", error);
        return res.status(500).json({
            error:"Erro ao salvar ou atualizar a avaliação. Tente novamente mais tarde.",
        });
    }
}

function verificarToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res
            .status(401)
            .json({ sucesso: false, mensagem: "Token não fornecido!" });
    }

    const partesToken = authHeader.split(" ");
    if (partesToken.length !== 2) {
        return res
            .status(401)
            .json({ sucesso: false, mensagem: "Token malformado!" });
    }

    const token = partesToken[1];
    if (!token) {
        return res.status(401).json({ sucesso: false, mensagem: "Token ausente!" });
    }

    jwt.verify(token, chaveSecreta, (err, decoded) => {
        if (err) {
            return res
                .status(403)
                .json({ sucesso: false, mensagem: "Token inválido ou expirado!" });
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