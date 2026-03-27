from flask import Flask, render_template

app = Flask(__name__)

@app.route("/identidade")
def identidade():
  nome = "João Pedro Andrade da Conceição"
  curso = "2º Ano T1 - Técnico em Informatica"
  instituicao = "IFSP Araraquara"

  html = f"""
<!DOCTYPE html/>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meus Dados</title>
  </head>
  <body>
    <h2><strong>Nome: </strong> {nome}</h2>
    <hr />
    <h3><span>Curso: </span>{curso}</h3>
    <p style="color: blue;">{instituicao}</p>
  </body>
</html>
"""
  return html

@app.route("/hobbies")
def hobbies():
  return render_template("hobbies.html")

@app.route("/calculo/<nome>/<dias>")
def calculo(nome, dias):
  nome = str(nome)
  dias = int(dias)

  valor_diaria = 157
  hospedagem = valor_diaria * dias
  taxa = 0
  
  if dias >= 5:
    taxa = (hospedagem * (10 / 100)) # Taxa adicional de 10%
  
  total = float(hospedagem + taxa)

  hospedagem = round(hospedagem, 2)
  taxa = round(taxa, 2)
  total = round(total, 2)

  if taxa > 0:
    taxa = f"Taxa Adicional: R${taxa}"
  else:
    taxa = f"Sem Taxa Adicional"
  
  return render_template("calculo.html", nome=nome, dias=dias, hospedagem=hospedagem, taxa=taxa, total=total)