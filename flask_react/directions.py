import json

class directionConverterMethod():
    def __init__(self, **kwargs):
        self.directionValue = "1"
        self.direction = kwargs["direction"]
        self.route =  kwargs["route"]
    
    def __chekFile(self):
        with open('flask_react/models/directions.json', 'r') as f:
            dictDirs = json.load(f)
        
        if self.direction in dictDirs.get('{}-2'.format(self.route), ''):
            self.directionValue = "2"
    
    def directionCheck(self):
        self.__chekFile()
        return self.directionValue