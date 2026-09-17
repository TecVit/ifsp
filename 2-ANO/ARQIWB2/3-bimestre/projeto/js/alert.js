var modalMensagemSucesso = document.getElementById("alertarSucesso");
var modalMensagemErro = document.getElementById("alertarErro");

var tempoDisponivel = 2;

function alertar(tipo, mensagem) {
  modalMensagemSucesso.textContent = "";
  modalMensagemSucesso.style.display = "none";

  modalMensagemErro.textContent = "";
  modalMensagemErro.style.display = "none";

  var modalMensagem = null;

  if (tipo === "sucesso") {
    modalMensagem = modalMensagemSucesso;
  } else if (tipo === "erro") {
    modalMensagem = modalMensagemErro;
  }

  modalMensagem.textContent = mensagem;

  modalMensagem.style.display = "flex";
  modalMensagem.style.opacity = 1;

  return true;
}