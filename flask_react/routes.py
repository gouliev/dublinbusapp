from flask import jsonify
from flask_react import app
from flask_react.jsonData import prediction, weatherAPI
import json

with open('flask_react/models/directions.json', 'r') as f:
    dictDirs = json.load(f)

def directionConverter(route, direction):
    if direction in dictDirs.get('{}-2'.format(route), ''):
        return "2"
    return "1"

#this route will be used to access the JSON data.
@app.route("/busRoute/<iterator>/<route>/<direction>/<stations>/<day>/<month>/<hour>")
def busPrediction(iterator, route, direction, day, month, hour, stations):
    direction = directionConverter(route, direction)
    timePrediction = prediction(day=day, hour=hour, month=month, numberOfStations=stations, route=route, direction=direction, iterator=iterator).jsonPrediction()
    return jsonify(timePrediction)

@app.route("/weather")
def weather():
    weatherCurrent = weatherAPI().jsonWeather()
    return weatherCurrent