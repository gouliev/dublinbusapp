from flask import send_from_directory
from flask_react import app
from busPrediction import prediction

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

@app.route("/busRoute/<route>/<direction>/<day>/<month>/<hour>")
def busPrediction(route, direction, day, month, hour):
    return "hi"