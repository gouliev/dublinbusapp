#import the db
from flask_react import db
#import the weather model 
from flask_react.models import Weather
import pandas as pd
import pickle
import os

#class for producing prediction based results.
class prediction():
    def __init__(self, **kwargs):
        self.route = kwargs["route"]
        self.direction = kwargs["direction"]
        self.day = int(kwargs["day"])
        self.hour = int(kwargs["hour"])
        self.month = int(kwargs["month"])
        self.numberOfStations = int(kwargs["numberOfStations"])+1 #added 1 as progrnumber from 1, not 0
        self.data = {'progrnumber':[self.numberOfStations], 'day':[0], 'month':[0], 'hour':[0]}
        self.i = int(kwargs['iterator'])
    
    #The user will insert the time and date they wish to travel at. Where they are leaving from and going.
    #Data cleaning will follow the head of the modelTrainerTesting. It has one issue being the inclusion of Index.
    #this function inserts their data
    def __cleanData(self):
        #here is the data m1-9, h6-23 and d1-6
        #if user input paramters outside this, make zero.
        if self.month < 12 and self.month > 1:
            self.data['month'] = self.month
        if self.day < 7 and self.day > 0:
            self.data['day'] = self.day
        if self.hour < 24 and self.hour > 5:
            self.data['hour'] = self.day
        return self.data
    #this confirms that we can handle this specific route through checking for the files existence
    def __fileName(self):
        file_name = "model" + str(self.route) + "_" + str(self.direction) + ".pkl"
        directory = str(os.getcwd())
        if os.path.exists(directory + "/flask_react/models/" +file_name):
            return file_name
        else:
            error_message = False
            return error_message
    #this is the function which actually gets and returns the prediction
    def __getPrediction(self):
        self.data = self.__cleanData()
        requestData = pd.DataFrame(self.data)
        directory = str(os.getcwd())
        filename = self.__fileName()
        if filename == False:
            return 'Route Not Supported'
        pickled_model = pickle.load(open(directory + "/flask_react/models/" + filename, 'rb'))
        prediction = pickled_model.predict(requestData)
        value = prediction[0]
        return value
    #this is the function which formats and returns the data
    def jsonPrediction(self):
        travelPrediction = self.__getPrediction()
        travelTime = travelPrediction
        returnData = {'bus_route': self.route, 'direction':self.direction, 'travel_time':travelTime, 'i':self.i}
        return returnData
        
class weatherAPI():
    def __init__(self, **kwargs):
        self.value = {}
        self.data = ''
    
    def __accessData(self):
        self.data = Weather.query.first()
    
    def jsonWeather(self):
        self.__accessData()
        weather = self.data
        self.value['WeatherText'] = weather.weatherText
        self.value['weatherMetric'] = weather.weatherMetric
        self.value['WeatherIcon'] = weather.weatherIcon
        self.value['IsDayTime'] = weather.weatherTime
        print(self.value)
        return self.value
