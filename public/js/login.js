document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const login = document.getElementById("email_user").value;
    const senha = document.getElementById("password").value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, senha })
        });

        const data = await response.json();

        if (data.sucesso) {
            // Se login for bem-sucedido, armazene o token
            localStorage.setItem('token', data.token);
            window.location.href = "/";  // Redireciona para a página principal
        } else {
            // Se a resposta for um erro, mostra o alerta
            alert(data.mensagem);
        }
    } catch (error) {
        // Caso haja um erro com a requisição
        alert("Erro no servidor. Tente novamente mais tarde.");
    }
});