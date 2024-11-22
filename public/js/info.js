document.addEventListener("DOMContentLoaded", async function () {
    // Obtém o ID do jogo da URL
    const gameId = window.location.pathname.split('/').pop();

    // Faz a requisição para pegar os dados do jogo
    fetch(`/api/jogo/${gameId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.sucesso) {
                const jogo = data.jogo;

                // Atualiza os elementos do HTML com os dados do jogo
                document.getElementById('gameImagem').src = jogo.ds_imagem;
                document.getElementById('nomeJogo').textContent = jogo.nm_jogo;
                document.getElementById('nota').textContent = jogo.nr_nota;
                document.getElementById('sinopseJogo').textContent = jogo.ds_sinopse;

                document.getElementById('notaP').textContent = 'Sua nota aqui:';

                document.querySelector('.gridGame1').style.backgroundImage = `url(${jogo.ds_imagem})`;

            } else {
                console.error('Erro ao carregar informações do jogo:', data.mensagem);
            }
        })
        .catch(error => {
            console.error('Erro ao carregar as informações do jogo:', error.message);
        });
});