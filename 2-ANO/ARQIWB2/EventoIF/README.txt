README.txt — Diário de Desenvolvimento

==================================================
1. INTEGRANTES
==================================================
Nome: Vitor C. da Silva           Pront: AQ3037461
Nome: Wendel G. D. Figueredo      Pront: AQ3035964

==================================================
2. DIVISÃO DE TAREFAS
==================================================
[Vitor]:
  - Implementação das lógicas matemáticas e de contagem em JavaScript
  - Cálculo do total de horas programadas de todos os eventos
  - Identificação do evento mais próximo (menor diferença positiva em dias)
  - Distribuição de eventos por categoria (contagem por tipo)
  - Identificação do dia da semana e do mês com mais eventos
  - Implementação do algoritmo QuickSort para ordenação dos eventos por data
    (baseado no livro "Entendendo Algoritmos")
  - Conversão de datas para segundos para viabilizar a comparação no QuickSort
  - Lógica de validação do formulário de adição de eventos
  - Lógica de adição e remoção de eventos da lista
  - Cálculo de dias restantes para cada evento e definição do status (encerrado,
    hoje, esta semana, futuro)
  - Implementação da busca de eventos por nome

[Wendel]:
  - Atualizações dinâmicas do HTML via JavaScript
  - Renderização dos cards de evento na tela (nome, data, horário, local,
    categoria, status e botão de remover)
  - Geração dinâmica dos botões de filtro por categoria
  - Preenchimento dinâmico do select de categorias no formulário
  - Controle visual do filtro ativo (classe CSS "ativo")
  - Formatação da data para exibição no padrão DD/MM/AAAA
  - Filtragem dos eventos exibidos por categoria selecionada

(Tarefas em conjunto:)
  - Definição da estrutura dos dados dos eventos (dados.js)
  - Integração entre os cálculos do backend JS e a atualização visual da tela
  - Criação dos dados iniciais de exemplo (8 eventos pré-cadastrados)

==================================================
3. DIFICULDADES ENCONTRADAS
==================================================
Dificuldade 1:
  Problema: O QuickSort trabalha comparando valores numéricos simples, mas os
  eventos possuem datas no formato Date do JavaScript, que não podem ser
  comparadas diretamente com < e > de forma confiável no contexto do algoritmo.
  Solução: Criamos a função "transformarDataEmSegundos" que converte cada data
  em um número inteiro (somando ano × segundos/ano + mês × segundos/mês +
  dia × segundos/dia), permitindo que o QuickSort compare as datas normalmente
  como números.

Dificuldade 2:
  Problema: Ao filtrar por categoria ou ordenar por data, a lista exibida na
  tela ficava dessincronizada com o estado real do array de eventos, fazendo com
  que a contagem ("Exibindo X de Y eventos") e as estatísticas mostrassem
  valores incorretos após operações combinadas.
  Solução: Separamos claramente os conceitos de "lista exibida" e "lista real":
  as funções de filtro e ordenação geram uma lista temporária que é passada
  para "carregarEventos", enquanto o array original "eventos" é preservado
  para os cálculos de estatísticas, que sempre operam sobre o conjunto completo.
