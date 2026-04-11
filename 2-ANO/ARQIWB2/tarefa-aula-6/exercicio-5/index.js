function alterarCorDoTitulo() {
  const titulos = document.getElementsByTagName("h1");
  let titulo = titulos[0];

  titulo.style.color = "red";

  console.log("Cor do título alterado com sucesso!");
};

function esconderPrimeiroParagrafo() {
  const paragrafos = document.getElementsByTagName("p");
  const primeiroParagrafo = paragrafos[0];

  primeiroParagrafo.style.display = "none";

  console.log("Primeiro parágrafo escondido com sucesso");
}

alterarCorDoTitulo();
esconderPrimeiroParagrafo();