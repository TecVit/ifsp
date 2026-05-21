function gerenciarTarefas() {
  let tarefas = ["Estudar JavaScript", "Fazer exercícios", "Ler documentação"];

  tarefas.unshift("Resolver bug crítico");

  const tarefaConcluida = tarefas.pop();

  const tarefasExtras = ["Revisar código", "Organizar arquivos"];
  tarefas = tarefas.concat(tarefasExtras);

  let tarefaMaisUrgente = tarefas.at(0);
  console.log("Tarefa mais urgente:", tarefaMaisUrgente);

  console.log("Total de tarefas pendentes:", tarefas.length);
  console.log("Tarefa concluída:", tarefaConcluida);

  let listaFormatada = tarefas
    .map((tarefa, index) => `${index + 1}. ${tarefa}`)
    .join("\n");

  console.log("Lista de tarefas:\n" + listaFormatada);
};

gerenciarTarefas();