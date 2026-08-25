PRAGMA foreign_keys = ON;

-- Parte 1

-- (1) Rodou
INSERT INTO Categoria (Codigo, Nome_Categoria, Valor_Diaria_Base) 
VALUES (1, 'Hatch Econômico', 90.00);

-- (2) Rodou
INSERT INTO Categoria (Codigo, Nome_Categoria, Valor_Diaria_Base) 
VALUES (2, 'Sedan Conforto', 130.00);

-- (3) Rodou
INSERT INTO Categoria (Codigo, Nome_Categoria, Valor_Diaria_Base) 
VALUES (3, 'SUV Premium', 250.00);

-- (4) Rodou
INSERT INTO Agencia (CNPJ, Nome_Fantasia, Cidade) 
VALUES ('11111111111111', 'LocaCar Sul', 'Curitiba');

-- (5) Rodou
INSERT INTO Agencia (CNPJ, Nome_Fantasia, Cidade) 
VALUES ('22222222222222', 'LocaCar Norte', 'Manaus');

-- (6) Rodou
INSERT INTO Agencia (CNPJ, Nome_Fantasia, Cidade) 
VALUES ('33333333333333', 'LocaCar Leste', 'Recife');

-- (7) Rodou
INSERT INTO Cliente (CPF, Nome, Endereco, Cidade, Telefone) 
VALUES ('11111111111', 'Ana Silva', 'Rua A', 'São Paulo', '11999990001');

-- (8) Rodou
INSERT INTO Cliente (CPF, Nome, Endereco, Cidade, Telefone) 
VALUES ('22222222222', 'Bruno Costa', 'Rua B', 'Rio de Janeiro', '21999990002');

-- (9) Rodou
INSERT INTO Cliente (CPF, Nome, Endereco, Cidade, Telefone) 
VALUES ('33333333333', 'Carlos Lima', 'Rua C', 'Belo Horizonte', '31999990003');

-- (10) Rodou
INSERT INTO Cliente (CPF, Nome, Endereco, Cidade, Telefone) 
VALUES ('44444444444', 'Daniela Paz', 'Rua D', 'Salvador', '71999990004');

-- (11) Não Rodou
-- Error: Runtime error: UNIQUE constraint failed: Cliente.CPF (19)
-- Traduzido: Erro de violação de chave única do campo CPF da tabela Cliente
INSERT INTO Cliente (CPF, Nome, Endereco, Cidade, Telefone) 
VALUES ('11111111111', 'Ana Maria', 'Avenida X', 'Campinas', '19888887777');

-- (12) Rodou
INSERT INTO Acessorio (ID_Acessorio, Descricao, Taxa_Adicional) 
VALUES (1, 'Navegador GPS', 15.00);

-- (13) Rodou
INSERT INTO Acessorio (ID_Acessorio, Descricao, Taxa_Adicional) 
VALUES (2, 'Cadeira de Bebê', 25.00);

-- (14) Rodou
INSERT INTO Acessorio (ID_Acessorio, Descricao, Taxa_Adicional) 
VALUES (3, 'Rack de Teto', 30.00);

-- (15) Rodou
INSERT INTO Veiculo (Placa, Chassi, Ano_Fabricacao, Quilometragem, Codigo_Categoria, CNPJ_Agencia) 
VALUES ('AAA1111', 'CHASSI12345678901', 2020, 45000, 1, '1111111111111');

-- (16) Rodou
INSERT INTO Veiculo (Placa, Chassi, Ano_Fabricacao, Quilometragem, Codigo_Categoria, CNPJ_Agencia) 
VALUES ('BBB2222', 'CHASSI12345678902', 2022, 15000, 2, '22222222222222');

-- (17) Rodou
INSERT INTO Veiculo (Placa, Chassi, Ano_Fabricacao, Quilometragem, Codigo_Categoria, CNPJ_Agencia) 
VALUES ('CCC3333', 'CHASSI12345678903', 2023, 5000, 3, '33333333333333');

