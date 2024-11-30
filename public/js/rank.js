document.addEventListener("DOMContentLoaded", async function () {
  let jogos = []; // Armazena todos os jogos carregados
  let paginaAtual = 1; // Página inicial é 1

  try {
    // Fazendo a requisição para o servidor para pegar os jogos gerais
    const response = await fetch('/jogos/rank');
    const data = await response.json();

    if (data.sucesso) {
      jogos = data.jogos;
      carregarJogos(jogos, paginaAtual); // Carregar os jogos da página 1
    } else {
      console.log('Nenhum jogo encontrado.');
    }
  } catch (error) {
    console.error('Erro ao carregar os jogos:', error);
  }

  function carregarJogos(listaDeJogos, pagina) {
    const jogosContainer = document.getElementById('rank');
    jogosContainer.innerHTML = ''; // Limpa os jogos carregados anteriormente

    const inicio = (pagina - 1) * 10; // Ajuste para iniciar da página 1
    const fim = inicio + 10;
    const jogosPagina = listaDeJogos.slice(inicio, fim);

    // Renderiza os jogos da página
    jogosPagina.forEach((jogo, index) => {
      const jogoDiv = document.createElement('li');
      jogoDiv.classList.add('ranking'); // Aplica a classe 'ranking'

      const rank = document.createElement('span');
      rank.classList.add('posicao');
      // Ajusta o número do rank com base na página atual e na posição dentro da página
      rank.textContent = `#${inicio + index + 1}`;

      const link = document.createElement('a');
      link.classList.add('jogo');
      link.href = `/info/${jogo.id_jogo}`;

      const info = document.createElement('div');
      info.classList.add('info');

      const img = document.createElement('img');
      img.src = jogo.ds_imagem;
      img.alt = jogo.nm_jogo;

      const nomeJogo = document.createElement('p');
      nomeJogo.textContent = jogo.nm_jogo;

      const nota = document.createElement('span');
      nota.classList.add('score');
      nota.innerHTML = `Nota: <span>${jogo.nr_nota}</span>`;

      link.appendChild(img);
      link.appendChild(info);
      info.appendChild(nomeJogo);
      info.appendChild(nota);

      jogoDiv.appendChild(rank);
      jogoDiv.appendChild(link);
      jogosContainer.appendChild(jogoDiv);
    });

    // Exibe botão de próxima página, se houver mais jogos
    if (fim < listaDeJogos.length) {
      mostrarBotaoProximo();
    } else {
      removerBotaoProximo();
    }

    if (pagina > 1) {
      mostrarBotaoAnterior();
    } else {
      removerBotaoAnterior();
    }
  }

  function mostrarBotaoProximo() {
    let botaoProximo = document.getElementById('botao-proximo');
    if (!botaoProximo) {
      botaoProximo = document.createElement('button');
      botaoProximo.id = 'botao-proximo';
      botaoProximo.textContent = 'Próxima Página';
      botaoProximo.addEventListener('click', () => {
        paginaAtual++;
        carregarJogos(jogos, paginaAtual); // Carrega a próxima página
      });
      document.getElementById('main').appendChild(botaoProximo);
    }
  }

  function mostrarBotaoAnterior() {
    let botaoAnterior = document.getElementById('botao-anterior');
    if (!botaoAnterior) {
      botaoAnterior = document.createElement('button');
      botaoAnterior.id = 'botao-anterior';
      botaoAnterior.textContent = 'Voltar Página';
      botaoAnterior.addEventListener('click', () => {
        paginaAtual--;
        carregarJogos(jogos, paginaAtual); // Carrega a próxima página
      });
      document.getElementById('main').appendChild(botaoAnterior);
    }
  }

  function removerBotaoProximo() {
    const botaoProximo = document.getElementById('botao-proximo');
    if (botaoProximo) {
      botaoProximo.remove();
    }
  }

  function removerBotaoAnterior() {
    const botaoAnterior = document.getElementById('botao-anterior');
    if (botaoAnterior) {
      botaoAnterior.remove();
    }
  }
});
