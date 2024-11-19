document.addEventListener("DOMContentLoaded", async function () {
    // Fazendo a requisição para o servidor para pegar os jogos
    fetch('/jogos')
      .then(response => response.json())
      .then(data => {
        if (data.sucesso) {
          const jogos = data.jogos;
          const jogosContainer = document.getElementById('jogosRecomendados');

          jogos.forEach(jogo => {
            // Criando a estrutura da div para cada jogo
            const jogoDiv = document.createElement('div');
            jogoDiv.classList.add('jogoDiv');
            jogoDiv.setAttribute('data-game-id', jogo.id_jogo);

            const link = document.createElement('a');
            link.href = `/info/${jogo.id_jogo}`;

            const img = document.createElement('img');
            img.src = jogo.ds_imagem; // A imagem agora vem da coluna ds_imagem
            img.alt = jogo.nm_jogo; // O nome do jogo será o texto alternativo da imagem

            const nomeJogo = document.createElement('p');
            nomeJogo.textContent = jogo.nm_jogo; // Exibe o nome do jogo abaixo da imagem

            const nota = document.createElement('span');
            nota.textContent = `Nota: ${jogo.nr_nota}`; // Exibe a nota do jogo

            link.appendChild(img);
            jogoDiv.appendChild(link);
            jogoDiv.appendChild(nomeJogo); // Adiciona o nome do jogo
            jogoDiv.appendChild(nota); // Adiciona a nota do jogo
            jogosContainer.appendChild(jogoDiv);
          });
        } else {
          console.log('Nenhum jogo encontrado.');
        }
      })
      .catch(error => {
        console.error('Erro ao carregar os jogos:', error);
      });
  });