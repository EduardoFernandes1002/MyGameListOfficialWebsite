document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const idUsuario = urlParams.get('id_usuario');
  let idLista = '1'; // Default id_lista é "Desejo" com ID 1

  if (!idUsuario) {
    alert("ID do usuário não encontrado na URL.");
    return;
  }

  const botoes = document.querySelectorAll('.btnListas button');
  botoes.forEach(botao => {
    botao.addEventListener('click', function (event) {
      event.preventDefault();
      idLista = this.id.replace('btn', ''); // Atualiza o id_lista com base no botão clicado
      fetchPerfil(); // Recarrega os dados do perfil com a nova lista
    });
  });

  document.getElementById('btnReview').addEventListener('click', function (event) {
    event.preventDefault();
    showReviews(); // Exibe a mensagem de que não há reviews
  });

  async function fetchPerfil() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/perfil/${idUsuario}/${idLista}`, {
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
            <div class= "jogoDiv">
            <span>${jogo.nm_jogo}</span>
            </div>
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
