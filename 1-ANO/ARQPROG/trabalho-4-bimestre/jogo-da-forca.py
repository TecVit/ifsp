# Copyright 2025 
# Vitor Custodio da Silva
# Wendel Gabriel Dias Figueredo

import random
import time

grafico = [
    [str(x) for x in '-------'],
    [str(x) for x in '|   |  '],
    [str(x) for x in '|      '],
    [str(x) for x in '|      '],
    [str(x) for x in '|      '],
    [str(x) for x in '|      '],
    [str(x) for x in '-------'],
]

# Dificil
cabeca = (2, 4)
corpo = (3, 4)
bracoDireito = (3, 5)
pernaDireita = (4, 5)
bracoEsquerdo = (3, 3)
pernaEsquerda = (4, 3)

# Médio
sapatoEsquerdo = (5, 3)
sapatoDireito = (5, 5)

# Fácil
olhoEsquerdo = (2, 3)
olhoDireito  = (2, 5)

punicoes = [(cabeca, '0'), (corpo, '|'), (bracoDireito, '\\'), (bracoEsquerdo, '/'), (pernaDireita, '\\'), (pernaEsquerda, '/')]

# Easter Egg
perguntas_ironicas = ['Você sabe o que é uma letra?', 
                      'É só UMA Letra', 
                      'É difícil assim mesmo ou está fingindo?', 
                      'Isso aí foi uma tentativa? Porque não parece.',
                      'Se UMA letra te atrapalha, imagina o resto.']
reacoes_ironicas = ['😊', '🙂', '😐', '😠', '😡']
max_qtd_erros_ironicos = 5

def exibirBoneco(qtd_erros, letras_usadas):
    possiveis_erros = len(punicoes)
    
    if qtd_erros > 0:
        coordenadas, desenho = punicoes[qtd_erros - 1]
        x, y = coordenadas
        grafico[x][y] = desenho
    
    # Mostra o estado do boneco na forca
    print()
    for linha in grafico:
        print(*linha)

    if qtd_erros >= possiveis_erros:
        print(f'\nVocê perdeu o jogo!')
        return False

    tentativas_restantes = possiveis_erros - qtd_erros
    print(f'Tentativas restantes: {tentativas_restantes}')

    letras_usadas_str_formatada = ''
    
    for i in range(len(letras_usadas)):
        letra = letras_usadas[i]

        if (i + 1) == len(letras_usadas):
            letras_usadas_str_formatada += letra
        else:
            letras_usadas_str_formatada += letra + ', '
    
    if len(letras_usadas) > 0:
        print(f'Letras usadas:', letras_usadas_str_formatada)
    else:
        print(f'Nenhum letra usada ainda')

    return True

def verificarPalavra(palavra, palavra_certa):
    palavra_formatada = ''
    for x in palavra:
        palavra_formatada += str(x)
    
    palavra = palavra_formatada
    
    if palavra == palavra_certa:
        return True
    else:
        return False

def escolherDificuldade(tag):
    dificuldade = int(input(f'''
Escolha a dificuldade do jogo:
[1] Dificil ({len(punicoes)} Tentativas)
[2] Médio ({len(punicoes) + 2} Tentativas)
[3] Fácil ({len(punicoes) + 4} Tentativas)

{tag}: '''))
    while dificuldade < 1 or dificuldade > 3:
        dificuldade = int(input(f'{tag}: '))

    if dificuldade > 1:
        punicoes.append((sapatoEsquerdo, '⅃'))
        punicoes.append((sapatoDireito, 'L'))
    if dificuldade > 2:
        punicoes.append((olhoEsquerdo, '('))
        punicoes.append((olhoDireito, ')'))

    return True

def main():
    # Configurações do jogo
    config = {
        'tema': 'Animais',
        'palavras': [
            'Leão', 'Tigre', 'Elefante', 'Girafa', 'Zebra',
            'Hipopótamo', 'Rinoceronte', 'Lobo', 'Raposa', 'Urso',
            'Canguru', 'Coala', 'Gorila', 'Chimpanzé', 'Antílope',
            'Pinguim', 'Golfinho', 'Tubarão', 'Coruja', 'Águia', 
            'Galinha', 'Vaca', 'Cobra', 'Piranha'
        ],
    }

    # Escolhendo a palavra aleatória dentro das configurações
    index = random.randint(0, len(config['palavras']) - 1)
    palavra = config['palavras'][index].lower()
    
    # Mostrar para o jogador as informações do jogo 
    print(f'======= JOGO DA FORCA =======')
    print(f'''TEMA: {config['tema']}\n''')

    nome = str(input("Digite seu nome: "))

    tag = f"{nome}@jogador:~$"

    print(f'\nEscolha uma opção: ')
    print(f'[1] Iniciar o Jogo')
    print(f'[2] Sair o Jogo')
    
    escolha = ''
    while True:
        escolha = int(input(f"\n{tag}: "))
        if escolha == 1 or escolha == 2 or escolha == 3:
            break
    
    # Opções iniciais
    if escolha == 1:
        pass
    elif escolha == 2:
        print(f'Saindo do jogo...\n')
        time.sleep(1)
        return 0
    elif escolha == 3:
        print(f"Modo secreto ativado. Bom Jogo!")

    # Dificuldade escolhida pelo usuário
    escolherDificuldade(tag)
        
    erros = 0
    qtd_erros_ironicos = 0
    resposta = ['_'] * len(palavra)

    # Palavras tentadas
    letras_usadas = []

    while True:
        status = exibirBoneco(erros, letras_usadas)
        if not status:
            print(f'A palavra certa era {palavra}. Tente novamente!')
            break

        ganhou = verificarPalavra(resposta, palavra)
        if ganhou:
            print(f'\nParabéns, Você ganhou o jogo!!!')
            print(f'Volte sempre...\n')
            return 0

        print()
        print('Palavra:', *resposta)
        
        letra = str(input(f'Digite uma letra: ')).lower()
        while len(letra) != 1:
            qtd_erros_ironicos += 1
            print(f"{reacoes_ironicas[qtd_erros_ironicos]} {perguntas_ironicas[qtd_erros_ironicos]}")
            time.sleep(1)

            if qtd_erros_ironicos == (max_qtd_erros_ironicos - 1):
                print("\nTá difícil assistir isso. Boa sorte aí, porque eu tô fora.")
                return 0

            letra = str(input(f'\nTente novamente: ')).lower()
            
        while letra in letras_usadas:
            letra = str(input(f'Essa letra já foi digitada, tente outra: ')).lower()

        for i in range(len(palavra)):
            letra_da_palavra = palavra[i]
            if letra_da_palavra == letra:
                resposta[i] = letra

        letras_usadas.append(letra)

        if letra not in palavra:
            erros += 1

    return 0

main()
