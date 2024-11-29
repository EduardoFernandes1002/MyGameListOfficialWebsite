document.addEventListener("DOMContentLoaded", function () {
  
    const btnAddJogo = document.getElementById("btnAddJogo");
    const btnAddGenero = document.getElementById("btnAddGenero");
    const btnAddDev = document.getElementById("btnAddDesenvolvedora");
    const btnAddDistri = document.getElementById("btnAddDistribuidora");

    const addJogoInputs = document.getElementById("");
    const addGeneroInputs = document.getElementById("");
    const addDevInputs = document.getElementById("");
    const AddDistriInputs = document.getElementById("");

    function proxTab(tab) {
        addJogoInputs.classList.remove("visible");
        addGeneroInputs.classList.remove("visible");
        addDevInputs.classList.remove("visible");
        AddDistriInputs.classList.remove("visible")

        if (tab === 'cadastroJogo') {
            addJogoInputs.classList.add("visible");
        } else if (tab === 'cadastroGenero') {
            addGeneroInputs.classList.add("visible");
        } else if (tab === 'cadastroDev') {
            AddDistriInputs.classList.add("visible");
        } else if (tab === 'cadastroDristri') {
            AddDistriInputs.classList.add("visible");
        }
    }

    // Event listeners para os botões de tabs
    btnAddJogo.addEventListener("click", () => proxTab('cadastroJogo'));
    btnAddGenero.addEventListener("click", () => proxTab('cadastroGenero'));
    btnAddDev.addEventListener("click", () => proxTab('cadastroDev'));
    btnAddDistri.addEventListener("click", () => proxTab('cadastroDristri'));
});