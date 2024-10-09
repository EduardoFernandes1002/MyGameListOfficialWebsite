const apelidosExistentes = ['Thiago', 'Eduardo'];
const emailsExistentes = ['duduzebas@gmail.com', 'thiagodossantos461@gmail.com'];

function processarRegistro(event) {
    event.preventDefault();
    let nickname = document.getElementById("nickname").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById('password').value;
    let confirmarSenha = document.getElementById('passwordConfirm').value;

    if (emailsExistentes.includes(email)) {
        alert("Erro: Esse email já está em uso!");
        return false;
    }

    if (apelidosExistentes.includes(nickname)) {

        let nickname = document.getElementById("nickname").value = '';

        alert("Erro: Esse nickname já está em uso!");
        return false;
    }

    if (senha !== confirmarSenha) {
        alert("Erro: As senhas não correspondem.");

        document.getElementById('password').value = '';
        document.getElementById('passwordConfirm').value = '';

        return false;
    }
    return window.location.href = 'index.html'
}
