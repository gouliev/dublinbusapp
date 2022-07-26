from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
#This API handler May Not Be Needed
from flask_react.config import Config
#This is for the configuration settings 
import configparser
#SQLAlchemy must be kept in a global environment
from flask_sqlalchemy import SQLAlchemy
#import the inserter

#load in the values from the config file
config=configparser.ConfigParser()
config.read('flask_react/config/config.ini')
key=config.get('oracles','key')
post=config.get('oracles', 'post')

app = Flask(__name__, static_url_path='')
app.config.from_object(Config)
CORS(app) #comment this on deployment
api = Api(app)

#configure the database
app.config['SECRET_KEY']=key
#configure the database
app.config['SQLALCHEMY_DATABASE_URI'] = post
#initialize db inside of sqlalchemy
db=SQLAlchemy(app)

from flask_react import routes
