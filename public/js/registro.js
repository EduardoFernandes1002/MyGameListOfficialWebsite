  document.getElementById("registroForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const nickname = document.getElementById("nickname").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert("O e-mail inserido não é válido.");
        return;
    }

    const nicknameRegex = /^[a-zA-Z_]+$/;
    if (!nicknameRegex.test(nickname)) {
        alert("O nickname deve conter apenas caracteres validos.");
        return;
    }

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
