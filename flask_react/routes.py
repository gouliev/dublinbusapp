from flask import jsonify
from flask_react import app
from flask_react.jsonData import prediction, weatherAPI
from flask_react.directions import directionConverterMethod

#this route will be used to access the JSON data.
@app.route("/busRoute/<iterator>/<route>/<direction>/<stations>/<day>/<month>/<hour>")
def busPrediction(iterator, route, direction, day, month, hour, stations):
    direction = directionConverterMethod(route=route, direction=direction).directionCheck()
    timePrediction = prediction(day=day, hour=hour, month=month, numberOfStations=stations, route=route, direction=direction, iterator=iterator).jsonPrediction()
    return jsonify(timePrediction)

@app.route("/weather")
def weather():
    weatherCurrent = weatherAPI().jsonWeather()
    return weatherCurrent