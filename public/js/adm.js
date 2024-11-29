document.addEventListener("DOMContentLoaded", async function () {
  const btnAddJogo = document.getElementById("btnAddJogo");
  const btnAddGenero = document.getElementById("btnAddGenero");
  const btnAddDev = document.getElementById("btnAddDesenvolvedora");
  const btnAddDistri = document.getElementById("btnAddDistribuidora");

  const tabs = {
    cadastroJogo: document.getElementById("cadastroJogo"),
    cadastroGenero: document.getElementById("cadastroGenero"),
    cadastroDev: document.getElementById("cadastroDev"),
    cadastroDistri: document.getElementById("cadastroDistri"),
  };

  // Função para alternar as abas
  function showTab(tabId) {
    Object.keys(tabs).forEach((key) => {
      if (key === tabId) {
        tabs[key].classList.remove("hidden");
      } else {
        tabs[key].classList.add("hidden");
      }
    });
  }

  // Exibe o conteúdo inicial (Cadastro de Jogo)
  showTab("cadastroJogo");

  // Event listeners para os botões
  btnAddJogo.addEventListener("click", () => showTab("cadastroJogo"));
  btnAddGenero.addEventListener("click", () => showTab("cadastroGenero"));
  btnAddDev.addEventListener("click", () => showTab("cadastroDev"));
  btnAddDistri.addEventListener("click", () => showTab("cadastroDistri"));
});

async function buscarModos() {
  try {
    // Envia a requisição para o backend
    const response = await fetch("/adm/modos-de-jogo");
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Verifica se os modos de jogo foram encontrados
    if (data && data.modos) {
      const modoJogoSelect = document.getElementById("modoJogo");
      
      // Preenche o select com as opções recebidas
      data.modos.forEach((modo) => {
        const option = document.createElement("option");
        option.value = modo;  // Valor da opção (pode ser o próprio nome do modo)
        option.textContent = modo;  // Texto exibido ao usuário
        modoJogoSelect.appendChild(option);  // Adiciona a opção ao select
      });
    } else {
      console.error("Nenhum dado encontrado ou formato inválido");
    }
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  }
}

document.getElementById("CadastrarJogo").addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevents the default form submission

  const formData = new FormData(this);
  const jogoData = {
    nmJogo: formData.get("nomeJogo"),
    dsSinopse: formData.get("sinopse"),
    dsImagem: formData.get("linkImagem"),
    stStatus: formData.get("statusJogo"),
    nmPlataforma: formData.get("plataforma"),
    nmDesenvolvedora: formData.get("desenvolvedora"),
    nmDistribuidora: formData.get("distribuidora"),
    nmModo: formData.get("modoJogo"),
    nmGenero: formData.get("genero")
  };

  try {
    const response = await fetch("/admin/cadastrosJogo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jogoData)
    });

    const result = await response.json();
    
    if (response.ok) {
      alert("Jogo cadastrado com sucesso!");
    } else {
      alert(result.message || "Erro ao cadastrar o jogo");
    }
  } catch (error) {
    console.error("Erro ao enviar dados", error);
    alert("Erro ao cadastrar o jogo");
  }
});

  async function buscarPlataformas() {
    try {
      // Envia a requisição para o backend
      const response = await fetch("/adm/plataformas");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Verifica se as plataformas foram encontradas
      if (data && data.plataformas) {
        const plataformaSelect = document.getElementById("plataforma");
        
        // Preenche o select com as opções recebidas
        data.plataformas.forEach((plataforma) => {
          const option = document.createElement("option");
          option.value = plataforma;  // Valor da opção (pode ser o nome da plataforma)
          option.textContent = plataforma;  // Texto exibido ao usuário
          plataformaSelect.appendChild(option);  // Adiciona a opção ao select
        });
      } else {
        console.error("Nenhum dado encontrado ou formato inválido");
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }
// Chama a função para preencher os dados (modos de jogo e plataformas) ao carregar a página
window.onload = buscarModos();
window.onload = buscarPlataformas();
