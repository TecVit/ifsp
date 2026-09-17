function cadastrarJogo() {
    let jogos = JSON.parse(localStorage.getItem('jogos')) || [];

    let nome = document.getElementById('nome').value;
    let preco = Number(document.getElementById('preco').value);
    let estoque = Number(document.getElementById('estoque').value);

    let jogoJaExiste = jogos.find(jogo => jogo.nome == nome);

    if (jogoJaExiste) {
        alertar("erro", "Escolha um nome diferente de um jogo já disponível!")
        return;
    }

    if (!nome || !preco || !estoque) {
        alertar("erro", "Complete o formulário corretamente!");
        return;
    }

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

    alertar("sucesso", "Jogo cadastrado com sucesso!");

    carregarJogos();
}

function comprarJogo(i) {
    let jogos = JSON.parse(localStorage.getItem('jogos')) || [];
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    let jogo = jogos[i];
    
    if (jogo.estoque < 1) {
        alertar("erro", "Não temos mais esse jogo disponível no estoque!");
        return;
    };

    let jogoCarrinho = {
        nome: jogo.nome,
        preco: jogo.preco,
        quantidade: 1,
    };

    let jogoCarrinhoExistente = carrinho.find(obj => obj.nome === jogo.nome);

    if (jogoCarrinhoExistente) {
        jogoCarrinho = jogoCarrinhoExistente;
        jogoCarrinho.quantidade += 1;
    } else {
        carrinho.push(jogoCarrinho);
    }


    jogos[i].estoque -= 1;

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    localStorage.setItem('jogos', JSON.stringify(jogos));

    alertar("sucesso", "Jogo comprado com sucesso!");
    
    carregarJogos();
    carregarCarrinho();
}

function removerDoCarrinho(i) {
    let jogos = JSON.parse(localStorage.getItem('jogos')) || [];
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    let indexJogoCarrinho = jogos.findIndex(obj => obj.nome === carrinho[i].nome);
    let nomeDoJogo = jogos[indexJogoCarrinho].nome;

    let jogoCarrinho = carrinho[i];

    if (jogoCarrinho.quantidade > 1) {
        carrinho[i].quantidade -= 1;
    } else {
        let novoCarrinho = carrinho.filter(obj => obj != carrinho[i]);
        
        carrinho = novoCarrinho;
    }

    jogos[indexJogoCarrinho].estoque += 1;

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    localStorage.setItem('jogos', JSON.stringify(jogos));
    
    alertar("sucesso", `Jogo "${nomeDoJogo}" removido com sucesso!`);
    
    carregarJogos();
    carregarCarrinho();
}

function carregarJogos() {
    let jogos = JSON.parse(localStorage.getItem('jogos')) || [];
    
    let listaJogosHTML = "";

    for (var i = 0; i < jogos.length; i++) {
        let jogo = jogos[i];

        let linhaHTML = `
            <tr>
                <td>${jogo.nome}</td>
                <td>R$ ${jogo.preco.toFixed(2)}</td>
                <td>${jogo.estoque}</td>
                <td><button onclick="comprarJogo(${i})" class="buy">Comprar</button></td>
            </tr>
        `
        
        listaJogosHTML += linhaHTML;
    }

    if (jogos.length === 0) {
        listaJogosHTML = "<tr> <td> Nenhum jogo cadastrado ainda! </td> </tr>"
    }

    document.getElementById("listaDeJogos").innerHTML = listaJogosHTML;
}

function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    let listaCarrinhoHTML = "";

    let totalAPagar = 0;

    for (var i = 0; i < carrinho.length; i++) {
        let jogo = carrinho[i];

        totalAPagar += jogo.preco * jogo.quantidade;

        let linhaHTML = `
            <tr>
                <td>${jogo.nome}</td>
                <td>${jogo.quantidade}</td>
                <td>R$ ${jogo.preco.toFixed(2)}</td>
                <td><button onclick="removerDoCarrinho(${i})" class="remove">Remover</button></td>
            </tr>
        `
        
        listaCarrinhoHTML += linhaHTML;
    }

    if (carrinho.length === 0) {
        listaCarrinhoHTML = "<tr> <td> Nenhum jogo no carrinho! </td> </tr>"
    } else {
        listaCarrinhoHTML += `<tr> <th> Total a Pagar: R$ ${totalAPagar.toFixed(2)} </th> </tr>`
    }

    document.getElementById("listaDoCarrinho").innerHTML = listaCarrinhoHTML;
}

carregarJogos();
carregarCarrinho();