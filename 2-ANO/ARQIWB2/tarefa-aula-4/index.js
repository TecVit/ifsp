window.onload = iniciarPagina;

function iniciarPagina() {
  document.getElementById("form").noValidate = true;
}

function validarCamposComuns(f) {
  var email = f.elements["email"];
  var senha = f.elements["senha"];
  var confirmacao = f.elements["confirmacao"];

  if (email.validity.valueMissing) {
    email.setCustomValidity("Todos os campos são obrigatórios.");
  } else if (email.validity.typeMismatch) {
    email.setCustomValidity("O e-mail deve ser válido.");
  }

  if (senha.validity.valueMissing) {
    senha.setCustomValidity("Todos os campos são obrigatórios.");
  }

  if (confirmacao.validity.valueMissing) {
    confirmacao.setCustomValidity("Todos os campos são obrigatórios.");
  } else if (senha.value !== confirmacao.value) {
    confirmacao.setCustomValidity("Senha e confirmação devem ser iguais.");
  }
}

function validarDados(f) {
  var elementos = f.elements;

  for (var i = 0; i < elementos.length; i++) {
    if (elementos[i].setCustomValidity) {
      elementos[i].setCustomValidity("");
    }
  }

  validarCamposComuns(f);

  return f.reportValidity();
}