from flask_react import db, app
import requests
#This is for the configuration settings 
import configparser


config=configparser.ConfigParser()
config.read('flask_react/config/config.ini')
api=config.get('oracles','api')

class Weather(db.Model):
    __tablename__ = "Weather"
    id=db.Column(db.Integer, primary_key=True)
    weatherText=db.Column(db.String(100), nullable=False)
    weatherMetric=db.Column(db.Integer, nullable=False)
    weatherIcon=db.Column(db.Integer, nullable=False)
    weatherTime = db.Column(db.Boolean, nullable=False)

    @staticmethod
    def insertData():
        #delete the current row
        Weather.query.delete()
        apiURL = api
        response = requests.get(apiURL)
        response = response.json()
        weatherText = response[0]['WeatherText']
        weatherMetric = response[0]['Temperature']['Metric']['Value']
        weatherIcon = response[0]['WeatherIcon']
        weatherTime = response[0]['IsDayTime']
        weather = Weather(weatherText=weatherText, weatherMetric=weatherMetric, weatherIcon=weatherIcon, weatherTime=weatherTime)
        db.session.add(weather)
        db.session.commit()
        return True