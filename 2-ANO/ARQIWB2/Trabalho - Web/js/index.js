let pontos = {
  "player": 0,
  "cpu": 0,
};

let nomes = {
  "player": "Jogador",
  "cpu": "Computador",
};

function atualizarPlacar() {
  const span_jogador = document.getElementById("pontosjogador");
  const span_computador = document.getElementById("pontoscomputador");

  span_jogador.innerText = pontos["player"];
  span_computador.innerText = pontos["cpu"];
}

function jogar() {
  let apostas = {};

  const escolha_do_jogador = document.querySelector("input[name=aposta]:checked")?.value;
  const escolha_do_computador = escolha_do_jogador === "par" ? "impar" : "par";

  apostas[escolha_do_jogador] = "player";
  apostas[escolha_do_computador] = "cpu";

  const numero_aleatorio = Math.floor(Math.random() * 5) + 1;

  const numero_do_jogador = document.getElementById("number_player").value;
  const numero_do_computador = numero_aleatorio;

  if (!numero_do_jogador) {
    alert("Digite um número!");
    return false;
  }

  const soma_dos_numeros = parseInt(numero_do_computador) + parseInt(numero_do_jogador);
  const resultado_da_rodada = ((soma_dos_numeros % 2) === 0) ? "par" : "impar";

  pontos[apostas[resultado_da_rodada]] += 1

  alert(`Número do Jogador: ${numero_do_jogador}
Número do Computador: ${numero_do_computador}
A soma dos números é ${resultado_da_rodada}, o ${nomes[apostas[resultado_da_rodada]]} ganhou 1 ponto!
`);

  atualizarPlacar();

  return false;
}

function reiniciar() {
  pontos = {
    "player": 0,
    "cpu": 0,
  }

  atualizarPlacar();

  alert("Pontos Zerados, Bom jogo!")
}