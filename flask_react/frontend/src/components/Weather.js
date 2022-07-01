import React from 'react'
import { useState, useEffect } from "react";

//uncomment all of this to reactivate the weather

/*
export default function Weather() {
    const [key,setKey] = useState('QUGY2QGbwOgTrq3Uitnu6O2Yce4KFaY8');
    const [weatherURL,setWeatherURL] = useState('http://dataservice.accuweather.com/currentconditions/v1/');
    const [cityURL, setCityURL] = useState('http://dataservice.accuweather.com/locations/v1/cities/search');
    const [cityQuery, setCityQuery] = useState('')
    const [weatherQuery, setWeatherQuery] = useState('')
    const [cityDets,setCityDets] = useState([])
    const [weather, setWeather] = useState([])
    const [dayOrNight, setDayOrNight] = useState(true)
    const [iconSrc, setIconSrc] = useState('')
 


    useEffect(() => {
        setCityQuery(cityURL + `?apikey=${key}&q=Dublin`)
        fetch(cityQuery)
            .then(response => response.json())
            .then(json => setCityDets(json[0]))
    }, [cityQuery]);
    console.log(cityDets)

    useEffect(() => {
        setWeatherQuery(weatherURL + `207931?apikey=${key}` )
        fetch(weatherQuery)
            .then(response => response.json())
            .then(json => setWeather(json[0]))
    }, [weatherQuery]);
    console.log(weather)

    setTimeout(() => {
      weather.IsDayTime ? setDayOrNight(true) : setDayOrNight(false);
      setIconSrc(`img2/icons/${weather.WeatherIcon}.svg`)

    },1000)
  
  return (
    <div>
       {dayOrNight && 
          <nav className="navbar navbar-expand-lg bg-light">
            <img src={iconSrc} alt="" width="70" height="70"/>
                <div className="container-fluid">
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">{weather.WeatherText}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">{weather.Temperature.Metric.Value}℃</a>
                        </li>
                        
                        <li className="nav-item">
                            <a className="nav-link disabled">{cityDets.Localname}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Welcome to The Beautiful Dublin</a>
                        </li>
                      </ul>
                      <form className="d-flex" role="search">
                        <input className="form-control me-2 cityForm" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                      </form>
                  </div>
                </div>
          </nav>}
          {!dayOrNight && 
          <nav className="navbar navbar-expand-lg bg-dark">
            <img src={iconSrc} alt="" width="70" height="70"/>
                <div className="container-fluid">
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-white">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">{weather.WeatherText}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">{weather.Temperature.Metric.Value}℃</a>
                        </li>
                        
                        <li className="nav-item">
                            <a className="nav-link disabled">{cityDets.Localname}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Welcome to The Beautiful Dublin</a>
                        </li>
                      </ul>
                      <form className="d-flex text-white" role="search">
                        <input className="form-control me-2 cityForm" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                      </form>
                  </div>
                </div>
          </nav>}
    </div>
  )
}



*/
