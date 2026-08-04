CREATE TABLE Time (
  sigla CHAR(3),
  nome  VARCHAR(30) NOT NULL,
  PRIMARY KEY (sigla)
);

CREATE TABLE Partida (
  codigo       INTEGER,
  data_partida DATE NOT NULL,
  time_A       CHAR(3) NOT NULL,
  gols_A       INTEGER NOT NULL,
  time_B       CHAR(3) NOT NULL,
  gols_B       INTEGER NOT NULL,
  PRIMARY KEY (codigo),
  FOREIGN KEY (time_A) REFERENCES Time (sigla),
  FOREIGN KEY (time_B) REFERENCES Time (sigla)
);