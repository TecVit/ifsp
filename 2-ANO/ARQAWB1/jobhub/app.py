from flask import Flask, render_template, request

app = Flask(__name__)

VAGAS = [
    {
        "titulo": "Desenvolvedor Python",
        "empresa": "TechCorp",
        "area": "Tecnologia",
        "regime": "Remoto",
        "salario": "R$ 6.500",
    },
    {
        "titulo": "Enfermeiro",
        "empresa": "Hospital São Lucas",
        "area": "Saúde",
        "regime": "Presencial",
        "salario": "R$ 4.800",
    },
    {
        "titulo": "Analista de Marketing Digital",
        "empresa": "MediaGrow",
        "area": "Marketing",
        "regime": "Híbrido",
        "salario": "R$ 4.200",
    },
    {
        "titulo": "Gerente de Projetos",
        "empresa": "BuildIt Solutions",
        "area": "Administração",
        "regime": "Remoto",
        "salario": "R$ 9.000",
    },
    {
        "titulo": "Professor de Inglês",
        "empresa": "Global Idiomas",
        "area": "Educação",
        "regime": "Presencial",
        "salario": "R$ 3.500",
    },
]

@app.route("/")
def home():
    qtd_vagas = len(VAGAS)

    return render_template('home.html', qtd_vagas=qtd_vagas, VAGAS=VAGAS)

@app.route("/vagas")
def vagas():
    return render_template("vagas.html", VAGAS=VAGAS)

@app.route("/cadastro")
def cadastro():
    return render_template("cadastro.html")

@app.route("/cadastrar", methods=['POST'])
def cadastrar():
    titulo = request.form.get('titulo')
    area = request.form.get('area')
    empresa = request.form.get('empresa')
    regime = request.form.get('regime')
    salario = request.form.get('salario')

    nova_vaga = {
        'titulo': titulo,
        'area': area,
        'empresa': empresa,
        'regime': regime,
        'salario': salario,
    }

    VAGAS.append(nova_vaga)

    mensagem = f'Vaga de {titulo} cadastrada com sucesso!'

    return render_template("cadastro.html", mensagem=mensagem)

@app.route("/sobre")
def sobre():
    return render_template("sobre.html")