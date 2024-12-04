document.addEventListener("DOMContentLoaded", async function () {
  const token = localStorage.getItem("token");
  let idUsuario = "";
  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    idUsuario = decodedToken.id;
    console.log("ID do usuário:", idUsuario);

    document.querySelector(".notaPessoal").style.display = "flex"; 
  }

  const gameId = window.location.pathname.split("/").pop();

  if (!gameId) {
    console.error("Erro: gameId não encontrado na URL");
    alert("Erro ao carregar o jogo. Tente novamente mais tarde.");
    return;
  }

  try {
    await pegarNomesListas();
  } catch (error) {
    console.error("Erro ao preencher o select:", error);
  }
  // Faz a requisição para pegar os dados do jogo
  try {
    const response = await fetch(`/jogo/${gameId}`);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    if (data.sucesso) {
      const jogo = data.jogo;

      document.getElementById("gameImagem").src = jogo.ds_imagem;
      document.getElementById("nomeJogo").textContent = jogo.nm_jogo;
      document.getElementById("nota").textContent = jogo.nr_nota;
      document.getElementById("sinopseJogo").textContent = jogo.ds_sinopse;

      // Adiciona informações adicionais
      document.getElementById("nmDistribuidora").textContent =
        jogo.nm_distribuidora;
      document.getElementById("nmDesenvolvedora").textContent =
        jogo.nm_desenvolvedora;
      document.getElementById("nmPlataforma").textContent = jogo.nm_plataforma;
      document.getElementById("generos").textContent = jogo.generos
        .split(",")
        .join(", ");
      document.getElementById("modos").textContent = jogo.modos
        .split(",")
        .join(", ");

      document.querySelector(
        ".gridGame1"
      ).style.backgroundImage = `url(${jogo.ds_imagem})`;
    } else {
      console.error("Erro ao carregar informações do jogo:", data.mensagem);
      alert("Erro ao carregar as informações do jogo.");
    }
  } catch (error) {
    console.error("Erro ao carregar as informações do jogo:", error.message);
    alert(
      "Erro ao carregar as informações do jogo. Tente novamente mais tarde."
    );
  }

  const btnSinopse = document.getElementById("btnSinopse");
  const btnInformacoes = document.getElementById("btnInformacoes");
  const sinopse = document.getElementById("sinopse");
  const infos = document.getElementById("infos");

  function showTab(tab) {
    if (tab === "sinopse") {
      sinopse.style.display = "block";
      infos.style.display = "none";
    } else if (tab === "infos") {
      sinopse.style.display = "none";
      infos.style.display = "block";
    }

    btnSinopse.classList.remove("active");
    btnInformacoes.classList.remove("active");

    if (tab === "sinopse") {
      btnSinopse.classList.add("active");
    } else if (tab === "infos") {
      btnInformacoes.classList.add("active");
    }
  }

  btnSinopse.addEventListener("click", () => showTab("sinopse"));
  btnInformacoes.addEventListener("click", () => showTab("infos"));

  showTab("sinopse");

  // Modal de Avaliação
  const notaPessoalEditar = document.getElementById("notaPessoalEditar");
  const notaModal = document.getElementById("notaModal");
  const notaSlider = document.getElementById("notaSlider");
  const notaDinamica = document.getElementById("notaDinamica");
  const salvarNota = document.getElementById("salvarNota");
  const fecharModal = document.getElementById("fecharModal");
  const notaP = document.getElementById("notaP");
  const dataH = new Date().toISOString().split("T")[0]; // Formato de data SQL

  // Abrir area para avaliar com nota pessoal
  notaPessoalEditar.addEventListener("click", () => {
    notaModal.style.display = "flex";
    notaModal.classList.remove("hidden");
  });

  notaSlider.addEventListener("input", () => {
    notaDinamica.textContent = notaSlider.value;
  });


    // Buscar nota pessoal e data
    try {
      const responseNota = await fetch(`/dataNotaP/${idUsuario}/${gameId}`);
      if (!responseNota.ok) {
        throw new Error(`Erro HTTP: ${responseNota.status}`);
      }
  
      const dataNota = await responseNota.json();
      if (dataNota.sucesso) {
        // Atualizar elementos com os dados recebidos
        const notaP = document.getElementById("notaP");
        const dataP = document.querySelector(".data");
  
        notaP.textContent = dataNota.notaPessoal.nota || "Sem nota";
        dataP.textContent = dataNota.notaPessoal.data || "Sem data";
      } else {
        console.error("Erro ao carregar nota pessoal:", dataNota.mensagem);
      }
    } catch (error) {
      console.error("Erro ao buscar nota pessoal:", error.message);
    }
  

  // Salvar nota e adicionar jogo à lista
  salvarNota.addEventListener("click", async function () {
    const idLista = document.getElementById("listasSelect").value; // Obtém o valor selecionado
  
    if (!idLista) { // Verifica se nenhuma lista foi selecionada
      alert("Por favor, selecione uma lista antes de salvar a nota!");
      return; // Interrompe a execução se nenhuma lista foi selecionada
    }
  
    notaP.textContent = notaSlider.value;
    document.querySelector(".data").innerHTML = dataH;
  
    const gameId = window.location.pathname.split("/").pop();
    if (!gameId) {
      alert("Erro: gameId não encontrado.");
      return;
    }
  
    // Envia a avaliação para o backend
    console.log(
      `Enviando avaliação para o jogo ${gameId} com nota ${notaSlider.value} e data ${dataH}`
    );
    try {
      const response = await fetch("/avaliacao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: dataH,
          nota: notaSlider.value,
          idUsuario: idUsuario,
          jogoId: gameId,
        }),
      });
      const result = await response.json();
      console.log("Resultado da requisição de avaliação:", result);
    } catch (error) {
      alert("Erro no servidor. Tente novamente mais tarde.");
      console.error("Erro ao registrar:", error);
    }
  
    // Adiciona o jogo à lista
    try {
      const response = await fetch("/add/lista", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ idLista, idUsuario, idJogo: gameId }),
      });
      const result = await response.json();
      console.log("Resultado da requisição de adicionar item:", result);
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


// função para coletar todas as listas disponiveis para o usuario.
async function pegarNomesListas() {
    try {
        const response = await fetch("/nomeListas");
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();

        const selectElement = document.getElementById("listasSelect");

        // Adiciona novas opções, exceto a lista chamada "Todos"
        data.forEach((lista) => {
            if (lista.nm_lista !== "Todos") {
                const option = document.createElement("option");
                option.value = lista.id_lista;
                option.textContent = lista.nm_lista;
                selectElement.appendChild(option);
            }
        });

        return data;
    } catch (error) {
        console.error("Erro ao pegar nomes das listas:", error);
    }
}
