import pandas as pd
import pickle
import sqlalchemy
import pymysql
import os
from urllib.parse import quote
from cleaningScript import cleanDatav2
from dotenv import load_dotenv
from sklearn.ensemble import RandomForestRegressor

load_dotenv()
password = os.getenv('DB_PASSWORD')
DBengine = sqlalchemy.create_engine("mysql+pymysql://student:{}@localhost:3306/dublinbus".format(quote(password)))
dfBase = pd.read_sql('call dublinbus.all_lines_directions();', DBengine) #uses stored procedure
lines = dfBase.values.tolist()#save line-direction combos into a list, more straightfprward to use as iterator

for line,direction in lines:
    df = cleanDatav2(line,direction)
    df['weekday'] = df.date.dt.weekday
    df['month'] = df.date.dt.month
    df['hour'] = (df.stopActualArr//3600)
    df = df.drop(columns = ['stopActualArr','rain','temp','pressure','dwelltime'])
    df.hour %= 24
    df.month = df.month.astype('category')
    df.hour = df.hour.astype('category')
    df.weekday = df.weekday.astype('category')
    monthDummies = pd.get_dummies(df.month, prefix='m', drop_first=True)
    hourDummies = pd.get_dummies(df.hour,prefix='h', drop_first=True)
    dayDummies = pd.get_dummies(df.weekday, prefix='d', drop_first=True)
    df = pd.concat([df,monthDummies,hourDummies,dayDummies], axis=1)
    df = df.drop(columns=['month','hour','weekday'])
    Xfeatures = df.columns[df.columns != 'journeytime']
    Xfeatures = Xfeatures.drop(['date','tripid','humidity'])
    X = df[Xfeatures]
    y = df.journeytime
    rfc = RandomForestRegressor(n_estimators=100, oob_score=True, random_state=1)
    rfc.fit(X,y)
    with open('models/model{}_{}.pkl'.format(line,direction),'wb') as file:
        pickle.dump(rfc,file, pickle.HIGHEST_PROTOCOL)