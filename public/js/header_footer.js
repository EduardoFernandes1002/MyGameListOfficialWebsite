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
      const logadoDiv = document.getElementById("logado");

      if (token) {
        // Mostrar perfil e botão de deslogar
        perfilLink.style.display = "inline-block";
        deslogarButton.style.display = "inline-block";

        // Ocultar login e registro
        loginLink.style.display = "none";
        registroLink.style.display = "none";

        // Atualizar o link de perfil com o token
        perfilLink.href = `/perfil/${token}`;
      } else {
        // Mostrar login e registro
        loginLink.style.display = "inline-block";
        registroLink.style.display = "inline-block";

        // Ocultar perfil e botão de deslogar
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
    })
    .catch((error) => console.error("Erro ao carregar o footer:", error));
});
