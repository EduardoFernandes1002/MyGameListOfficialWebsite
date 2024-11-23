document.addEventListener("DOMContentLoaded", async function () {
    // Fazendo a requisição para o servidor para pegar os jogos
    fetch('/jogos')
      .then(response => response.json())
      .then(data => {
        if (data.sucesso) {
          const jogos = data.jogos;
          const jogosContainer = document.getElementById('rank');
  
          jogos.forEach(jogo => {
            // Criando a estrutura da div para cada jogo
            const jogoDiv = document.createElement('div');
            jogoDiv.classList.add('jogoDiv');
  
            const link = document.createElement('a');
            link.classList.add('ranking');
            link.href = `/info/${jogo.id_jogo}`;

            const div = document.createElement('div');
            div.classList.add('div');
  
            const img = document.createElement('img');
            img.src = jogo.ds_imagem;
            img.alt = jogo.nm_jogo;
  
            const nomeJogo = document.createElement('p');
            nomeJogo.textContent = jogo.nm_jogo;
  
            const nota = document.createElement('span');
            nota.textContent = `Nota: ${jogo.nr_nota}`;
  
            // Adicionando elementos dentro do link
            link.appendChild(img);
            link.appendChild(div);
            div.appendChild(nomeJogo);
            div.appendChild(nota);
  
            // Adicionando o link à div principal
            jogoDiv.appendChild(link);
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
  

