function main() {
    let number = parseFloat(prompt("Digite um número: "));

    let isOdd = verifyOdd(number);

    if (isOdd) {
        alert(`O número é ímpar`);
    } else {
        alert(`O número é par`);
    }
}

function verifyOdd(number) {
    if (number % 2 == 0) {
        return false;
    } else {
        return true;
    }
}