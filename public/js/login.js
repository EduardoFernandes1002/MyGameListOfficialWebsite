document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    const login = document.getElementById('email_user').value;
    const senha = document.getElementById('password').value;

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ login, senha })
      });

      const data = await response.json();

      if (data.sucesso) {
        alert(data.mensagem);
        // Redirecionar ou executar outra ação
      } else {
        alert(data.mensagem); // Mostra mensagem de erro
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro na conexão com o servidor.');
    }
  });
});
