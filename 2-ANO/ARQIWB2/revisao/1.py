'''
Elabore um programa que leia o nome de um funcionário, a quantidade de horas
trabalhadas e o valor que recebe por hora. O programa deve calcular o salário desse
funcionário com base na quantidade de horas trabalhadas e valor recebido por hora.
A seguir, mostre o nome e o salário do funcionário, com duas casas decimais.
'''

def main():
    nome = str(input("Digite seu nome: "))
    horas = int(input("Digite quantas horas você trabalha por dia: "))
    preco_hora = int(input("Digite quanto você ganha por hora: "))

    salario = preco_hora * (horas * 30)

    print(f"O funcionário {nome} ganha R${salario:.2f} por mês")

    return 0

main()