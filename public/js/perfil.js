document.addEventListener("DOMContentLoaded", function () {
  // Recupera o token da URL, se disponível
  let token = new URLSearchParams(window.location.search).get("token");

  if (!token) {
    // Caso não encontre na URL, tenta pegar no localStorage
    token = localStorage.getItem("token");
  }

  if (!token) {
    alert("Token não encontrado.");
    return;
  }

  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const idUsuario = decodedToken.id; // ID do usuário extraído do token
  let idLista = "1"; // ID padrão ao carregar a página

  const botoes = document.querySelectorAll(".btnListas button");
  const listaElement = document.querySelector(".Lista");

  // Função para carregar a lista
  async function carregarLista(idLista) {
    try {
      const response = await fetch(`/lista/${idLista}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Passando o token no cabeçalho
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao carregar a lista.");
      }

      const jogos = await response.json();

      if (jogos.length === 0) {
        listaElement.innerHTML = "<p>A lista está vazia.</p>";
      } else {
        listaElement.innerHTML = jogos
          .map(
            (jogo) => `
            <li class="jogoL">
              <a href="/info/${jogo.id_jogo}">
                <img src="${jogo.ds_imagem}" alt="${jogo.nm_jogo}">
                <div class="jogoDiv">
                  <span>${jogo.nm_jogo}</span>
                </div>
              </a>
            </li>
          `
          )
          .join("");
      }
    } catch (error) {
      console.error(error);
      listaElement.innerHTML = "<p>Lista vazia.</p>";
    }
  }

  // Adiciona eventos de clique para alternar entre as listas
  botoes.forEach((botao) => {
    botao.addEventListener("click", function (event) {
      event.preventDefault();
      idLista = botao.value; // Usa o value do botão diretamente
      carregarLista(idLista);
    });
  });

  // Carrega a lista padrão ao carregar a página
  carregarLista(idLista);

    async function NomeUser(idUsuario) {
      try {
        const response = await fetch(`/info/perfil`, {
          method: "POST", // Alterado para POST para enviar o ID no corpo
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idUsuario }), // Envia o ID do usuário no corpo
        });
    
        if (!response.ok) {
          throw new Error("Erro ao buscar informações do usuário.");
        }
    
        const { dados } = await response.json();
    
        // Atualiza o span com o nome do usuário
        const userSpan = document.getElementById("user");
        userSpan.textContent = dados.nome;
      } catch (error) {
        console.error(error);
      }
    }
    
    NomeUser(idUsuario)
});
