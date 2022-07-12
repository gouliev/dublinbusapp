from flask import send_from_directory
from flask_react import app

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

@app.route("/busRoute/<route>/<direction>")
def busPrediction(route, direction):
    return "hi"