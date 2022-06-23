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
# with open("hiddenCredentials.txt") as f:
#     lines = f.readlines()
#     password = lines[0].strip()
    
engine = sqlalchemy.create_engine("mysql+pymysql://oscar:{}@localhost:3306/dublinbus".format(quote(password)))
connection = engine.connect()

os.chdir("/home/student/DublinBus/data")
with open("rt_vehicles_DB_2018.txt",newline='') as file:
    reader = csv.DictReader(file, delimiter=';')
    
    for row in reader:
        a = row['DAYOFSERVICE']
        b = row['VEHICLEID']
        c = row['DISTANCE']
        d = row['MINUTES']
        connection.execute('INSERT IGNORE INTO {} VALUES ("{}",{},{},{})'.format("vehicles", a, b, c, d))

connection.close()
