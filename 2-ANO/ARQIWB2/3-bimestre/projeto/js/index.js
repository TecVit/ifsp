let jogos = JSON.parse(localStorage.getItem('jogos')) || [];
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function cadastrarJogo() {
    let nome = document.getElementById('nome').value;
    let preco = document.getElementById('preco').value;
    let estoque = document.getElementById('estoque').value;

    let jogo = {
        nome,
        preco,
        estoque,
    };

    jogos.push(jogo);

    localStorage.setItem('jogos', JSON.stringify(jogos));

    document.getElementById('nome').value = "";
    document.getElementById('preco').value = "";
    document.getElementById('estoque').value = "";

    alert("Jogo cadastrado com sucesso!");

    carregarJogos();
}

function comprarJogo(jogo) {
    carrinho.push(jogo);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    alert("Jogo comprado com sucesso!");

    carregarJogos();
}

function carregarJogos() {
    let listaJogosHTML = "";

    for (var jogo of jogos) {
        let linhaHTML = `
            <tr>
                <td>${jogo.nome}</td>
                <td>${jogo.preco}</td>
                <td>${jogo.estoque}</td>
                <td><button onclick="comprarJogo(${jogo})" class="buy">Comprar</button></td>
            </tr>
        `
        
        listaJogosHTML += linhaHTML;
    }

    document.getElementById("listaDeJogos").innerHTML = listaJogosHTML;
}

carregarJogos();