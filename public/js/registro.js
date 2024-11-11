  document.getElementById("registroForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const nickname = document.getElementById("nickname").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    if (password !== passwordConfirm) {
        alert("As senhas não coincidem.");
        return;
    }

    try {
        const response = await fetch('/registro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, nickname, senha: password })
          });

        const data = await response.json();
        if (data.sucesso) {
            alert(data.mensagem);
            window.location.href = "/login";
        } else {
            alert(data.mensagem);
        }
    } catch (error) {
        alert("Erro no servidor. Tente novamente mais tarde.");
        console.error("Erro ao registrar:", error);
    }
  });
