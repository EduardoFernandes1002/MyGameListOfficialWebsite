document.addEventListener("DOMContentLoaded", function () {
  // Carregar o cabeçalho dinâmico
  fetch("/templates/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;

      const token = localStorage.getItem("token");

      // Elementos do DOM
      const perfilLink = document.getElementById("perfil");
      const deslogarButton = document.getElementById("deslogar");
      const loginLink = document.getElementById("login");
      const registroLink = document.getElementById("registro");

      if (token) {
        perfilLink.style.display = "inline-block";
        deslogarButton.style.display = "inline-block";

        loginLink.style.display = "none";
        registroLink.style.display = "none";

        // Atualizar o link de perfil com o token
        perfilLink.href = `/perfil.html?token=${token}`;
      } else {
        loginLink.style.display = "inline-block";
        registroLink.style.display = "inline-block";

        perfilLink.style.display = "none";
        deslogarButton.style.display = "none";
      }

      // Adicionar evento ao botão de deslogar
      deslogarButton.addEventListener("click", function () {
        // Remove o token do localStorage
        localStorage.removeItem("token");

        // Atualiza a interface
        perfilLink.style.display = "none";
        deslogarButton.style.display = "none";
        loginLink.style.display = "inline-block";
        registroLink.style.display = "inline-block";

        // Redireciona para a página inicial
        window.location.href = "/";
      });
    })
    .catch((error) => console.error("Erro ao carregar o header:", error));

  // Carregar o rodapé dinâmico
  fetch("/templates/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;

      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodificar token

          if (decodedToken.idPermissao === 2) {
            
            // Criar o link para a área administrativa
            const adminLink = document.createElement("a");
            adminLink.href = `/adm.html?token=${token}`;
            adminLink.textContent = "Área Administrativa";
            adminLink.className = "admin-link"; // Classe CSS para estilo

            // Adicionar o link ao rodapé
            const divfooter = document.querySelector(".footer");
            if (divfooter) {
              divfooter.appendChild(adminLink);
            }
          }
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
        }
      }
    })
    .catch((error) => console.error("Erro ao carregar o footer:", error));
});
