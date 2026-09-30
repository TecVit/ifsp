window.onload = principal;

function principal() {
    document.querySelector("#botao-salvar").addEventListener("click", salvarPessoa);
    document.querySelector("#botao-remover").addEventListener("click", removerPessoas);

    listarPessoas();
}

function salvarPessoa() {
    let nome = document.querySelector("#nome").value;
    let idade = document.querySelector("#idade").value;

    if (nome == "" || idade == "") {
        return;
    }

    let pessoa = {
        nome: nome,
        idade: idade
    };

    let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

    pessoas.push(pessoa);
    localStorage.setItem("pessoas", JSON.stringify(pessoas));

    document.querySelector("#nome").value = "";
    document.querySelector("#idade").value = "";

    listarPessoas();
}

function listarPessoas() {
    let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];
    let lista = document.querySelector("#lista-pessoas");

    lista.innerHTML = "";

    for (let i = 0; i < pessoas.length; i++) {
        let li = document.createElement("li");
        li.textContent = "Nome: " + pessoas[i].nome + " - Idade: " + pessoas[i].idade;

        lista.appendChild(li);
    }
}

function removerPessoas() {
    localStorage.removeItem("pessoas");

    listarPessoas();
}
