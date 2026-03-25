function main() {
    let celsius = parseFloat(prompt("Digite o grau: "));
    let fahrenheit = CelsiusToFahrenheit(celsius);

    alert(`${celsius}°C representa ${fahrenheit}°F`);
}

function CelsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}