window.onload = principal;

function principal() {
    let temaSalvo = getCookie("tema");

    if (temaSalvo == "escuro") {
        aplicarTema("escuro");
    } else {
        aplicarTema("claro");
    }

    if (getCookie("consentimento") == "") {
        document.querySelector("#banner-cookies").style.display = 'flex';
    } else {
        document.querySelector("#banner-cookies").style.display = 'none';
    }

    if (getCookie("preferencias") == "true") {
        mostrarBoasVindas();
    }

    let botaoTema = document.querySelector("#botao-tema");
    botaoTema.addEventListener('click', alternarTema);

    let botaoAceitar = document.querySelector("#aceitar");
    botaoAceitar.addEventListener('click', aceitarTudo);

    let botaoRejeitar = document.querySelector("#rejeitar");
    botaoRejeitar.addEventListener('click', rejeitarTudo);

    let botaoPersonalizar = document.querySelector("#personalizar");
    botaoPersonalizar.addEventListener('click', abrirPersonalizar);

    let botaoSalvar = document.querySelector("#salvar-personalizado");
    botaoSalvar.addEventListener('click', salvarPersonalizado);

    let botaoEsquecer = document.querySelector("#esquecer");
    botaoEsquecer.addEventListener('click', esquecerDados);

    atualizarPainelCookies();
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(nome, valor, dias) {
    let data = new Date();
    data.setTime(data.getTime() + (dias * 24 * 60 * 60 * 1000));
    let expires = "expires=" + data.toUTCString();
    document.cookie = nome + "=" + valor + ";" + expires + ";path=/";
    atualizarPainelCookies();
}

function apagarCookie(nome) {
    document.cookie = nome + "=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

function atualizarPainelCookies() {
    let painel = document.querySelector("#cookies-live");
    if (document.cookie == "") {
        painel.innerHTML = "(nenhum cookie salvo)";
    } else {
        painel.innerHTML = document.cookie;
    }
}

function aplicarTema(tema) {
    if (tema == "escuro") {
        document.body.classList.remove("tema-claro");
        document.body.classList.add("tema-escuro");
    } else {
        document.body.classList.remove("tema-escuro");
        document.body.classList.add("tema-claro");
    }
}

function alternarTema() {
    let temaAtual = "claro";
    if (document.body.classList.contains("tema-escuro")) {
        temaAtual = "escuro";
    }

    let novoTema = "escuro";
    if (temaAtual == "escuro") {
        novoTema = "claro";
    }

    aplicarTema(novoTema);

    if (getCookie("preferencias") == "true") {
        setCookie("tema", novoTema, 365);
    }
}

function aceitarTudo() {
    setCookie("consentimento", "aceito", 365);
    setCookie("necessarios", "true", 365);
    setCookie("preferencias", "true", 365);

    let temaAtual = "claro";
    if (document.body.classList.contains("tema-escuro")) {
        temaAtual = "escuro";
    }
    setCookie("tema", temaAtual, 365);
    registrarVisita();

    document.querySelector("#banner-cookies").style.display = 'none';
}

function rejeitarTudo() {
    setCookie("consentimento", "rejeitado", 365);
    setCookie("necessarios", "true", 365);
    apagarCookie("preferencias");
    apagarCookie("tema");
    apagarCookie("ultimaVisita");

    document.querySelector("#banner-cookies").style.display = 'none';
    atualizarPainelCookies();
}

function abrirPersonalizar() {
    document.querySelector("#painel-personalizar").hidden = false;
}

function salvarPersonalizado() {
    let preferencias = document.querySelector("#check-preferencias").checked;

    setCookie("consentimento", "personalizado", 365);
    setCookie("necessarios", "true", 365);

    if (preferencias == true) {
        setCookie("preferencias", "true", 365);
        let temaAtual = "claro";
        if (document.body.classList.contains("tema-escuro")) {
            temaAtual = "escuro";
        }
        setCookie("tema", temaAtual, 365);
        registrarVisita();
    } else {
        apagarCookie("preferencias");
        apagarCookie("tema");
        apagarCookie("ultimaVisita");
    }

    document.querySelector("#banner-cookies").style.display = 'none';
    atualizarPainelCookies();
}

function registrarVisita() {
    let agora = new Date();
    setCookie("ultimaVisita", agora.toLocaleString("pt-BR"), 365);
}

function mostrarBoasVindas() {
    let ultimaVisita = getCookie("ultimaVisita");
    let mensagem = document.querySelector("#boas-vindas");

    if (ultimaVisita != "") {
        mensagem.innerHTML = "Bem-vindo de volta! Sua última visita foi em " + ultimaVisita;
    } else {
        mensagem.innerHTML = "Bem-vindo! Essa é sua primeira visita registrada.";
    }

    registrarVisita();
}

function esquecerDados() {
    apagarCookie("consentimento");
    apagarCookie("necessarios");
    apagarCookie("preferencias");
    apagarCookie("tema");
    apagarCookie("ultimaVisita");

    aplicarTema("claro");
    document.querySelector("#boas-vindas").innerHTML = "";
    document.querySelector("#painel-personalizar").hidden = true;
    document.querySelector("#check-preferencias").checked = false;

    document.querySelector("#banner-cookies").style.display = 'flex';
    atualizarPainelCookies();
}
