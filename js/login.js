const apelidos = ['Eduardo', 'Thiago'];
const emails = ['duduzebas@gmail.com', 'thiagodossantos461@gmail.com'];



function processarLogin(event) {
    event.preventDefault();

    // Pega os valores dos INPUTS
    let emailOrUser = document.getElementById('email_user').value;
    let password = document.getElementById('password').value;

    // Verifica se o nome ou email predefinidos foram digitados após o botão de submit
    if (emailOrUser === apelidos[0] || emailOrUser === emails[0]) {
        
        // Define uma senha fixa caso o nome ou email predefinido
        let correctPassword = "12345678";

        // Valida se a senha digitada é igual a senha pré-definida
        if (password != correctPassword) {
            document.getElementById('password').value = "";
            alert("Erro: Senha Incorreta")
            return false;
        };

    } else if (emailOrUser == apelidos[1] || emailOrUser == emails[1]) {
    
        // Define uma senha fixa caso o nome ou email pré-definido
        let correctPassword = "87654321";

        // Valida se a senha digitada é igual a senha pré-definida
        if (password != correctPassword) {
            document.getElementById('password').value = "";
            alert("Erro: Senha Incorreta")
            return false
        };

    } else {

        alert("Erro: Email ou Apelido não encontrado")
        return false

    }

    return window.location.href = 'index.html'

}