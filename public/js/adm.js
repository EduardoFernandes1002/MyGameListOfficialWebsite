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

document
  .getElementById("CadastrarJogo")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const jogoData = {
      nmJogo: formData.get("nomeJogo"),
      dsSinopse: formData.get("sinopse"),
      dsImagem: formData.get("linkImagem"),
      stStatus: formData.get("statusJogo"),
      dtLancamento: formData.get("data"),
      nmPlataforma: formData.get("plataforma"),
      nmDesenvolvedora: formData.get("desenvolvedora"),
      nmDistribuidora: formData.get("distribuidora"),
      nmModo: formData.get("modoJogo"),
      nmGenero: formData
        .get("genero")
        .split(",")
        .map((g) => g.trim()) // Converte para um array, removendo espaços extras
        .filter((g) => g), // Remove entradas vazias
    };

    try {
      const response = await fetch("/adm/cadastrosJogo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jogoData),
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

document
  .getElementById("CadastrarGenero")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const generoInput = document.getElementById("Genero");
    const nmGenero = generoInput.value;

    // Verifica se o campo está vazio
    if (!nmGenero) {
      alert("É necessário digitar um gênero");
      return; 
    }

    try {
      // Envia a requisição POST ao backend
      const response = await fetch("/adm/cadastroGenero", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nmGenero }),
      });

      const data = await response.json();

      if (response.ok) {
        // Exibe mensagem de sucesso
        alert(data.message)
        generoInput.value = "";
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error("Erro ao enviar requisição:", error);
      alert("Erro ao cadastrar gênero.");
    }
  });


  document
  .getElementById("CadastrarDesenvolvedora")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const desenvolvedoraInput = document.getElementById("Desenvolvedora");
    const nmDesenvolvedora= desenvolvedoraInput.value;
  
    if (!nmDesenvolvedora) {
      alert("É necessário digitar uma desenvolvedora");
      return;
    }
  
    try {
      const response = await fetch("/adm/cadastroDesenvolvedora", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nmDesenvolvedora }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message)
        desenvolvedoraInput.value = "";
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error("Erro ao enviar requisição:", error);
      alert( "Erro ao cadastrar desenvolvedora.");
    }
  });

  // Cadastro de Distribuidoras
document
.getElementById("CadastrarDistribuidora")
.addEventListener("submit", async function (event) {
  event.preventDefault();

  const distribuidoraInput = document.getElementById("Distribuidora");
  const nmDistribuidora = distribuidoraInput.value;

  if (!nmDistribuidora) {
    alert("É necessário digitar uma distribuidora");
    return;
  }

  try {
    const response = await fetch("/adm/cadastroDistribuidora", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nmDistribuidora }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message)
      distribuidoraInput.value = "";
    } else {
      alert(data.message)
    }
  } catch (error) {
    console.error("Erro ao enviar requisição:", error);
    alert( "Erro ao cadastrar distribuidora");
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

    if (data && data.plataformas) {
      const plataformaSelect = document.getElementById("plataforma");

      data.plataformas.forEach((plataforma) => {
        const option = document.createElement("option");
        option.value = plataforma;
        option.textContent = plataforma;
        plataformaSelect.appendChild(option);
      });
    } else {
      console.error("Nenhum dado encontrado ou formato inválido");
    }
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  }
}

async function buscarModos() {
  try {
    // Envia a requisição para o backend
    const response = await fetch("/adm/modos");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.modos) {
      const modoJogoSelect = document.getElementById("modoJogo");

      data.modos.forEach((modo) => {
        const option = document.createElement("option");
        option.value = modo;
        option.textContent = modo;
        modoJogoSelect.appendChild(option);
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