document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem('token');
    let idUsuario = '';
    if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        idUsuario = decodedToken.id; // Pega o idUsuario do payload
        console.log("ID do usuário:", idUsuario);
    }

    const gameId = window.location.pathname.split('/').pop(); // A variável gameId agora é global

    const selectElement = document.getElementById('listasSelect');

    // Pega os nomes das listas e preenche o select
    try {
        const listas = await pegarNomesListas();
        if (listas && Array.isArray(listas)) {
            for (let i = 2; i <= 6; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = listas.find(lista => lista.id_lista === i)?.nm_lista || `Lista ${i}`;
                selectElement.appendChild(option);
            }
        }
    } catch (error) {
        console.error('Erro ao preencher o select:', error);
    }

    if (!gameId) {
        console.error('Erro: gameId não encontrado na URL');
        alert('Erro ao carregar o jogo. Tente novamente mais tarde.');
        return; // Não prosseguir se não tiver gameId
    }

    // Faz a requisição para pegar os dados do jogo
    try {
        const response = await fetch(`/jogo/${gameId}`);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        // Recebe dados da resposta e adiciona elementos no HTML. Caso contrário, ativa um erro
        const data = await response.json();
        if (data.sucesso) {
            const jogo = data.jogo;

            // Atualiza os elementos do HTML com os dados do jogo
            document.getElementById('gameImagem').src = jogo.ds_imagem;
            document.getElementById('nomeJogo').textContent = jogo.nm_jogo;
            document.getElementById('nota').textContent = jogo.nr_nota;
            document.getElementById('sinopseJogo').textContent = jogo.ds_sinopse;
            document.getElementById('notaP').textContent = 'Nota Pessoal: ';
            document.querySelector('.gridGame1').style.backgroundImage = `url(${jogo.ds_imagem})`;
        } else {
            console.error('Erro ao carregar informações do jogo:', data.mensagem);
            alert('Erro ao carregar as informações do jogo.'); // Exibir erro para o usuário
        }
    } catch (error) {
        console.error('Erro ao carregar as informações do jogo:', error.message);
        alert('Erro ao carregar as informações do jogo. Tente novamente mais tarde.');
    }

    // Gerenciamento de Tabs (Sinopse, Avaliações, Categorias)
    const btnSinopse = document.getElementById("btnSinopse");
    const btnInformacoes = document.getElementById("btnInformacoes");
    const sinopse = document.getElementById("sinopse");
    const infos = document.getElementById("infos");

    // Função para mostrar a seção correta
    function showTab(tab) {
        // Remove a classe 'visible' de todas as seções
        sinopse.classList.remove("visible");
        infos.classList.remove("visible");

        // Adiciona a classe 'visible' para a aba selecionada
        if (tab === 'sinopse') {
            sinopse.classList.add("visible");
        } else if (tab === 'infos') {
            infos.classList.add("visible");
        }

        // Remove a classe 'active' de todos os botões
        btnSinopse.classList.remove("active");
        btnInformacoes.classList.remove("active");

        // Adiciona a classe 'active' ao botão da aba selecionada
        if (tab === 'sinopse') {
            btnSinopse.classList.add("active");
        } else if (tab === 'infos') {
            btnInformacoes.classList.add("active");
        }
    }

    // Event listeners para os botões de tabs
    btnSinopse.addEventListener("click", () => showTab('sinopse'));
    btnInformacoes.addEventListener("click", () => showTab('infos'));

    // Inicializa a primeira aba visível (Sinopse)
    showTab('sinopse');

    // Modal de Avaliação
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

    // Salvar nota e adicionar jogo à lista
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

        // Envia a avaliação para o backend
        console.log(`Enviando avaliação para o jogo ${gameId} com nota ${notaSlider.value} e data ${dataH}`);
        try {
            const response = await fetch('/avaliacao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ data: dataH, nota: notaSlider.value, idUsuario: idUsuario, jogoId: gameId }),
            });
            const result = await response.json();
            console.log('Resultado da requisição de avaliação:', result);
        } catch (error) {
            alert("Erro no servidor. Tente novamente mais tarde.");
            console.error("Erro ao registrar:", error);
        }

        // Adiciona o jogo à lista
        const idLista = selectElement.value;
        try {
            const response = await fetch('/add/lista', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ idLista, idUsuario, idJogo: gameId }),
            });
            const result = await response.json();
            console.log('Resultado da requisição de adicionar item:', result);
        } catch (error) {
            alert("Erro no servidor. Tente novamente mais tarde.");
            console.error("Erro ao adicionar item:", error);
        }

        // Fecha o modal após salvar
        notaModal.style.display = "none";
        notaModal.classList.add("hidden");
    });

    // Fechar modal
    fecharModal.addEventListener("click", () => {
        notaModal.style.display = "none";
    });
});

async function pegarNomesListas() {
    try {
        const response = await fetch('/nomeListas');
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao pegar nomes das listas:', error);
    }
}
