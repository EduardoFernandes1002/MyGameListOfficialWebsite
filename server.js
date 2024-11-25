const express = require("express");
const app = express();
const path = require("path");
const connection = require("./database");
const jwt = require("jsonwebtoken");

const secretKey = "N&3!5P@d92q4z7Yb#fR8^uL1%$xVsG0w";

app.use(express.static(path.join(__dirname, "public")));
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
    "SELECT id_jogo, nm_jogo, ds_imagem, nr_nota, ds_sinopse FROM T_Jogo WHERE id_jogo = ?",
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

app.get('/perfil', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "templates", "perfil.html"))
});

app.get("/perfil", verificarToken, (req, res) => {
  const idUsuario = req.userId;

  res.redirect(`/perfil.html?id_usuario=${idUsuario}`)
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
  
    // Executar a consulta sem limite
    connection.query(queryJogosGerais, (error, resultadosGerais) => {
      if (error) {
        return res
          .status(500)
          .json({ sucesso: false, mensagem: "Erro ao buscar jogos gerais!" });
      }
  
      // Retornar todos os jogos gerais
      res.json({
        sucesso: true,
        jogosGerais: resultadosGerais,
      });
    });
  });

// Rota para buscar jogos gerais e jogos de ação e outros seguindo logica QueryJogosAcao
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
    "SELECT id_jogo, nm_jogo, ds_imagem, nr_nota FROM T_Jogo ORDER BY nr_nota DESC;",
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

app.get("/perfil/:id_usuario/:id_lista", verificarToken, async (req, res) => {
  const { id_usuario, id_lista } = req.params;

  try {
    // Query para buscar o apelido do usuário e os jogos com base no id_lista e id_usuario
    const query = `
        SELECT 
          u.nm_apelido, -- Apelido do usuário
          j.id_jogo,
          j.ds_imagem,
          j.nm_jogo
        FROM t_jogo j
        INNER JOIN t_jogo_adicionado ja 
          ON j.id_jogo = ja.id_jogo
        INNER JOIN t_lista l 
          ON ja.id_lista = l.id_lista
        INNER JOIN t_usuario u
          ON l.id_usuario = u.id_usuario
        WHERE l.id_lista = ? AND l.id_usuario = ?
      `;

    const [result] = await connection.promise().query(query, [id_lista, id_usuario]);

    if (result.length === 0) {
      return res.status(404).json({ mensagem: "Usuário ou lista não encontrados" });
    }

    // Obter o apelido do usuário
    const nm_apelido = result[0].nm_apelido;

    // Obter a lista de jogos
    const jogos = result.map(row => ({
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


// Validação do login do usuario
app.post("/login", async (req, res) => {
  const { login, senha } = req.body;

  // Consulta no banco para pegar o usuário com o login digitado (email/nickname)
  connection.query(
    "SELECT * FROM T_USUARIO WHERE ds_email = ? OR nm_apelido = ?",
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
      .query("SELECT * FROM T_USUARIO WHERE ds_email = ? OR nm_apelido = ?", [
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
        "INSERT INTO T_USUARIO (ds_email, nm_apelido, ds_senha, id_permissao) VALUES (?, ?, ?, ?)",
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
  const { nota, data, jogoId } = req.body;
  console.log(`Recebido: nota=${nota}, data=${data}, jogoId=${jogoId}`);

  if (!nota || !data || !jogoId) {
    return res
      .status(400)
      .json({ error: "Parâmetros faltando: nota, data ou jogoId." });
  }

  try {
    // Verifica se já existe uma avaliação para o usuário e o jogo
    const checkQuery = `
            SELECT COUNT(*) AS count 
            FROM t_avaliacao 
            WHERE T_USUARIO_id_usuario = 2 AND T_JOGO_id_jogo = ?;
        `;

    const [rows] = await connection.promise().query(checkQuery, [jogoId]);
    const count = rows[0].count;

    console.log(`Avaliação existente: ${count > 0 ? "Sim" : "Não"}`);

    // Se já existir uma avaliação, faz um UPDATE
    if (count > 0) {
      const updateQuery = `
                UPDATE t_avaliacao 
                SET nr_usuario_nota = ?, dt_envio = ? 
                WHERE T_USUARIO_id_usuario = 2 AND T_JOGO_id_jogo = ?;
            `;
      await connection.promise().query(updateQuery, [nota, data, jogoId]);
      console.log("Avaliação atualizada com sucesso!");
    } else {
      // Caso contrário, faz um INSERT
      const insertQuery = `
                INSERT INTO t_avaliacao (dt_envio, nr_usuario_nota, T_JOGO_id_jogo, T_USUARIO_id_usuario)
                VALUES (?, ?, ?, 2);
            `;
      await connection.promise().query(insertQuery, [data, nota, jogoId]);
      console.log("Avaliação salva com sucesso!");
    }

    // Agora, calcula a média das notas do jogo
    const mediaQuery = `
            SELECT AVG(nr_usuario_nota) AS media 
            FROM t_avaliacao 
            WHERE T_JOGO_id_jogo = ?;
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
  const token = jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' }); 
  return token; 
}

function verificarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    next(); // Chama o próximo middleware
    return;
  }

  jwt.verify(token, secretKey, (err, decoded) => {
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
