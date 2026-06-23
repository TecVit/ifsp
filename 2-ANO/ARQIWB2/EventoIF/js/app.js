function carregarCategoriasSelect() {
  const input = document.getElementById("category");
  input.innerHTML = "";

  for (let i = 0; i < categorias.length; i++) {
    const option = document.createElement("option");
    option.value = categorias[i];
    option.textContent = categorias[i];
    input.appendChild(option);
  }
}

carregarCategoriasSelect();

function marcarFiltroAtivo(botaoSelecionado) {
  const botoes = document.querySelectorAll('#categories button');
  
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].classList.remove('ativo');
  }

  botaoSelecionado.classList.add('ativo');
}

function carregarCategoriasButtons() {
  const categories = document.getElementById("categories");
  categories.innerHTML = "";

  const button = document.createElement("button");

  button.onclick = () => {
    marcarFiltroAtivo(button);
    ordenarEventosPorCategoria(eventos, 'todos');
  };

  button.textContent = 'todos';
  button.classList.add('ativo');
  categories.appendChild(button);

  for (let i = 0; i < categorias.length; i++) {
    const button = document.createElement("button");

    const categoriaAtual = categorias[i];

    button.onclick = () => {
      marcarFiltroAtivo(button);
      ordenarEventosPorCategoria(eventos, categoriaAtual);
    };

    button.textContent = categorias[i];
    categories.appendChild(button);
  }
}

carregarCategoriasButtons();

function formatarData(data) {
  let dia = data.getDate();
  let mes = data.getMonth() + 1;

  let diaTexto = "" + dia;
  if (dia < 10) {
    diaTexto = "0" + dia;
  }

  let mesTexto = "" + mes;
  if (mes < 10) {
    mesTexto = "0" + mes;
  }

  const ano = data.getFullYear();

  return diaTexto + "/" + mesTexto + "/" + ano;
}

function calcularDiasRestantes(dataEvento) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const alvo = new Date(dataEvento);
  alvo.setHours(0, 0, 0, 0);

  const MS_POR_DIA = 1000 * 60 * 60 * 24;
  const diferencaEmMs = alvo - hoje;

  return Math.ceil(diferencaEmMs / MS_POR_DIA);
}

function carregarEventos(eventos) {
  const lista = document.getElementById("list-events");
  lista.innerHTML = "";

  let qtdEvents = document.getElementById('qtd-events');
  qtdEvents.innerText = "Exibindo " + eventos.length + " de " + totalEvents + " eventos";

  for (let i = 0; i < eventos.length; i++) {
    const evento = eventos[i];

    const card = document.createElement("div");
    card.className = "event-card";

    const categoria = document.createElement("span");
    categoria.textContent = evento.categoria;

    const nome = document.createElement("h1");
    nome.textContent = evento.nome;

    const data = document.createElement("p");
    data.textContent = "Data: " + formatarData(evento.data);

    const duracao = evento.horaFim - evento.horaInicio;
    const horario = document.createElement("p");
    horario.textContent =
      "Horário: " + evento.horaInicio + "h às " + evento.horaFim +
      "h (" + duracao + " h)";

    const local = document.createElement("p");
    local.textContent = "Local: " + evento.local;

    const dias = calcularDiasRestantes(evento.data);

    let textoStatus = "";
    let corStatus = "";

    switch (true) {
      case dias < 0:
        textoStatus = "Evento encerrado";
        corStatus = "red";
        break;

      case dias === 0:
        textoStatus = "Hoje!";
        corStatus = "orange";
        break;

      case dias <= 7:
        textoStatus = "Esta semana — " + dias + " dias";
        corStatus = "gold";
        break;

      default:
        textoStatus = dias + " dias restantes";
        corStatus = "green";
    }

    const status = document.createElement("p");
    status.textContent = textoStatus;
    status.style.color = corStatus;

    const remover = document.createElement("button");
    remover.textContent = "Remover";
    remover.addEventListener("click", function () {
      removerEvento(evento.id);
    });

    card.appendChild(categoria);
    card.appendChild(nome);
    card.appendChild(data);
    card.appendChild(horario);
    card.appendChild(local);
    card.appendChild(status);
    card.appendChild(remover);

    lista.appendChild(card);
  }
}

