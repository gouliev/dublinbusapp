#!/usr/bin/python3

#only works running from server
import sqlalchemy
import csv
import pymysql
import os
from urllib.parse import quote
from dotenv import load_dotenv

load_dotenv()
password = os.getenv('DB_PASSWORD')
    
engine = sqlalchemy.create_engine("mysql+pymysql://oscar:{}@localhost:3306/dublinbus".format(quote(password)))
connection = engine.connect()

# Copyright Met Éireann
# Source www.met.ie
# This data is published under a Creative Commons Attribution 4.0 International (CC BY 4.0). https://creativecommons.org/licenses/by/4.0/
# Met Éireann does not accept any liability whatsoever for any error or omission in the data, their availability, or for any loss or damage arising from their use.
# This material has been modified from the original 

with open("weather2018.txt",newline='') as file:
    reader = csv.DictReader(file, delimiter=',')
    
    for row in reader:
        a = row['date']
        b = row['rain']
        c = row['temp']
        d = row['rhum'] #relative humidity
        e = row['msl'] #mean sea level pressure
        connection.execute('INSERT IGNORE INTO weather VALUES ("{}",{},{},{},{})'.format(a, b, c, d, e))

connection.close()