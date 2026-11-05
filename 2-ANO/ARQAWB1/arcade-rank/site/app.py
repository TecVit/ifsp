from flask import Flask, render_template, flash, redirect, url_for, request, session

app = Flask(__name__)
app.secret_key = "sim"

user_admin = "admin"
password_admin = "admin"

# Variables
GAMES = [
    "The Legend of Zelda: Breath of the Wild",
    "The Witcher 3: Wild Hunt",
    "Elden Ring",
    "Red Dead Redemption 2",
    "God of War Ragnarök",
    "Grand Theft Auto V",
    "Minecraft",
    "Hades",
    "Baldur's Gate 3",
    "Cyberpunk 2077",
    "Hollow Knight",
    "Portal 2"
]

PLAYERS = [
    {"name": "Alice", "game": "The Legend of Zelda: Breath of the Wild", "points": 0},
    {"name": "Bruno", "game": "The Witcher 3: Wild Hunt", "points": 0},
    {"name": "Carlos", "game": "Elden Ring", "points": 0},
    {"name": "Daniela", "game": "Red Dead Redemption 2", "points": 2},
    {"name": "Eduardo", "game": "God of War Ragnarök", "points": 0},
    {"name": "Fernanda", "game": "Grand Theft Auto V", "points": 0},
    {"name": "Gabriel", "game": "Minecraft", "points": 0},
    {"name": "Helena", "game": "Hades", "points": 0},
    {"name": "Igor", "game": "Baldur's Gate 3", "points": 0},
    {"name": "Julia", "game": "Cyberpunk 2077", "points": 0},
    {"name": "Lucas", "game": "Hollow Knight", "points": 0},
    {"name": "Marina", "game": "Portal 2", "points": 0}
]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/auth", methods=["POST"])
def auth():
    user = request.form.get("user")
    password = request.form.get("password")

    # Se usuario certo
    if user == user_admin and password == password_admin:
        session["user"] = user
        session["logged"] = True

        return redirect("/dashboard")

    return redirect(url_for("login"))

# Dashboard

@app.route("/dashboard")
def dashboard():
    logged = session.get("logged")

    if not logged:
        return redirect(url_for("login"))

    # Ordenação padrão é por pontos
    PLAYERS.sort(key=lambda player: -player['points'])

    # PLAYERS_LIMITED = []

    # mx = len(PLAYERS)

    # if mx > 10:
    #     mx = 10

    # for i in range(mx):
    #     PLAYERS_LIMITED.append(PLAYERS[i])
    
    # return render_template("dashboard.html", players=PLAYERS_LIMITED, games=GAMES)

    return render_template("dashboard.html", players=PLAYERS[:10], games=GAMES)

@app.route("/rankingOrderByGame")
def rankingOrderByGame():
    logged = session.get("logged")

    if not logged:
        return redirect(url_for("login"))

    PLAYERS.sort(key=lambda player: -player['points'])

    game = request.args.get("game")

    if game == "todos":
        return render_template("dashboard.html", games=GAMES, players=PLAYERS[:10])

    PLAYERS_FILTER = []

    for player in PLAYERS:
        if player['game'] == game:
            PLAYERS_FILTER.append(player)

    return render_template("dashboard.html", games=GAMES, players=PLAYERS_FILTER[:10])

# Games
@app.route("/games")
def games():
    logged = session.get("logged")

    if not logged:
        return redirect(url_for("login"))
    
    return render_template("games.html", games=GAMES)

@app.route("/addGame", methods=["POST"])
def addGame():
    logged = session.get("logged")

    if not logged:
        return redirect(url_for("login"))

    nameGame = request.form.get("name")

    GAMES.append(nameGame)
    
    flash("Jogo adicionado com sucesso!")

    return redirect(url_for("games"))

@app.route("/deleteGame/<string:name>", methods=["POST"])
def deleteGame(name):
    logged = session.get("logged")

    if not logged:
        return redirect(url_for("login"))

    if name in GAMES:
        GAMES.remove(name)
    
    flash("Jogo deletado com sucesso!")

    return redirect(url_for("games"))

# Players
@app.route("/players")
def players():
    logged = session.get("logged")

    if not logged:
        return redirect(url_for("login"))
    
    return render_template("players.html", games=GAMES, players=PLAYERS)

@app.route("/addPlayer", methods=["POST"])
def addPlayer():
    logged = session.get("logged")

    if not logged:
        return redirect(url_for("login"))

    name = request.form.get("name")
    game = request.form.get("game")

    player = {
        "name": name,
        "game": game,
        "points": 0,
    }

    PLAYERS.append(player)

    flash("Jogador adicionado com sucesso!")

    return redirect(url_for("players"))

@app.route("/deletePlayer/<string:name>/<string:game>", methods=["POST"])
def deletePlayer(name, game):
    logged = session.get("logged")

    if not logged:
        return redirect(url_for("login"))

    for i in range(len(PLAYERS)):
        player = PLAYERS[i]

        if player["name"] == name and player["game"] == game:
            PLAYERS.pop(i)
            break
    
    flash("Jogador deletado com sucesso!")

    return redirect(url_for("players"))