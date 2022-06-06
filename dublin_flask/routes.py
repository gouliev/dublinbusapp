from dublin_flask import app
from flask import render_template

@app.route("/", methods=['GET'])
def homepage():
    return render_template('index.html', title='Dublin Bus')