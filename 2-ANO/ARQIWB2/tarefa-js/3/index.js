function main() {
    let width = prompt("Digite a base: ");
    let height = prompt("Digite a altura: ");

    let area = calculateArea(width, height);

    alert(`A área é ${area} cm²`)
}

function calculateArea(width, height) {
    let area = width * height;
    
    return area;
}