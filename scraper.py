# import our scraper
from flask_react.models import Weather
#import modules needed for scraper to operate
from datetime import datetime
import time

while True:
        print("waiting...")
        currentTime = datetime.now()
        hour = currentTime.minute
        try:
            if hour % 30 == 0:
                Weather.insertData()
                print("Done")

        except Exception as e:

            print("Error: ", e)
        
        time.sleep(50)