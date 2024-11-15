document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
  
    // Verificar o token ao carregar a página
    if (token) {
      fetch("/sua-rota", {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Erro de autenticação"); // Se a resposta não for ok, gera erro
          }
          return response.json(); // Processa a resposta JSON
        })
        .then(data => {
          // Aqui você pode processar os dados da resposta, mas não exibi-los diretamente
          console.log(data); // Exemplo de processamento
        })
        .catch(error => {
          console.error("Erro na requisição:", error);
          alert("Ocorreu um erro. Tente novamente mais tarde.");
        });
    } else {
      alert("Você não está logado.");
    }
  });
