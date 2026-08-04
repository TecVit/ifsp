from flask import Flask, render_template, request

lista_planos = [
  {
    "nome": "Musculação Iniciante",
    "modalidade": "Musculação",
    "duracao": 3,
    "nivel": "Iniciante"
  },
  {
    "nome": "Musculação Avançado",
    "modalidade": "Musculação",
    "duracao": 12,
    "nivel": "Avançado"
  },
  {
    "nome": "Natação Iniciante",
    "modalidade": "Natação",
    "duracao": 3,
    "nivel": "Iniciante"
  },
  {
    "nome": "Natação Intermediário",
    "modalidade": "Natação",
    "duracao": 6,
    "nivel": "Intermediário"
  },
  {
    "nome": "Yoga Relaxamento",
    "modalidade": "Yoga",
    "duracao": 1,
    "nivel": "Iniciante"
  },
  {
    "nome": "Yoga Avançado",
    "modalidade": "Yoga",
    "duracao": 6,
    "nivel": "Avançado"
  },
  {
    "nome": "Crossfit Intenso",
    "modalidade": "Crossfit",
    "duracao": 6,
    "nivel": "Intermediário"
  },
  {
    "nome": "Crossfit Elite",
    "modalidade": "Crossfit",
    "duracao": 12,
    "nivel": "Avançado"
  },
  {
    "nome": "Pilates Suave",
    "modalidade": "Pilates",
    "duracao": 3,
    "nivel": "Iniciante"
  },
  {
    "nome": "Pilates Intermediário",
    "modalidade": "Pilates",
    "duracao": 6,
    "nivel": "Intermediário"
  },
  {
    "nome": "Musculação Intermediário",
    "modalidade": "Musculação",
    "duracao": 6,
    "nivel": "Intermediário"
  },
  {
    "nome": "Natação Avançado",
    "modalidade": "Natação",
    "duracao": 12,
    "nivel": "Avançado"
  }
]

app = Flask(__name__)

@app.route("/")
def home():
  qtd_planos = len(lista_planos)

  return render_template("home.html", qtd_planos=qtd_planos)

@app.route("/planos")
def planos():
  return render_template("planos.html", lista_planos=lista_planos)

@app.route("/busca")
def busca():
  return render_template("busca.html")

@app.route("/contato")
def contato():
  return render_template("contato.html")

@app.route("/resultado", methods=["POST"])
def resultado():
  modalidade = request.form.get("modalidade")
  planos_filtrados = []

  for plano in lista_planos:
    if plano['modalidade'] == modalidade:
      planos_filtrados.append(plano)

  mensagem = None
  if not planos_filtrados:
    mensagem = "Nenhum plano encontrado para essa modalidade!"

  return render_template("busca.html", modalidade=modalidade, planos_filtrados=planos_filtrados, mensagem=mensagem)
