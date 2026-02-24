'''
Elabore um programa para ler a idade de uma pessoa e informar sua classe eleitoral,
que pode ser:
- Não eleitor (jovens abaixo de 16 anos);
- Eleitor obrigatório (adultos entre 18 e 69 anos);
- Eleitor facultativo (jovens de 16 e 17 anos ou idosos de 70 anos ou mais)
'''

def main():
    idade = int(input("Digite sua idade: "))

    classe_eleitoral = "Não eleitor"

    if idade >= 18 and idade < 70:
        classe_eleitoral = "Eleitor obrigatório"
    elif idade >= 70 or (idade >= 16 and idade <= 17):
        classe_eleitoral = "Eleitor facultativo"

    print(f"Sua classe eleitoral é: {classe_eleitoral}")

    return 0

main()