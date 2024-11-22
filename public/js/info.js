document.addEventListener("DOMContentLoaded", async function () {
    // Pega o ID do jogo da URL
    const gameId = window.location.pathname.split('/').pop();  // Pega o último segmento da URL

    // Faz a requisição para pegar as informações do jogo específico
    fetch(`/info/${gameId}`)
        .then(response => response.json())
        .then(data => {
            if (data.sucesso) {
                const jogo = data.jogo;  


                document.getElementById('gameImagem').src = jogo.ds_imagem;
                document.getElementById('gameImagem').alt = jogo.nm_jogo;
                document.getElementById('nomeJogo').textContent = jogo.nm_jogo;
                document.getElementById('nota').textContent = jogo.nr_nota;
                document.getElementById('sinopseJogo').textContent = jogo.ds_sinopse;

                document.getElementById('notaP').textContent = 'Sua nota aqui:';
            } else {
                console.error('Erro ao carregar as informações do jogo.');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar as informações do jogo:', error);
        });
});