document.addEventListener("DOMContentLoaded", async function () {
    // Obtém o ID do jogo da URL
    const gameId = window.location.pathname.split('/').pop(); // A variável gameId agora é global
    console.log('Game ID:', gameId); // Log para verificar o gameId

    if (!gameId) {
        console.error('Erro: gameId não encontrado na URL');
        alert('Erro ao carregar o jogo. Tente novamente mais tarde.');
        return; // Não prosseguir se não tiver gameId
    }

    // Faz a requisição para pegar os dados do jogo
    try {
        const response = await fetch(`/api/jogo/${gameId}`);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Dados do jogo:', data); // Log para verificar os dados recebidos

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
            alert('Erro ao carregar as informações do jogo.'); // Exibir erro para o usuário
        }
    } catch (error) {
        console.error('Erro ao carregar as informações do jogo:', error.message);
        alert('Erro ao carregar as informações do jogo. Tente novamente mais tarde.');
    }
});

// Selecionando elementos
const notaPessoalEditar = document.getElementById("notaPessoalEditar");
const notaModal = document.getElementById("notaModal");
const notaSlider = document.getElementById("notaSlider");
const notaDinamica = document.getElementById("notaDinamica");
const salvarNota = document.getElementById("salvarNota");
const fecharModal = document.getElementById("fecharModal");
const notaP = document.getElementById("notaP");
const dataH = new Date().toISOString().split('T')[0]; // Formato de data SQL

// Abrir modal
notaPessoalEditar.addEventListener("click", () => {
    notaModal.style.display = "flex"; // Exibe o modal
    notaModal.classList.remove("hidden");
});

// Atualizar nota dinamicamente
notaSlider.addEventListener("input", () => {
    notaDinamica.textContent = notaSlider.value;
});

// Salvar nota
salvarNota.addEventListener("click", async function () {
    // Atualiza a nota pessoal exibida
    notaP.textContent = notaSlider.value;
    document.querySelector('.data').innerHTML = dataH;  // Atualiza a data exibida

    // Verifica se o gameId está disponível
    const gameId = window.location.pathname.split('/').pop();  // Recuperando novamente o gameId
    if (!gameId) {
        alert("Erro: gameId não encontrado.");
        return; // Se gameId estiver ausente, não continua
    }

    console.log(`Enviando avaliação para o jogo ${gameId} com nota ${notaSlider.value} e data ${dataH}`);

    // Realiza a requisição para salvar a nota
    try {
        const response = await fetch('/avaliacao', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: dataH, nota: notaSlider.value, jogoId: gameId })
        });

        const result = await response.json();
        console.log('Resultado da requisição de avaliação:', result); // Log para verificar a resposta do servidor

    } catch (error) {
        alert("Erro no servidor. Tente novamente mais tarde.");
        console.error("Erro ao registrar:", error);
    }

    // Fecha o modal após salvar
    notaModal.style.display = "none";
    notaModal.classList.add("hidden");
});

// Fechar modal
fecharModal.addEventListener("click", () => {
    notaModal.style.display = "none";
});
