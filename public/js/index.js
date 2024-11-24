document.addEventListener("DOMContentLoaded", async function () {
  // Fazendo a requisição para o servidor para pegar os jogos
  fetch('/jogos')
    .then(response => response.json())
    .then(data => {
      if (data.sucesso) {
        // Variaveis que coletam os dados de cada comando sql separadamente
        const jogosGerais = data.jogosGerais;
        const jogosAcao = data.jogosAcao;

        const jogosContainer = document.getElementById('jogosRecomendados');
        const acaoContainer = document.getElementById('recomendadoAcao');

        // Espera por JogoGerais ou jogosAcao, alem de esperar os containers acima
        const adicionarJogos = (jogos, container) => {
          jogos.forEach(jogo => {
            const jogoDiv = document.createElement('div');
            jogoDiv.classList.add('jogoDiv');

            // Cria um link dinamico para cada jogo utilizando o id_jogo
            const link = document.createElement('a');
            link.href = `/info/${jogo.id_jogo}`;

            // imagem e nome do jogo 
            const img = document.createElement('img');
            img.src = jogo.ds_imagem;
            img.alt = jogo.nm_jogo;

            const divs = document.createElement('div');
            divs.classList.add('nomeNota');

            const nomeJogo = document.createElement('p');
            nomeJogo.textContent = jogo.nm_jogo;

            const nota = document.createElement('span');
            nota.textContent = `Nota: ${jogo.nr_nota}`;

            // Adicionando elementos dentro do link
            link.appendChild(img);
            link.appendChild(divs);
            divs.appendChild(nomeJogo);
            divs.appendChild(nota);

            // Adicionando o link à div principal
            jogoDiv.appendChild(link);
            container.appendChild(jogoDiv);
          });
        };

        // Adicionar os jogos gerais à div "jogosRecomendados"
        adicionarJogos(jogosGerais, jogosContainer);

        // Adicionar os jogos de ação à div "recomendadoAcao"
        adicionarJogos(jogosAcao, acaoContainer);
      } else {
        console.log('Nenhum jogo encontrado.');
      }
    })
    .catch(error => {
      console.error('Erro ao carregar os jogos:', error);
    });
});