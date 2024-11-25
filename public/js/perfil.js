document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (!token) {
    alert("Token não encontrado na URL.");
    return;
  }

  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const idUsuario = decodedToken.id;
  let idLista = '1'; // Lista padrão ao carregar pagina

  const botoes = document.querySelectorAll('.btnListas button');
  botoes.forEach(botao => {
    botao.addEventListener('click', function (event) {
      event.preventDefault();
      idLista = this.id.replace('btn', ''); // Atualiza o id_lista com base no botão clicado
      fetchPerfil();
    });
  });

  document.getElementById('btnReview').addEventListener('click', function (event) {
    event.preventDefault();
    showReviews();
  });

  async function fetchPerfil() {
    try {
      const response = await fetch(`/perfil/${idLista}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = response.ok ? await response.json() : { jogos: [] };

      document.getElementById("NomeUsuario").innerText = `Olá, ${data.apelido || 'Usuário'}`;
      const listaElement = document.querySelector(".Lista");

      if (data.jogos.length === 0) {
        listaElement.innerHTML = "<p>A lista está vazia.</p>";
      } else {
        listaElement.innerHTML = data.jogos.map(jogo => `
          <li class="jogoL">
            <a href="/info/${jogo.id_jogo}">
              <img src="${jogo.ds_imagem}" alt="${jogo.nm_jogo}">
              <div class="jogoDiv">
                <span>${jogo.nm_jogo}</span>
              </div>
            </a>
          </li>
        `).join('');
      }
      
    } catch (error) {
      document.querySelector(".Lista").innerHTML = "<p>A lista está vazia.</p>";
    }
  }

  function showReviews() {
    const listaElement = document.querySelector(".Lista");
    listaElement.innerHTML = "<p>Não há reviews ainda.</p>";
  }

  fetchPerfil(); // Carrega a lista "Desejo" ao carregar a página
});
