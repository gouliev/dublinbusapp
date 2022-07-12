
#class for producing prediction based results.
class prediction():
    
    def __init__(self, **kwargs):
        self.route = kwargs["route"]
        self.direction = kwargs["direction"]
        if "day" in kwargs:
            self.day = kwargs["day"]
        if  