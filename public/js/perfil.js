// Função para atualizar o texto da mensagem com base no botão clicado
function atualizarMensagem(novaMensagem) {
    const mensagemElement = document.getElementById('Mensagem');
    mensagemElement.textContent = novaMensagem;
  }
  
  function evitarEnvioFormulario(event) {
    event.preventDefault();
  }
  // Adiciona event listeners aos botões
  document.getElementById('btnTudo').addEventListener('click', async function(event) {
    evitarEnvioFormulario(event);
    try {
      const response = await fetch('/perfil', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jogoJSON })
      });
      const data = await response.json();
        if (data.sucesso) {
            alert(data.mensagem);
            document.getElementById(response).innerHTML;
        } else {
            alert(data.mensagem);
        }
    } catch (error) {
        alert("Erro no servidor. Tente novamente mais tarde.");
    }


  });
  
  document.getElementById('btnDesejo').addEventListener('click', function(event) {
    evitarEnvioFormulario(event);
    atualizarMensagem('Jogos Desejados');
  });
  
  document.getElementById('btnJogando').addEventListener('click', function(event) {
    evitarEnvioFormulario(event);
    atualizarMensagem('Jogos que Estou Mais Ativo');
  });
  
  document.getElementById('btnCompleto').addEventListener('click', function(event) {
    evitarEnvioFormulario(event);
    atualizarMensagem('Meus Jogos Completos');
  });
  
  document.getElementById('btnPausado').addEventListener('click', function(event) {
    evitarEnvioFormulario(event);
    atualizarMensagem('Meus Jogos Pausados');
  });
  
  document.getElementById('btnAbandonado').addEventListener('click', function(event) {
    evitarEnvioFormulario(event);
    atualizarMensagem('Jogos que Abandonei');
  });
  document.getElementById('btnReview').addEventListener('click', function(event){
    evitarEnvioFormulario(event);
    atualizarMensagem('Minhas Reviews');
  });
  