function removerEvento(id) {
  let indice = -1;

  for (let i = 0; i < eventos.length; i++) {
    if (eventos[i].id === id) {
      indice = i;
      break;
    }
  }

  if (indice !== -1) {
    eventos.splice(indice, 1);
    totalEvents -= 1;
    carregarEventos(eventos);
    calcularEstatisticas();
  }
}

carregarEventos(eventos);

function adicionarEvento() {
  const nomeDoEvento = document.getElementById("nameEvent").value;
  const dataDoEvento = document.getElementById("dateEvent").value;
  const horaInicioDoEvento = Number(document.getElementById("startTimeEvent").value);
  const horaFimDoEvento = Number(document.getElementById("endTimeEvent").value);
  const localDoEvento = document.getElementById("locationEvent").value;
  const categoriaDoEvento = document.getElementById("category").value;

  const idDoEvento = eventos.length + 1;

  const alertaFormulario = document.getElementById("alertFormEvent");

  if (!nomeDoEvento) {
    alertaFormulario.textContent = "O nome do evento é obrigatório!";
    return;
  }

  if (!dataDoEvento) {
    alertaFormulario.textContent = "Escolha uma data para o evento!";
    return;
  }

  if (!horaInicioDoEvento || !horaFimDoEvento) {
    alertaFormulario.textContent = "Escolha os horários do evento!";
    return;
  }

  if (horaInicioDoEvento >= horaFimDoEvento) {
    alertaFormulario.textContent = "O horário de término tem que ser maior que o de início!";
    return;
  }

  if (!categoriaDoEvento) {
    alertaFormulario.textContent = "Escolha uma categoria para o evento!";
    return;
  }

  alertaFormulario.textContent = "";

  const ano = Number(dataDoEvento.slice(0, 4));
  const mes = Number(dataDoEvento.slice(5, 7)) - 1;
  const dia = Number(dataDoEvento.slice(8, 10));

  eventos.push({
    id: idDoEvento,
    nome: nomeDoEvento,
    data: new Date(ano, mes, dia),
    horaInicio: horaInicioDoEvento,
    horaFim: horaFimDoEvento,
    local: localDoEvento,
    categoria: categoriaDoEvento,
  });

  totalEvents += 1;

  carregarEventos(eventos);
  calcularEstatisticas();
}

document.getElementById('btn-add-event').addEventListener('click', () => {
  adicionarEvento();
});

// Fonte de Aprendizagem: Livro (Entendendo Algoritmos)
function ordenarValores(lista) {
  if (lista.length <= 1) {
    return lista;
  }

  let pivo = lista[0];

  let menores = [];

  for (var i in lista) {
    const valor = lista[i];

    if (valor < pivo) {
      menores.push(valor);
    }
  }

  let maiores = [];

  for (var i in lista) {
    const valor = lista[i];

    if (valor > pivo) {
      maiores.push(valor);
    }
  }

  return ordenarValores(menores).concat([pivo], ordenarValores(maiores));
}

function ordenarEventosPorCategoria(eventos, categoria) {
  let eventosFiltrados = [];

  for (var i in eventos) {
    let evento = eventos[i];

    if (evento.categoria === categoria || categoria === 'todos') {
      eventosFiltrados.push(evento);
    }
  }
  
  carregarEventos(eventosFiltrados);
}

function transformarDataEmSegundos(data) {
  let ano = data.getFullYear();
  let mes = data.getMonth();
  let dia = data.getDate();
  
  const SEG_POR_DIA = 24 * 60 * 60;
  const SEG_POR_MES = SEG_POR_DIA * 30;
  const SEG_POR_ANO = SEG_POR_DIA * 365;

  return ano * SEG_POR_ANO +
    mes * SEG_POR_MES +
    dia * SEG_POR_DIA;
}

function ordenarEventosPorData(lista) {
  if (lista.length <= 1) {
    return lista;
  }

  let idx_pivo = 0;
  let data = lista[idx_pivo].data;
  let pivo = transformarDataEmSegundos(data);

  let menores = [];

  for (var i in lista) {
    const valor = transformarDataEmSegundos(lista[i].data);

    if (valor < pivo) {
      menores.push(lista[i]);
    }
  }

  let maiores = [];

  for (var i in lista) {
    const valor = transformarDataEmSegundos(lista[i].data);

    if (valor > pivo) {
      maiores.push(lista[i]);
    }
  }

  return ordenarEventosPorData(menores).concat([lista[idx_pivo]], ordenarEventosPorData(maiores));
}

