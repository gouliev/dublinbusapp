from flask_react import db, app

class Weather(db.Model):
    id=db.column(db.Integer, primary_key=True)
    weatherText=db.column(db.String(100), nullable=False)
    weatherMetric=db.Column(db.Integer, nullable=False)
    weatherIcon=db.Column(db.Integer, nullable=False)
    weatherTime = db.Column(db.Boolean, nullable=False)

