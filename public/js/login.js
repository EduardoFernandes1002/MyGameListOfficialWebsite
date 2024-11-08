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
            alert(data.mensagem);
            window.location.href = "/";
        } else {
            alert(data.mensagem);
        }
    } catch (error) {
        alert("Erro no servidor. Tente novamente mais tarde.");
    }
});
