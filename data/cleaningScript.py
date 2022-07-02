def cleanData(route, direction):
    if direction != 1 and direction != 2:
        raise ValueError('Directon is invalid. Should be 1 or 2!')
        
    if  not isinstance(route,str):
        raise TypeError('Route should be a string!')
    
    import pandas as pd
    import os
    import sqlalchemy
    import pymysql
    from urllib.parse import quote
    from dotenv import load_dotenv
    
    load_dotenv()
    password = os.getenv('DB_PASSWORD')
    
    engine = sqlalchemy.create_engine("mysql+pymysql://student:{}@localhost:3306/dublinbus".format(quote(password)))
    
    dfBase = pd.read_sql('call dublinbus.trip_leavetimes_join("{}", {});'.format(route, direction), engine)
    dfWeather = pd.read_sql('select * from weather;', engine)
    
    df = dfBase.drop(columns = ['vehicleid','tripPlannedArr','tripPlannedDep','tripActualArr','stopPlannedDep', 'stopPlannedArr'])
    df.rename(columns={'dayofservice': 'date'}, inplace=True)
    df.date = pd.to_datetime(df.date, format="%d-%b-%y %H:%M:%S")
    df.tripActualDep = df.tripActualDep.astype('Int64')
    df.sort_values(by = ['date', 'tripActualDep', 'progrnumber'], inplace=True)
    df = df.reset_index(drop=True).dropna(subset='tripActualDep')
    modeStartStop = df[df.progrnumber == 1].mode().stoppointid[0].astype('int64')
    dftmp = df[(df.progrnumber == 1) & (df.stoppointid != modeStartStop)]
    df = df[~df['date'].isin(dftmp['date']) | ~df['tripid'].isin(dftmp['tripid'])]
    df['journeytime'] = df.stopActualArr - df.tripActualDep
    df['dwelltime'] = df.stopActualDep - df.stopActualArr
    df.drop(columns=['tripActualDep','stopActualDep', 'lineid','direction','stoppointid'], inplace=True)
    df['hour'] = df.stopActualArr//3600
    df['day'] = df['date']
    df.loc[df.hour > 23, ['day']] += pd.Timedelta(days=1)
    df.loc[df.hour > 23, ['hour']] -=24
    
    dfWeather['date'] = pd.to_datetime(dfWeather.date, format="%d/%m/%Y %H:%M")
    dfWeather['hour'] = dfWeather.date.dt.hour
    dfWeather['date'] = dfWeather.date.dt.date
    dfWeather['date'] = pd.to_datetime(dfWeather.date, format = "%Y-%m-%d")

    df = df.merge(dfWeather, how='left', left_on = ['day','hour'], right_on = ['date','hour'])
    df.rename(columns={'date_x':'date'},inplace=True)
    df.drop(columns=['hour','day','date_y'], inplace=True)
    
    return df



def cleanDatav2(route, direction):
    if direction != 1 and direction != 2:
        raise ValueError('Directon is invalid. Should be 1 or 2!')
        
    if  not isinstance(route,str):
        raise TypeError('Route should be a string!')
    
    import pandas as pd
    import os
    import sqlalchemy
    import pymysql
    from urllib.parse import quote
    from dotenv import load_dotenv
    import warnings
    warnings.filterwarnings("ignore")
    
    load_dotenv()
    password = os.getenv('DB_PASSWORD')
    
    engine = sqlalchemy.create_engine("mysql+pymysql://student:{}@localhost:3306/dublinbus".format(quote(password)))
    
    dfBase = pd.read_sql('call dublinbus.trip_leavetimes_join("{}", {});'.format(route, direction), engine)
    dfWeather = pd.read_sql('select * from weather;', engine)
    
    df = dfBase.drop(columns = ['vehicleid','tripPlannedArr','tripPlannedDep','tripActualArr','stopPlannedDep', 'stopPlannedArr'])
    df.rename(columns={'dayofservice': 'date'}, inplace=True)
    df.date = pd.to_datetime(df.date, format="%d-%b-%y %H:%M:%S")
    df.tripActualDep = df.tripActualDep.astype('Int64')
    df.sort_values(by = ['date', 'tripActualDep', 'progrnumber'], inplace=True)
    df = df.reset_index(drop=True).dropna(subset='tripActualDep')
    modeStartStop = df[df.progrnumber == 1].mode().stoppointid[0].astype('int64')
    dftmp = df[(df.progrnumber == 1) & (df.stoppointid != modeStartStop)]
    df = df[~df['date'].isin(dftmp['date']) | ~df['tripid'].isin(dftmp['tripid'])].reset_index(drop=True)
    dftmp = df.groupby(['date','tripid']).progrnumber.idxmax().reset_index()
    dftmp = df.iloc[dftmp.progrnumber]
    modeLastStop = dftmp.stoppointid.mode()[0]
    dftmp = dftmp[dftmp.stoppointid != modeLastStop].reset_index(drop=True)
    dftmp = df.merge(dftmp, how='left', on=['date','tripid'], suffixes=(None,'Y'), indicator=True)
    dftmp = dftmp[dftmp['_merge']=='left_only'].drop(columns=['_merge'])
    df = dftmp[list(df.columns)]
    df['journeytime'] = df.stopActualArr - df.tripActualDep
    df['dwelltime'] = df.stopActualDep - df.stopActualArr
    df.drop(columns=['tripActualDep','stopActualDep', 'lineid','direction','stoppointid'], inplace=True)
    df['hour'] = df.stopActualArr//3600
    df['day'] = df['date']
    df.loc[df.hour > 23, ['day']] += pd.Timedelta(days=1)
    df.loc[df.hour > 23, ['hour']] -=24
    
    dfWeather['date'] = pd.to_datetime(dfWeather.date, format="%d/%m/%Y %H:%M")
    dfWeather['hour'] = dfWeather.date.dt.hour
    dfWeather['date'] = dfWeather.date.dt.date
    dfWeather['date'] = pd.to_datetime(dfWeather.date, format = "%Y-%m-%d")

    df = df.merge(dfWeather, how='left', left_on = ['day','hour'], right_on = ['date','hour'])
    df.rename(columns={'date_x':'date'},inplace=True)
    df.drop(columns=['hour','day','date_y'], inplace=True)
    dftmp = df[(df.journeytime <= 0) & (df.progrnumber > 1)]
    df = df[~df['date'].isin(dftmp['date']) | ~df['tripid'].isin(dftmp['tripid'])].reset_index()

    
    return df
