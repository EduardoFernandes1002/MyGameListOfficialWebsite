async function exibirJogosPorLista(idLista) {
  const id_usuario = 1;

  // Chama o backend para buscar os jogos dessa lista (usando id_lista)
  const responseJogos = await fetch(`/jogo/${id_usuario}/${idLista}`);
  
  if (!responseJogos.ok) {
    alert("Erro ao buscar jogos.");
    return;
  }
  const jogos = await responseJogos.json();

  // Acesse o primeiro elemento com a classe "Lista"
  const listaElement = document.getElementsByClassName("Lista")[0];
  
  // Limpa o conteúdo anterior
  listaElement.innerHTML = "";

  jogos.forEach(jogo => {
    // Cria um item de lista (li)
    const jogoLi = document.createElement('li');
    jogoLi.classList.add('jogo');
    
    // Cria a imagem do jogo
    const jogoImagem = document.createElement('img');
    jogoImagem.src = jogo.ds_imagem;
    jogoImagem.alt = jogo.nm_jogo;
    
    // Cria o nome do jogo
    const jogoNome = document.createElement('h3');
    jogoNome.textContent = jogo.nm_jogo;
    
    // Adiciona a imagem e o nome ao item de lista
    jogoLi.appendChild(jogoImagem);
    jogoLi.appendChild(jogoNome);
    
    // Adiciona o item de lista à lista de jogos na página
    listaElement.appendChild(jogoLi);
  });
}


// Adicionando eventos aos botões para carregar jogos de diferentes listas
document.getElementById("btnTudo").addEventListener("click", function (event) {
  event.preventDefault();
});

document.getElementById("btnDesejo").addEventListener("click", function (event) {
  event.preventDefault();
  exibirJogosPorLista(1);  // Passa o ID da lista "Desejo" para o backend (substitua o ID conforme necessário)
});

document.getElementById("btnJogando").addEventListener("click", function (event) {
  event.preventDefault();
  exibirJogosPorLista(2);  // Passa o ID da lista "Jogando" para o backend (substitua o ID conforme necessário)
});

document.getElementById("btnCompleto").addEventListener("click", function (event) {
  event.preventDefault();
  exibirJogosPorLista(3);  // Passa o ID da lista "Completo" para o backend (substitua o ID conforme necessário)
});

document.getElementById("btnPausado").addEventListener("click", function (event) {
  event.preventDefault();
  exibirJogosPorLista(4);  // Passa o ID da lista "Pausado" para o backend (substitua o ID conforme necessário)
});

document.getElementById("btnAbandonado").addEventListener("click", function (event) {
  event.preventDefault();
  exibirJogosPorLista(5);  // Passa o ID da lista "Abandonado" para o backend (substitua o ID conforme necessário)
});
