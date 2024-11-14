document.addEventListener("DOMContentLoaded", function () {
  fetch("/templates/nav_bar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;
    })
    .catch((error) => console.error("Erro ao carregar a navbar:", error));
});


  const token = localStorage.getItem("token");

  const logado = document.getElementById("perfil");
  const login = document.getElementById("login");
  const deslogado = document.getElementById("registro");

  if (token) {
      // Se o token existir, significa que o usuário está logado
      logado.style.display = "inline";
      login.style.display = "none";
      deslogado.style.display = "none";
  } else {
      // Se o token não existir, significa que o usuário não está logado
      logado.style.display = "none";
      login.style.display = "inline";
      deslogado.style.display = "inline";
  }