-- (18) Não Rodou
-- Error: Runtime error: FOREIGN KEY constraint failed (19)
-- Traduzido: Até o momento não existe nenhuma linha na tabela
-- Categoria com o Codigo = '99', então não é possível
-- alterar uma chave estrangeira que faz referencia a uma linha
-- que não existe. Erro de violação da chave estrangeira!
INSERT INTO Veiculo (Placa, Chassi, Ano_Fabricacao, Quilometragem, Codigo_Categoria, CNPJ_Agencia) 
VALUES ('DDD4444', 'CHASSI12345678904', 2023, 0, 99, '11111111111111');

-- (19) Rodou
INSERT INTO Veiculo_Acessorio (Placa_Veiculo, ID_Acessorio) 
VALUES ('AAA1111', 1);

-- (20) Rodou
INSERT INTO Veiculo_Acessorio (Placa_Veiculo, ID_Acessorio) 
VALUES ('BBB2222', 2);

-- (21) Rodou
INSERT INTO Locacao (CPF_Cliente, Placa_Veiculo, Data_Retirada, Data_Devolucao, Valor_Total) 
VALUES ('11111111111', 'AAA1111', '2023-10-01', '2023-10-05', 450.00);

-- (22) Rodou
INSERT INTO Locacao (CPF_Cliente, Placa_Veiculo, Data_Retirada, Data_Devolucao, Valor_Total) 
VALUES ('22222222222', 'BBB2222', '2023-10-10', '2023-10-12', 260.00);

-- Parte 2

-- (23) Rodou
UPDATE Cliente SET Telefone = '31888888888'
WHERE CPF = '33333333333';

-- (24) Rodou
UPDATE Categoria SET Valor_Diaria_Base = 145.00
WHERE Codigo = '2';

-- (25) Rodou
UPDATE Agencia SET Nome_Fantasia = 'LocaCar Leste VIP'
WHERE CNPJ = '33333333333333';

-- (26) Não Rodou
-- Error: Runtime error: FOREIGN KEY constraint failed (19)
-- Traduzido: Até o momento não existe nenhuma linha na tabela
-- Agencia com o CNPJ = '99999999999999', então não é possível
-- alterar uma chave estrangeira que faz referencia a uma linha
-- que não existe. Erro de violação da chave estrangeira!
UPDATE Veiculo SET CNPJ_Agencia = '99999999999999'
WHERE Placa = 'AAA1111';

-- (27) Não Rodou
-- Error: stepping, UNIQUE constraint failed: Acessorio.ID_Acessorio (19)
-- Traduzido: o ID_Acessorio = 2 (linha '2|Cadeira de Bebê|25') já existe na tabela,
-- e essa coluna não permite valores duplicados, pois ID_Acessorio é uma chave única.
UPDATE Acessorio SET ID_Acessorio = '1'
WHERE ID_Acessorio = '2';

-- Parte 3

-- (28) Rodou
DELETE FROM Locacao
WHERE CPF_Cliente = '22222222222' AND Placa_Veiculo = 'BBB2222';

-- (29) Rodou
DELETE FROM Cliente
WHERE CPF = '44444444444';

-- (30) Rodou
DELETE FROM Acessorio
WHERE ID_Acessorio = 3;

-- (31) Não Rodou
-- Error: stepping, FOREIGN KEY constraint failed (19)
-- Traduzido: existem veículos na tabela Veiculo que referenciam essa Categoria
-- de Codigo = 1, então o banco impede a exclusão para não deixar referências
-- órfãs (integridade referencial).
DELETE FROM Categoria
WHERE Codigo = 1;

-- (32) Não Rodou
-- Error: stepping, FOREIGN KEY constraint failed (19)
-- traduzido: esse veículo possui locações associadas na tabela Locacao,
-- então não pode ser apagado enquanto essas referências existirem.
DELETE FROM Veiculo
WHERE Placa = 'AAA1111';
