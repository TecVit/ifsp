PRAGMA foreign_keys = ON;
.headers on
.mode box

-- (1)
SELECT NOME, SALARIO, SALARIO + SALARIO * 0.05 AS SALARIO_REAJUSTADO
FROM FUNCIONARIO;

/*
┌─────────────────────┬─────────┬────────────────────┐
│        NOME         │ SALARIO │ SALARIO_REAJUSTADO │
├─────────────────────┼─────────┼────────────────────┤
│ Roberto Santos      │ 4500    │ 4725.0             │
│ Carlos Silva        │ 5000    │ 5250.0             │
│ Maria Alves         │ 4000    │ 4200.0             │
│ Ana Lima            │ 5500    │ 5775.0             │
│ Bruno Costa         │ 6200    │ 6510.0             │
| ................... | ....... | .................. |
└─────────────────────┴─────────┴────────────────────┘
*/

-- (2)
SELECT NOME, SALARIO FROM FUNCIONARIO
WHERE SALARIO BETWEEN 4000 AND 6000
ORDER BY SALARIO ASC;

/*
┌───────────────────┬─────────┐
│       NOME        │ SALARIO │
├───────────────────┼─────────┤
│ Maria Alves       │ 4000    │
│ Mariana Santos    │ 4100    │
│ Isabela Castro    │ 4200    │
│ Tatiana Almeida   │ 4300    │
│ Carlos Monteiro   │ 4400    │
| ................. | ....... |
└───────────────────┴─────────┘
*/

-- (3)
SELECT CPF FROM TRABALHA_EM
WHERE HORAS > 10 AND PROJNUMERO IN (1, 2, 3);

/*
┌─────────────┐
│     CPF     │
├─────────────┤
│ 10000000001 │
│ 10000000002 │
│ 10000000007 │
└─────────────┘
*/

-- (4)
SELECT DISTINCT PROJLOCAL FROM PROJETO;

/*
┌────────────────┐
│   PROJLOCAL    │
├────────────────┤
│ Sao Paulo      │
│ Rio de Janeiro │
│ Campinas       │
│ Fortaleza      │
│ Brasilia       │
│ Curitiba       │
│ Porto Alegre   │
│ Belo Horizonte │
│ Recife         │
│ Santos         │
└────────────────┘
*/

-- (5)
SELECT NOME, DATA_NASC FROM FUNCIONARIO
WHERE NOME LIKE 'A%';

/*
┌──────────────┬────────────┐
│     NOME     │ DATA_NASC  │
├──────────────┼────────────┤
│ Ana Lima     │ 1985-03-10 │
│ Adriano Melo │ 1983-03-29 │
└──────────────┴────────────┘
*/
