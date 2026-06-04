function coletarValores() {
  const h1Elements = document.getElementsByTagName("h1");
  const pElements = document.getElementsByTagName("p");
  const ulElements = document.getElementsByTagName("ul");
  const liElements = ulElements[0].children;

  let h1Value = h1Elements[0].innerText;
  let pValue = pElements[0].innerText;
  let liValues = [];

  for (var i = 0; i < liElements.length; i++) {
    let liElement = liElements[i];

    if (liElement.className === "itens") {
      liValues.push(liElements[i].innerText);
    }
  }

  console.log(`Valor do <h1>: ${h1Value}`);
  console.log(`Valor do <p>: ${pValue}`);
  console.log(`Valores dos <li> com classe "itens": ${liValues}`);
};

coletarValores();