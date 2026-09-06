from flask import Flask, render_template, request

PACIENTES = [
    {
        "nome": "Ana Souza",
        "idade": "34",
        "convenio": "Unimed",
        "especialidade": "Cardiologia",
    },
    {
        "nome": "Carlos Eduardo Lima",
        "idade": "45",
        "convenio": "Bradesco Saúde",
        "especialidade": "Ortopedia",
    },
    {
        "nome": "Fernanda Ribeiro",
        "idade": "29",
        "convenio": "SulAmérica",
        "especialidade": "Dermatologia",
    },
    {
        "nome": "João Pedro Alves",
        "idade": "52",
        "convenio": "Amil",
        "especialidade": "Endocrinologia",
    },
    {
        "nome": "Mariana Costa",
        "idade": "38",
        "convenio": "Particular",
        "especialidade": "Ginecologia",
    },
    {
        "nome": "Roberto Nogueira",
        "idade": "61",
        "convenio": "Unimed",
        "especialidade": "Clínica Geral",
    },
]

app = Flask(__name__)

@app.route("/")
def home():
    total_pacientes = len(PACIENTES)

    return render_template("home.html", total_pacientes=total_pacientes)

@app.route("/pacientes")
def pacientes():
    return render_template("pacientes.html", PACIENTES=PACIENTES)

@app.route("/cadastro")
def cadastro():
    return render_template("cadastro.html")

@app.route("/cadastrar", methods=["POST"])
def cadastrar():
    nome = request.form.get("nome")
    idade = request.form.get("idade")
    convenio = request.form.get("convenio")
    especialidade = request.form.get("especialidade")

    novo_paciente = {
        "nome": nome,
        "idade": idade,
        "convenio": convenio,
        "especialidade": especialidade,
    }

    PACIENTES.append(novo_paciente)

    mensagem = f"Paciente {nome} cadastrado com sucesso!"

    return render_template("cadastro.html", mensagem=mensagem)

@app.route("/busca")
def busca():
    return render_template("busca.html")

@app.route("/resultado", methods=["POST"])
def resultado():
    convenio = request.form.get("convenio")
    resultados = []

    for paciente in PACIENTES:
        if paciente["convenio"] == convenio:
            resultados.append(paciente)

    return render_template("busca.html", resultados=resultados, convenio=convenio)

@app.route("/sobre")
def sobre():
    return render_template("sobre.html")
