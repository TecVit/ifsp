from flask import Flask, render_template, session, redirect, url_for

app = Flask(__name__)
app.secret_key = "ContadorVisita"

@app.route("/")
def home():
    if "visitas" not in session:
        session["visitas"] = 0
    session["visitas"] += 1
    return render_template("index.html", visitas=session["visitas"])

@app.route("/resetar")
def resetar():
    session["visitas"] = 0
    return redirect(url_for("home"))

if __name__ == "__main__":
    app.run(debug=True)
