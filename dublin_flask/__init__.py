from flask import Flask
from flask import url_for
from config import Config

app=Flask(__name__)
app.config.from_object(Config)

from dublin_flask import routes