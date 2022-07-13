import pandas as pd
import pickle
import os
import sklearn
import sys

#class for producing prediction based results.
class prediction():
    def __init__(self, **kwargs):
        self.route = kwargs["route"]
        self.direction = kwargs["direction"]
        self.day = int(kwargs["day"])
        self.hour = int(kwargs["hour"])
        self.month = int(kwargs["month"])
        self.numberOfStations = kwargs["numberOfStations"]
        self.data = {'index':[0], 'progrnumber':[self.numberOfStations], 'm_2':[0], 'm_3':[0], 'm_4':[0], 'm_5':[0], 'm_6':[0], 'm_7':[0], 'm_8':[0],
                'm_9':[0], 'm_10':[0], 'h_6':[0], 'h_7':[0],'h_8':[0],'h_9':[0],'h_10':[0],'h_11':[0],'h_12':[0],'h_13':[0],'h_14':[0],
                'h_15':[0],'h_16':[0],'h_17':[0],'h_18':[0],'h_19':[0],'h_20':[0],'h_21':[0],'h_22':[0],'h_23':[0], 'd_1':[0], 'd_2':[0],
                'd_3':[0], 'd_4':[0], 'd_5':[0], 'd_6':[0]}
    
    #The user will insert the time and date they wish to travel at. Where they are leaving from and going.
    #Data cleaning will follow the head of the modelTrainerTesting. It has one issue being the inclusion of Index.
    #this function inserts their data
    def _cleanData(self):
        #here is the data m1-9, h6-23 and d1-6
        #if user input paramters outside this, make zero.
        if self.month < 11 and self.month > 1:
            month = str(self.month)
            self.data['m_'+month] = 1
        if self.day < 7 and self.day > 0:
            day = str(self.day)
            self.data['d_'+day] = 1
        if self.hour < 24 and self.hour > 5:
            hour = str(self.hour)
            self.data['h_'+hour] = 1
        return self.data
    #this confirms that we can handle this specific route through checking for the files existence
    def _fileName(self):
        file_name = "model" + str(self.route) + "_" + str(self.direction) + ".pkl"
        directory = str(os.getcwd())
        if os.path.exists(directory + "/flask_react/models/" +file_name):
            return file_name
        else:
            error_message = False
            return error_message
    #this is the function which actually gets and returns the prediction
    def _getPrediction(self):
        self.data = self._cleanData()
        requestData = pd.DataFrame(self.data)
        directory = str(os.getcwd())
        filename = self._fileName()
        if filename == False:
            return 'Route Not Supported'
        pickled_model = pickle.load(open(directory + "/flask_react/models/" + filename, 'rb'))
        prediction = pickled_model.predict(requestData)
        value = prediction[0]
        return value
    #this is the function which formats and returns the data
    def jsonPrediction(self):
        travelPrediction = self._getPrediction()
        travelTime = travelPrediction
        returnData = {'bus_route': self.route, 'direction':self.direction, 'travel_time':travelTime}
        return returnData
        