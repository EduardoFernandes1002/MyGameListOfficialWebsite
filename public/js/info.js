document.addEventListener("DOMContentLoaded", async function () {
    // Pega o ID do jogo da URL
    const gameId = window.location.pathname.split('/').pop();  // Pega o último segmento da URL

    // Faz a requisição para pegar as informações do jogo específico
    fetch(`/info/${gameId}`)
        .then(response => response.json())  // A resposta é um JSON
        .then(data => {
            if (data.sucesso) {
                const jogo = data.jogo;  // Dados do jogo enviados pelo backend

                // Atribuindo as informações no HTML
                document.getElementById('gameImagem').src = jogo.ds_imagem;
                document.getElementById('gameImagem').alt = jogo.nm_jogo;

                // Nome do jogo
                document.getElementById('nomeJogo').textContent = jogo.nm_jogo;

                // Nota do jogo
                document.getElementById('nota').textContent = jogo.nr_nota;

                // Sinopse do jogo
                document.getElementById('sinopseJogo').textContent = jogo.ds_sinopse;

                // Exemplo de nota pessoal, você pode carregar de outro lugar, se necessário
                document.getElementById('notaP').textContent = 'Sua nota aqui'; // Pode ser algo dinâmico
            } else {
                console.error('Erro ao carregar as informações do jogo.');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar as informações do jogo:', error);
        });
});