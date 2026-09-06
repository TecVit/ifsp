PRAGMA foreign_keys = ON;
.headers on
.mode box

-- (1)
SELECT CPF, NOME, SALARIO, DATA_NASC
FROM funcionario ORDER BY SALARIO DESC;

/*
┌─────────────┬─────────────────────┬─────────┬────────────┐
│     CPF     │        NOME         │ SALARIO │ DATA_NASC  │
├─────────────┼─────────────────────┼─────────┼────────────┤
│ 10000000010 │ Jorge Oliveira      │ 9000    │ 1975-02-28 │
│ 10000000007 │ Gabriela Nunes      │ 8000    │ 1983-06-02 │
│ 10000000027 │ Beatriz Lopes       │ 7800    │ 1976-12-04 │
│ 10000000004 │ Diego Rocha         │ 7500    │ 1978-04-18 │
│ 10000000016 │ Paulo Cardoso       │ 7200    │ 1977-09-14 │
| ........... | ................... | ....... | .......... |
└─────────────┴─────────────────────┴─────────┴────────────┘
*/

-- (2)
SELECT DNUMERO FROM DEPTO_LOCAL 
WHERE NOME_LOCAL = 'Sao Paulo';

/*
┌─────────┐
│ DNUMERO │
├─────────┤
│ 1       │
│ 2       │
│ 6       │
│ 14      │
│ 24      │
| ....... |
└─────────┘
*/

-- (3)
SELECT PROJNOME, PROJLOCAL FROM PROJETO 
WHERE DNUMERO != 6;

/*
┌───────────────────┬────────────────┐
│     PROJNOME      │   PROJLOCAL    │
├───────────────────┼────────────────┤
│ Sistema ERP       │ Sao Paulo      │
│ App Mobile        │ Rio de Janeiro │
│ BI Dashboard      │ Sao Paulo      │
│ Automacao RH      │ Campinas       │
│ Infraestrutura    │ Sao Paulo      │
| ................. | .............. |
└───────────────────┴────────────────┘
*/

-- (4)
SELECT NOME, SALARIO FROM FUNCIONARIO 
WHERE SALARIO > 5000;

/*
┌─────────────────────┬─────────┐
│        NOME         │ SALARIO │
├─────────────────────┼─────────┤
│ Ana Lima            │ 5500    │
│ Bruno Costa         │ 6200    │
│ Diego Rocha         │ 7500    │
│ Gabriela Nunes      │ 8000    │
│ Henrique Gomes      │ 5300    │
| ................... | ....... |
└─────────────────────┴─────────┘
*/

-- (5)
SELECT PROJNUMERO, HORAS FROM TRABALHA_EM
WHERE CPF = '10000000020';

/*
┌────────────┬───────┐
│ PROJNUMERO │ HORAS │
├────────────┼───────┤
│ 14         │ 28    │
└────────────┴───────┘
*/