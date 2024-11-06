document.addEventListener("DOMContentLoaded", function () {
  fetch("/templates/nav_bar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;
    })
    .catch((error) => console.error("Erro ao carregar a navbar:", error));
});
