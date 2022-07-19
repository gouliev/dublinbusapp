from flask import jsonify
from flask_react import app
from flask_react.busPrediction import prediction

#this route will be used to access the JSON data.
@app.route("/busRoute/<route>/<direction>/<stations>/<day>/<month>/<hour>")
def busPrediction(route, direction, day, month, hour, stations):
    timePrediction = prediction(day=day, hour=month, month=hour, numberOfStations=stations, route=route, direction = direction).jsonPrediction()
    return jsonify(timePrediction)