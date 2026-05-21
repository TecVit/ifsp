function principal() {
  const fila = ['Maria', 'João', 'Carla'];

  fila.unshift('Pedro');
  fila.shift();
  fila.push('Lucas');
  fila.push('Beatriz');

  console.log(`Estão ${fila.length} pessoas aguardando na fila, o último paciente é a(o) ${fila.at(-1)}.`);
  console.log(`Fila: ${fila.join(' → ')}`)
};

principal();