from flask import Flask, request, render_template, redirect, url_for

app = Flask(__name__)

produtos = []

@app.route("/")
def index():
  return render_template("index.html")

@app.route("/adicionar")
def addProduct():
  return render_template("addProduct.html")

@app.route("/produtos")
def products():
  return render_template("products.html", qtd_produtos=len(produtos), produtos=produtos)

@app.route("/api/products/add", methods=["POST"])
def apiAddProduct():
  name = request.form.get("name")
  description = request.form.get("description")
  price = int(request.form.get("price"))
  
  produto = {
    "name": name,
    "description": description,
    "price": price,
  }

  produtos.append(produto)

  return redirect(url_for("products"))