from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from flask_react.HelloApiHandler import HelloApiHandler
from flask_react.config import Config

app = Flask(__name__, static_url_path='', static_folder='frontend/public')
app.config.from_object(Config)
CORS(app) #comment this on deployment
api = Api(app)

api.add_resource(HelloApiHandler, '/flask/hello')

from flask_react import routes
