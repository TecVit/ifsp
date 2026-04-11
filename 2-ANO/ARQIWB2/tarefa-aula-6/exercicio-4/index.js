function adicionarNovoParagrafo() {
  const pElement = document.getElementsByTagName("p")[0];

  let newP = document.createElement("p");
  newP.textContent = "Este parágrafo foi criado dinamicamente.";

  pElement.insertAdjacentElement("afterend", newP);
  
  console.log("<p> adicionado com sucesso");
};

function removerUltimoItemDaLista() {
  const ulElements = document.getElementsByTagName("ul");
  const liElements = ulElements[0].children;

  const liLastElement = liElements[liElements.length - 1];

  liLastElement.remove();

  console.log("ultimo <li> removido com sucesso");
}

adicionarNovoParagrafo();
removerUltimoItemDaLista();