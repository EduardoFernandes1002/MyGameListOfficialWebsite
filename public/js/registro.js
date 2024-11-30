  document.getElementById("registroForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Captura os valores do formulário
    const email = document.getElementById("email").value;
    const apelido = document.getElementById("nickname").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    // Expressões regulares para validação com regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const apelidoRegex = /^[a-zA-Z_]+$/; // Permite apenas letras e underscore
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]+$/;

    // Verificação REGEX de cada campo
    if (!emailRegex.test(email)) {
        alert("O e-mail inserido não é válido.");
        return;
    }
    if (! apelidoRegex.test(apelido)) {
        alert("O nickname deve conter apenas caracteres validos.");
        return;
    }
    if(!senhaRegex.test(password)) {
        alert(
            "A senha deve atender aos seguintes critérios:\n" +
            "- Não conter espaços ou caracteres especiais.\n" +
            "- Ter pelo menos uma letra maiúscula e uma minúscula.\n" +
            "- Conter somente letras e números."
        );
        return;
    }

    // Verifica se as senhãs não são iguas
    if (password !== passwordConfirm) {
        alert("As senhas não coincidem.");
        return;
    }

    try {
        const response = await fetch('/registro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, apelido, senha: password })
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