document.getElementById("btn-ordenar-por-data").addEventListener('click', () => {
  const eventosOrdenados = ordenarEventosPorData(eventos);

  carregarEventos(eventosOrdenados);
});

function pesquisarEventos(pesquisa, eventos) {
  let eventosFiltrados = [];

  for (let i = 0; i < eventos.length; i++) {
    let evento = eventos[i];

    if (evento.nome.toLowerCase().includes(pesquisa.toLowerCase())) {
      eventosFiltrados.push(evento);
    }
  }

  carregarEventos(eventosFiltrados);
}

document.getElementById("search").addEventListener('input', (e) => {
  pesquisarEventos(e.target.value, eventos);
});

function calcularEstatisticas() {
  var i;

  var totalHoras = 0;
  for (i = 0; i < eventos.length; i++) {
    totalHoras = totalHoras + (eventos[i].horaFim - eventos[i].horaInicio);
  }
  document.getElementById("stat-total-horas").textContent = totalHoras.toFixed(0) + "h";

  var hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  var MS_POR_DIA = 1000 * 60 * 60 * 24;

  var menorDiff = -1;
  var eventoMaisProximo = null;

  for (i = 0; i < eventos.length; i++) {
    var alvo = new Date(eventos[i].data);
    alvo.setHours(0, 0, 0, 0);
    var diff = Math.ceil((alvo - hoje) / MS_POR_DIA);

    if (diff >= 0) {
      if (eventoMaisProximo === null) {
        menorDiff = diff;
        eventoMaisProximo = eventos[i];
      } else {
        var novoMin = Math.min(menorDiff, diff);
        if (novoMin < menorDiff) {
          menorDiff = novoMin;
          eventoMaisProximo = eventos[i];
        }
      }
    }
  }

  var textoProximo = "Nenhum evento futuro";
  if (eventoMaisProximo !== null) {
    textoProximo = eventoMaisProximo.nome + " (" + menorDiff + " dias)";
  }
  document.getElementById("stat-evento-proximo").textContent = textoProximo;

  var contCategoria = [0, 0, 0, 0];

  for (i = 0; i < eventos.length; i++) {
    if (eventos[i].categoria === 'academico')  { contCategoria[0]++; }
    if (eventos[i].categoria === 'cultural')   { contCategoria[1]++; }
    if (eventos[i].categoria === 'esporte')    { contCategoria[2]++; }
    if (eventos[i].categoria === 'visita')     { contCategoria[3]++; }
  }

  document.getElementById("stat-categorias").textContent =
    "Academico: " + contCategoria[0] +
    " | Cultural: " + contCategoria[1] +
    " | Esporte: " + contCategoria[2] +
    " | Visita: " + contCategoria[3];

  var contDias = [0, 0, 0, 0, 0, 0, 0];
  for (i = 0; i < eventos.length; i++) {
    var diaSemana = eventos[i].data.getDay();
    contDias[diaSemana]++;
  }

  var nomesDias = ["Domingo", "Segunda-feira", "Terca-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sabado"];
  var maiorQtdDia = 0;
  var indiceMaiorDia = 0;

  for (i = 0; i < contDias.length; i++) {
    if (contDias[i] > maiorQtdDia) {
      maiorQtdDia = contDias[i];
      indiceMaiorDia = i;
    }
  }

  document.getElementById("stat-dia-semana").textContent = nomesDias[indiceMaiorDia];

  var contMeses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (i = 0; i < eventos.length; i++) {
    var mes = eventos[i].data.getMonth();
    contMeses[mes]++;
  }

  var nomesMeses = ["Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho",
                    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  var maiorQtdMes = 0;
  var indiceMaiorMes = 0;
  for (i = 0; i < contMeses.length; i++) {
    if (contMeses[i] > maiorQtdMes) {
      maiorQtdMes = contMeses[i];
      indiceMaiorMes = i;
    }
  }
  document.getElementById("stat-mes").textContent = nomesMeses[indiceMaiorMes];
}

calcularEstatisticas();