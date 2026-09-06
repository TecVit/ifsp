from flask import Flask, render_template, request

lista_filmes = [
  {
    "titulo": "O Poderoso Chefão",
    "diretor": "Francis Ford Coppola",
    "genero": "Ação",
    "ano": "1972"
  },
  {
    "titulo": "Pulp Fiction: Tempo de Violência",
    "diretor": "Quentin Tarantino",
    "genero": "Ação",
    "ano": "1994"
  },
  {
    "titulo": "A Origem",
    "diretor": "Christopher Nolan",
    "genero": "Ficção Científica",
    "ano": "2010"
  },
  {
    "titulo": "Interestelar",
    "diretor": "Christopher Nolan",
    "genero": "Ficção Científica",
    "ano": "2014"
  },
  {
    "titulo": "Clube da Luta",
    "diretor": "David Fincher",
    "genero": "Drama",
    "ano": "1999"
  },
  {
    "titulo": "Matrix",
    "diretor": "Lana Wachowski, Lilly Wachowski",
    "genero": "Ficção Científica",
    "ano": "1999"
  },
  {
    "titulo": "Cidade de Deus",
    "diretor": "Fernando Meirelles, Kátia Lund",
    "genero": "Drama",
    "ano": "2002"
  },
  {
    "titulo": "Parasita",
    "diretor": "Bong Joon Ho",
    "genero": "Comédia",
    "ano": "2019"
  },
  {
    "titulo": "Whiplash: Em Busca da Perfeição",
    "diretor": "Damien Chazelle",
    "genero": "Drama",
    "ano": "2014"
  }
]

app = Flask(__name__)

@app.route("/")
def home():
  qtd_filmes = len(lista_filmes)

  return render_template("home.html", qtd_filmes=qtd_filmes)

@app.route("/filmes")
def filmes():
  return render_template("filmes.html", lista_filmes=lista_filmes)

@app.route("/busca")
def busca():
  return render_template("busca.html")

@app.route("/sobre")
def sobre():
  return render_template("sobre.html")

@app.route("/resultado", methods=["POST"])
def resultado():
  genero = request.form.get("genero")
  filmes_filtrados = []

  for filme in lista_filmes:
    if filme['genero'] == genero:
      filmes_filtrados.append(filme)

  return render_template("busca.html", filmes_filtrados=filmes_filtrados)