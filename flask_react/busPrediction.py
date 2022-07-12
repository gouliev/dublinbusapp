import pandas as pd
import pickle
import os

#class for producing prediction based results.
class prediction():
    def __init__(self, **kwargs):
        #self.route = kwargs["route"]
        #self.direction = kwargs["direction"]
        self.day = kwargs["day"]
        self.hour = kwargs["hour"]
        self.month = kwargs["month"]
        self.numberOfStations = kwargs["numberOfStations"]
        self.data = {'progrnumber':[self.numberOfStations], 'm_2':[0], 'm_3':[0], 'm_4':[0], 'm_5':[0], 'm_6':[0], 'm_7':[0], 'm_8':[0],
                'm_9':[0], 'm_10':[0], 'h_6':[0], 'h_7':[0],'h_8':[0],'h_9':[0],'h_10':[0],'h_11':[0],'h_12':[0],'h_13':[0],'h_14':[0],
                'h_15':[0],'h_16':[0],'h_17':[0],'h_18':[0],'h_19':[0],'h_20':[0],'h_21':[0],'h_22':[0],'h_23':[0], 'd_1':[0], 'd_2':[0],
                'd_3':[0], 'd_4':[0], 'd_5':[0], 'd_6':[0]}
    
    #The user will insert the time and date they wish to travel at. Where they are leaving from and going.
    #Data cleaning will follow the head of the modelTrainerTesting. It has one issue being the inclusion of Index.
    #Each instance of the class will be cleaned to create a dataframe as displayed https://www.tutorialspoint.com/how-to-create-a-dataframe-in-python#:~:text=To%20create%20a%20dataframe%2C%20we,filled%20in%20the%20dataframe%20table.
    #This dataframe will then be passed into the pikl file https://practicaldatascience.co.uk/machine-learning/how-to-save-and-load-machine-learning-models-using-pickle
    #the output will be returned to the user in the form of a JSON data.
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
    
    def getPrediction(self):
        self.data = self._cleanData()
        requestData = self.data
        pickled_model = pickle.load(open('model46A_1.pkl', 'rb'))
        value = pickled_model.predict(requestData)
        print(value)
        return value




print(prediction(day=0, hour=0, month=0, numberOfStations=28).getPrediction())
        