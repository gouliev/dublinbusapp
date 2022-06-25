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

def nullIfEmpty(var):
    if len(var) == 0:
        return "NULL"
    return var

os.chdir("/home/student/DublinBus/data")
with open("rt_leavetimes_DB_2018.txt",newline='') as file:
    reader = csv.DictReader(file, delimiter=';')
    
    for row in reader:
        a = row['DAYOFSERVICE']
        b = row['TRIPID']
        c = nullIfEmpty(row['PROGRNUMBER'])
        d = row['STOPPOINTID']
        e = nullIfEmpty(row['PLANNEDTIME_ARR'])
        f = nullIfEmpty(row['PLANNEDTIME_DEP'])
        g = nullIfEmpty(row['ACTUALTIME_ARR'])
        h = nullIfEmpty(row['ACTUALTIME_DEP'])
        i = nullIfEmpty(row['VEHICLEID'])
        connection.execute('INSERT IGNORE INTO leavetimes VALUES ("{}",{},{},{},{},{},{},{},{})'.format(a, b, c, d, e, f, g, h, i))

connection.close()
