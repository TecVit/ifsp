let placar = {
    vitorias: 0,
    derrotas: 0,
};

let soma = 0;
let tentativas = 0;
let rodadaAtiva = false;

const btnIniciar = document.getElementById("btn-iniciar");
const btnJogar = document.getElementById("btn-jogar");
const btnReiniciar = document.getElementById("btn-reiniciar");
const campoPalpite = document.getElementById("palpite");
const mensagem = document.getElementById("mensagem");

function iniciarRodada() {
    const dado1 = Math.floor(Math.random() * 6) + 1;
    const dado2 = Math.floor(Math.random() * 6) + 1;

    soma = dado1 + dado2;
    tentativas = 3;
    rodadaAtiva = true;

    document.getElementById("dado1").innerText = dado1;
    document.getElementById("dado2").innerText = dado2;
    document.getElementById("soma").innerText = "?";
    document.getElementById("tentativas").innerText = tentativas;

    mensagem.innerText = "Rodada iniciada, faça seu palpite!";
    campoPalpite.value = "";
    btnJogar.disabled = false;
}

function jogar() {
    if (!rodadaAtiva) {
        return;
    }

    const palpite = parseInt(campoPalpite.value);

    if (!palpite) {
        alert("Digite um número!");
        return;
    }

    if (palpite === soma) {
        mensagem.innerText = `Você acertou! A soma era ${soma}.`;
        document.getElementById("soma").innerText = soma;
        placar.vitorias += 1;
        finalizarRodada();
        return;
    }

    tentativas -= 1;
    document.getElementById("tentativas").innerText = tentativas;

    if (tentativas === 0) {
        mensagem.innerText = `Você perdeu! A soma era ${soma}.`;
        document.getElementById("soma").innerText = soma;
        placar.derrotas += 1;
        finalizarRodada();
        return;
    }

    mensagem.innerText = "Palpite errado, tente novamente.";
}

function finalizarRodada() {
    rodadaAtiva = false;
    btnJogar.disabled = true;
    atualizarPlacar();
}

function atualizarPlacar() {
    document.getElementById("vitorias").innerText = placar.vitorias;
    document.getElementById("derrotas").innerText = placar.derrotas;
}

function reiniciarJogo() {
    placar.vitorias = 0;
    placar.derrotas = 0;

    rodadaAtiva = false;
    btnJogar.disabled = true;

    document.getElementById("dado1").innerText = "-";
    document.getElementById("dado2").innerText = "-";
    document.getElementById("soma").innerText = "-";
    document.getElementById("tentativas").innerText = "-";
    mensagem.innerText = "";
    campoPalpite.value = "";

    atualizarPlacar();
}

btnIniciar.addEventListener("click", iniciarRodada);
btnJogar.addEventListener("click", jogar);
btnReiniciar.addEventListener("click", reiniciarJogo);
