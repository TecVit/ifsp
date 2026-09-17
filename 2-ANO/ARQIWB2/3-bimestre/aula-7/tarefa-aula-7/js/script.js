window.onload = principal;

function principal() {
    let visitas = localStorage.getItem("visitas") || 0;
    visitas++;

    localStorage.setItem("visitas", visitas);
    document.querySelector("#contador-visitas").textContent = "Você já visitou esta página " + visitas + " vezes";

    let rascunho = sessionStorage.getItem("rascunho");
    if (rascunho != null) {
        document.querySelector("#mensagem").value = rascunho;
    }

    listarMensagens();

    document.querySelector("#mensagem").addEventListener("input", salvarRascunho);
    document.querySelector("#botao-salvar-mensagem").addEventListener("click", salvarMensagem);
    document.querySelector("#botao-salvar-palavra").addEventListener("click", salvarPalavraDaAula);
}

function salvarRascunho() {
    let texto = document.querySelector("#mensagem").value;
    sessionStorage.setItem("rascunho", texto);
}

function salvarMensagem() {
    let texto = document.querySelector("#mensagem").value;

    if (texto == "") {
        return;
    }

    let mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];

    mensagens.push(texto);
    localStorage.setItem("mensagens", JSON.stringify(mensagens));

    document.querySelector("#mensagem").value = "";
    sessionStorage.removeItem("rascunho");

    listarMensagens();
}

function listarMensagens() {
    let mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];
    let lista = document.querySelector("#lista-mensagens");

    lista.innerHTML = "";

    for (let i = 0; i < mensagens.length; i++) {
        let li = document.createElement("li");
        li.textContent = mensagens[i];

        let botaoApagar = document.createElement("button");
        botaoApagar.classList.add("botao");
        botaoApagar.textContent = "Apagar";
        botaoApagar.onclick = function () {
            apagarMensagem(i);
        };

        li.appendChild(botaoApagar);
        lista.appendChild(li);
    }
}

function apagarMensagem(indice) {
    let mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];

    mensagens.splice(indice, 1);
    localStorage.setItem("mensagens", JSON.stringify(mensagens));

    listarMensagens();
}

function salvarPalavraDaAula() {
    let palavra = document.querySelector("#palavra-aula").value;

    localStorage.setItem("chaveDaAula", palavra);

    document.querySelector("#status-palavra").textContent = "Palavra salva: " + palavra;
}