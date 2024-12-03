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
  res.sendFile(path.join(__dirname, "public", "templates", pagina));
};

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
app.get("/adm_redirect", verificarToken, (req, res) => {
  const token = req.headers.authorization.split(" ")[1]; // Extrai o token do header
  res.redirect(`/adm.html?token=${token}`);
});

// Rota para retornar as informações
app.get("/jogo/:gameId", (req, res) => BuscarInfoJogos(req, res));
app.get("/lista/:idLista", verificarToken, (req, res) =>BuscarJogosLista(req, res));
app.get("/jogos", (req, res) => BuscarJogos(req, res));
app.get("/jogos/rank", (req, res) => BuscarJogosRankeados(req, res));
app.get("/adm/modos", (req, res) => BuscarModos(req, res));
app.get('/nomeListas', (req, res) => NomeListas(req, res));
app.get("/adm/plataformas", (req, res) => BuscarPlataformas(req, res));

//Rotas Registro, Login, Avaliação e AdicionarNaLista
app.post("/login", async (req, res) => Login(req, res));
app.post("/registro", async (req, res) => Registro(req, res));
app.post("/avaliacao", async (req, res) => Avaliacao(req, res));
app.post("/add/lista", async (req, res) => AdicionarNaLista(req, res));
app.post("/adm/cadastrosJogo", async (req, res) => CadastroJogo(req, res));
app.post("/adm/cadastroGenero", async (req, res) =>CadastrarGenero(req, res));
app.post("/adm/cadastroDistribuidora", async (req, res) => CadastrarDistribuidora(req, res));
app.post("/adm/cadastroDesenvolvedora", async (req, res) => CadastrarDesenvolvedora(req, res));

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
  });
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
      return res
        .status(404)
        .json({ message: "Nenhum jogo encontrado para esta lista." });
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
    `;

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
        const token = jwt.sign(
          { id: user.id_usuario, idPermissao: user.id_permissao },
          chaveSecreta,
          {
            expiresIn: "30d",
          }
        );
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
  });
}

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
    const [existeUser] = await connection
      .promise()
      .query(queryExisteUser, [email, apelido]);

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
    await connection
      .promise()
      .query(queryCadastrar, [email, apelido, senha, 1]);

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

    const [rows] = await connection
      .promise()
      .query(checkQuery, [idUsuario, jogoId]);
    const count = rows[0].count;

    console.log(`Avaliação existente: ${count > 0 ? "Sim" : "Não"}`);

    // Se já existir uma avaliação, faz um UPDATE
    if (count > 0) {
      const updateQuery = `
                UPDATE t_avaliacao 
                SET nr_usuario_nota = ?, dt_envio = ? 
                WHERE id_usuario = ? AND id_jogo = ?;
            `;
      await connection
        .promise()
        .query(updateQuery, [nota, data, idUsuario, jogoId]);
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
      await connection
        .promise()
        .query(queryInsert, [data, nota, jogoId, idUsuario]);
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
      error:
        "Erro ao salvar ou atualizar a avaliação. Tente novamente mais tarde.",
    });
  }
}

async function AdicionarNaLista(req, res) {
  let { idLista, idUsuario, idJogo } = req.body;

  console.log(`Recebido: idLista=${idLista}, idUsuario=${idUsuario}, idJogo=${idJogo}`);

  if (!idLista || !idUsuario || !idJogo) {
    return res
      .status(400)
      .json({ error: "Parâmetros faltando: idLista, idUsuario e idJogo." });
  }

  try {
    // Obtém o ID da lista "Todos"
    const queryBuscaListaTodos = `
      SELECT id_lista 
      FROM t_lista 
      WHERE nm_lista = 'Todos' 
      LIMIT 1;
    `;
    const [rowsTodos] = await connection.promise().query(queryBuscaListaTodos);
    if (rowsTodos.length === 0) {
      return res.status(404).json({
        error: "Lista padrão 'Todos' não encontrada.",
      });
    }
    const idListaTodos = rowsTodos[0].id_lista;

    console.log(`ID da lista 'Todos': ${idListaTodos}`);

    // Garante que o jogo está na lista "Todos"
    const queryAdicionaNaListaTodos = `
      INSERT INTO t_jogo_adicionado (
        id_jogo,
        id_lista
      ) VALUES (?, ?)
      ON DUPLICATE KEY UPDATE id_jogo=id_jogo;
    `;
    await connection.promise().query(queryAdicionaNaListaTodos, [idJogo, idListaTodos]);
    console.log(`Jogo ${idJogo} garantido na lista 'Todos'`);

    // Verifica se o jogo já está em outra lista além de "Todos"
    const queryBuscaListasDoJogo = `
      SELECT id_lista 
      FROM t_jogo_adicionado 
      WHERE id_jogo = ? 
      AND id_lista != ?;
    `;
    const [rowsOutrasListas] = await connection.promise().query(queryBuscaListasDoJogo, [idJogo, idListaTodos]);

    if (rowsOutrasListas.length > 0) {
      const idListaAtual = rowsOutrasListas[0].id_lista;

      // Remove o jogo da lista atual
      const queryRemoveJogoDeLista = `
        DELETE FROM t_jogo_adicionado 
        WHERE id_jogo = ? 
        AND id_lista = ?;
      `;
      await connection.promise().query(queryRemoveJogoDeLista, [idJogo, idListaAtual]);
      console.log(`Jogo ${idJogo} removido da lista ${idListaAtual}`);
    }

    // Adiciona o jogo à nova lista (além de "Todos")
    const queryAdicionaNaNovaLista = `
      INSERT INTO t_jogo_adicionado (
        id_jogo,
        id_lista
      ) VALUES (?, ?)
      ON DUPLICATE KEY UPDATE id_jogo=id_jogo;
    `;
    await connection.promise().query(queryAdicionaNaNovaLista, [idJogo, idLista]);
    console.log(`Jogo ${idJogo} adicionado à lista ${idLista}`);

    return res.status(200).json({
      message: "Jogo adicionado à lista com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao adicionar jogo à lista:", error);
    return res.status(500).json({
      error: "Erro ao adicionar jogo à lista. Tente novamente mais tarde.",
    });
  }
}

async function NomeListas(req, res) {
  const query = 'SELECT id_lista, nm_lista FROM t_lista';
  connection.promise().query(query)
      .then(([rows]) => res.status(200).json(rows))
      .catch(error => {
          console.error('Erro ao buscar nomes das listas:', error);
          res.status(500).json({ error: 'Erro ao buscar nomes das listas.' });
      });
}

async function CadastroJogo(req, res) {
  try {
    let {
      nmJogo,
      dsSinopse,
       dsImagem, 
       stStatus,
       nmPlataforma ,
       nmDesenvolvedora,
       nmDistribuidora,
       nmModo,
       nmGenero
    } = req.body;

    await VerificarJogo(nmJogo);

    // Busca os IDs com base no nome fornecido no frontend
    const idDesenvolvedora = await BuscarIdPorNome(
      nmDesenvolvedora,
      "t_desenvolvedora",
      "id_desenvolvedora",
      "nm_desenvolvedora"
    );
    const idDistribuidora = await BuscarIdPorNome(
      nmDistribuidora,
      "t_distribuidora",
      "id_distribuidora",
      "nm_distribuidora"
    );
    const idPlataforma = await BuscarIdPorNome(
      nmPlataforma,
      "t_plataforma",
      "id_plataforma",
      "nm_plataforma"
    );
    const idModo = await BuscarIdPorNome(
      nmModo,
      "t_modo",
      "id_modo",
      "nm_modo"
    );

    const idsGeneros = [];
    for (const genero of nmGenero) {
      const idGenero = await BuscarIdPorNome(
        genero,
        "t_genero",
        "id_genero",
        "nm_genero"
      );
      if (idGenero) idsGeneros.push(idGenero);
    }
    if (idsGeneros.length === 0) {
      return res.status(400).json({
        message: "Pelo menos um gênero é obrigatório.",
      });
    }

    const idJogo = await CadastrarJogo({
      nmJogo,
      dsSinopse,
      stStatus,
      dsImagem,
      idDistribuidora,
      idDesenvolvedora,
      idPlataforma,
    });

    // Associa os gêneros ao jogo
    for (const idGenero of idsGeneros) {
      await CadastrarGeneroJogo(idJogo, idGenero);
    }

    // Associa o modo ao jogo
    const modoCadastrado = idModo
      ? await CadastrarModoJogo(idJogo, idModo)
      : false;

    if (!modoCadastrado) {
      await ExcluirJogo(idJogo);
      return res.status(400).json({
        message: "Jogo não pode ser cadastrado sem um modo válido.",
      });
    }

    res.status(201).json({ message: "Cadastro realizado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao realizar o cadastro." });
  }

  async function ExcluirJogo(idJogo) {
    try {
      const queryExcluirJogo = `
        DELETE FROM t_jogo
        WHERE id_jogo = ?;
      `;
      await connection.promise().execute(queryExcluirJogo, [idJogo]);
      console.log(
        `Jogo com ID ${idJogo} excluído por falta de gênero ou modo.`
      );
    } catch (error) {
      console.error("Erro ao excluir jogo:", error);
    }
  }

  async function VerificarJogo(nmJogo) {
    try {
      if (!nmJogo) {
        return res.status(400).json({ message: "Nome do jogo é obrigatório." });
      }

      // Query para verificar se o jogo existe
      const queryJogoExistente = `
        SELECT * 
        FROM t_jogo
        WHERE nm_jogo = ?;
      `;

      const [result] = await connection
        .promise()
        .query(queryJogoExistente, [nmJogo]);

      if (result.length > 0) {
        // Retorna uma mensagem se o jogo já existir
        return res
          .status(200)
          .json({ message: "Jogo já cadastrado.", nmJogo: result[0] });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao verificar jogo." });
    }
  }

  async function CadastrarJogo({nmJogo, dsSinopse,stStatus,dsImagem,idDistribuidora,idDesenvolvedora,idPlataforma,}) {
    const queryJogo = `
        INSERT INTO t_jogo (
          nm_jogo,
          ds_sinopse,
          nr_nota,
          st_game,
          ds_imagem,
          id_distribuidora,
          id_desenvolvedora,
          id_plataforma
        ) VALUES (?, ?, 0.0, ?, ?, ?, ?, ?);
      `;

    const params = [
      nmJogo,
      dsSinopse,
      stStatus,
      dsImagem,
      idDistribuidora,
      idDesenvolvedora,
      idPlataforma,
    ];

    // Executa a query
    const [result] = await connection.promise().execute(queryJogo, params);
    return result.insertId; // Retorna o ID do jogo inserido
  }

  async function CadastrarGeneroJogo(idJogo, idGenero) {
    try {
      const queryGeneroJogo = `
        INSERT INTO t_genero_do_jogo (id_jogo, id_genero)
        VALUES (?, ?);
      `;
      await connection.promise().execute(queryGeneroJogo, [idJogo, idGenero]);
      return true; // Retorna sucesso
    } catch (error) {
      console.error("Erro ao associar gênero:", error);
      return false; // Retorna falha
    }
  }

  async function CadastrarModoJogo(idJogo, idModo) {
    try {
      const queryModoJogo = `
        INSERT INTO t_modo_de_jogo (id_jogo, id_modo)
        VALUES (?, ?);
      `;
      await connection.promise().execute(queryModoJogo, [idJogo, idModo]);
      return true; // Retorna sucesso
    } catch (error) {
      console.error("Erro ao associar modo:", error);
      return false; // Retorna falha
    }
  }

  async function BuscarIdPorNome(nome, tabela, campoId, campoNome) {
    const query = `
        SELECT ${campoId}
        FROM ${tabela}
        WHERE ${campoNome} = ?;
      `;
    const [rows] = await connection.promise().execute(query, [nome]);
    console.log(nome);
    return rows[0]?.[campoId] || null;
  }
}

function BuscarModos(req, res) {
  const queryModo = `SELECT nm_modo FROM t_modo;`;

  connection.query(queryModo, (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res
        .status(500)
        .json({ message: "Erro ao buscar modos de jogo", error: err });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum modo de jogo encontrado" });
    }

    // Retorna os modos de jogo em um formato adequado para o frontend
    return res.json({ modos: results.map((item) => item.nm_modo) });
  });
}

function BuscarPlataformas(req, res) {
  const queryPlataforma = `SELECT nm_plataforma FROM t_plataforma;`;

  connection.query(queryPlataforma, (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res
        .status(500)
        .json({ message: "Erro ao buscar plataformas", error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Nenhuma plataforma encontrada" });
    }

    // Retorna as plataformas em um formato adequado para o frontend
    return res.json({ plataformas: results.map((item) => item.nm_plataforma) });
  });
}

async function CadastrarGenero(req, res) {
  try {
    const { nmGenero } = req.body;

    if (!nmGenero) {
      return res
        .status(400)
        .json({ message: "Nome da desenvolvedora é obrigatório." });
    }

    const queryGenero = `INSERT INTO t_genero (nm_genero) VALUES (?);`;
    await connection.execute(queryGenero, [nmGenero]);

    return res
      .status(201)
      .json({ message: "Genero cadastradado com sucesso!" });
  } catch (error) {
    console.error(error);
    // Resposta de erro interno
    return res.status(500).json({ message: "Erro ao cadastrar genero." });
  }
}

async function CadastrarDistribuidora(req, res) {
  try {
    const { nmDistribuidora } = req.body;

    if (!nmDistribuidora) {
      return res
        .status(400)
        .json({ message: "Nome da distribuidora é obrigatório." });
    }

    const queryDistribuidora = `INSERT INTO t_distribuidora (nm_distribuidora) VALUES (?);`;
    await connection.promise().execute(queryDistribuidora, [nmDistribuidora]);

    return res
      .status(201)
      .json({ message: "Distribuidora cadastrada com sucesso!" });
  } catch (error) {
    console.error(error);
    // Resposta de erro interno
    return res
      .status(500)
      .json({ message: "Erro ao cadastrar distribuidora." });
  }
}

async function CadastrarDesenvolvedora(req, res) {
  try {
    // Obter o nome da desenvolvedora do corpo da requisição
    const { nmDesenvolvedora } = req.body;

    // Validação: verificar se o nome da desenvolvedora foi enviado
    if (!nmDesenvolvedora) {
      return res
        .status(400)
        .json({ message: "Nome da desenvolvedora é obrigatório." });
    }

    // Query para inserir no banco de dados
    const queryDesenvolvedora = `INSERT INTO t_desenvolvedora (nm_desenvolvedora) VALUES (?);`;
    await connection.promise().execute(queryDesenvolvedora, [nmDesenvolvedora]);

    // Resposta de sucesso
    return res
      .status(201)
      .json({ message: "Desenvolvedora cadastrada com sucesso!" });
  } catch (error) {
    console.error(error);
    // Resposta de erro interno
    return res
      .status(500)
      .json({ message: "Erro ao cadastrar desenvolvedora." });
  }
}

// Função para Verificar o Token do Usuario
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