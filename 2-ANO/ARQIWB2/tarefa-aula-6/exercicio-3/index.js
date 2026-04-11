function adicionarItemNaLista() {
  // gambiarra :)
  const ulElements = document.getElementsByTagName("ul");
  let ulHTML = ulElements[0].innerHTML;
  
  ulHTML += `<li class="itens">Item 4</li>`;

  ulElements[0].innerHTML = ulHTML;

  // melhor prática (não curto muito)
  const ulElement = ulElements[0];
  let li = document.createElement("li");

  li.classList.add("itens");
  li.textContent = "Item 5";

  ulElement.appendChild(li);
};

adicionarItemNaLista();