function calcularIMC(peso, altura) {
    return (peso / (altura * altura));
}

function principal() {
    let peso = parseFloat(prompt("Digite o peso: "));
    let altura = parseFloat(prompt(`Digite a altura (Use "." em vez de ","): `));
    
    let imc = parseFloat(calcularIMC(peso, altura)).toFixed(2);
    alert(`Seu IMC é: ${imc}`);
}