from flask import Flask
from flask import url_for

app=Flask(__name__)
app.config.from_pyfile('config.py')

from dublin_flask import routes