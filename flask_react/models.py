from flask_react import db, app
import requests

class Weather(db.Model):
    __tablename__ = "Weather"
    id=db.Column(db.Integer, primary_key=True)
    weatherText=db.Column(db.String(100), nullable=False)
    weatherMetric=db.Column(db.Integer, nullable=False)
    weatherIcon=db.Column(db.Integer, nullable=False)
    weatherTime = db.Column(db.Boolean, nullable=False)

    def insertData():
        #delete the current row
        Weather.query.delete()
        apiURL = 'http://dataservice.accuweather.com/currentconditions/v1/207931?apikey=rD2vGykJdSF2ohlaBf7Iycdz8kUFrk79'
        response = requests.get(apiURL)
        response = response.json()
        print(response)
        weatherText = response[0]['WeatherText']
        weatherMetric = response[0]['Temperature']['Metric']['Value']
        weatherIcon = response[0]['WeatherIcon']
        weatherTime = response[0]['IsDayTime']
        print("issue here")
        weather = Weather(weatherText=weatherText, weatherMetric=weatherMetric, weatherIcon=weatherIcon, weatherTime=weatherTime)
        db.session.add(weather)
        db.session.commit()
        return True