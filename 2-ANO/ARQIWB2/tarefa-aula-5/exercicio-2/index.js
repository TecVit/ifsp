function trocarTitulo() {
  const h1Elements = document.getElementsByTagName("h1");

  h1Elements[0].innerText = "Novo Título";
  
  console.log(`Título alterado com sucesso`);
};

trocarTitulo();