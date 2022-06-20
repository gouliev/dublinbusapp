#!/usr/bin/python3

#only works running from server
import sqlalchemy
import csv
import pymysql

with open("hiddenCredentials.txt") as f:
    lines = f.readlines()
    username = lines[0]
    password = lines[1].strip()
    url = lines[2]
    port = lines[3]
    database = lines[4]

engine = sqlalchemy.create_engine("mysql+pymysql://{}:{}@{}:{}/{}".format(username, password, url, port, database))
connection = engine.connect()


    
with open("rt_vehicles_DB_2018.txt",newline='') as file:
    reader = csv.DictReader(file, delimiter=';')
    
    for row in reader:
        a = row['DAYOFSERVICE']
        b = row['VEHICLEID']
        c = row['DISTANCE']
        d = row['MINUTES']
        connection.execute('INSERT IGNORE INTO {} VALUES ("{}",{},{},{})'.format("vehicles", a, b, c, d))

connection.close()
