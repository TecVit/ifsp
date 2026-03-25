function main() {
    let nota1 = parseFloat(prompt("Digite a primeira nota: "));
    let nota2 = parseFloat(prompt("Digite a segunda nota: "));
    let nota3 = parseFloat(prompt("Digite a terceira nota: "));

    let media = calculaMedia(nota1, nota2, nota3);

    if (media >= 6) {
        alert(`Aluno aprovado com média "${media}"`);
    } else {
        alert(`Aluno reprovado com média "${media}"`)
    }
}

function calculaMedia(nota1, nota2, nota3) {
    return parseFloat((nota1 + nota2 + nota3) / 3).toFixed()
}