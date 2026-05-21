function principal() {
  const cardapio = ['Pizza', 'Hambúrguer', 'Salada'];

  cardapio.push("Sushi");
  cardapio.unshift("Sopa");
  cardapio.pop();

  console.log("Itens do Cardápio: ", cardapio.join(" | "))
}

principal();