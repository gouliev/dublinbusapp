import React from 'react'
import { useState, useEffect, useCallback } from "react";

export default function Weather() {
    const [key,setKey] = useState('rD2vGykJdSF2ohlaBf7Iycdz8kUFrk79');
    const [weatherURL,setWeatherURL] = useState('http://dataservice.accuweather.com/currentconditions/v1/');
    const [cityURL, setCityURL] = useState('http://dataservice.accuweather.com/locations/v1/cities/search');
    const [cityQuery, setCityQuery] = useState('')
    const [weatherQuery, setWeatherQuery] = useState('')
    const [cityDets,setCityDets] = useState([])
    const [weather, setWeather] = useState([])
    const [dayOrNight, setDayOrNight] = useState(true)
    const [iconSrc, setIconSrc] = useState('')
    const [weatherText, setWeatherText] = useState('')
    const [temperature, setTemperature] = useState('')
    const [weatherIcon, setWeatherIcon] = useState('')


    const fetchCity = useCallback (async () => {
      const response = await fetch(cityURL + `?apikey=${key}&q=dublin`)
      const json = await response.json()
      setCityDets(json[0])
    },[cityURL])

    const fetchWeather = useCallback (async () => {
      const response = await fetch(weatherURL + `207931?apikey=${key}`)
      const json = await response.json()
      setWeather(json[0])

    },[weatherURL])

    useEffect(() => {
      fetchCity()
    },[fetchCity])
    console.log(cityDets)

    useEffect(() => {
      fetchWeather()


    },[fetchWeather])
    setTimeout(() => {
      setWeatherText(weather.WeatherText)
      //setTemperature(weather.Temperature.Metric.Value)
      setWeatherIcon(`img2/icons/${weather.WeatherIcon}.svg`)
      weather.IsDayTime ? setDayOrNight(true) : setDayOrNight(false)
    },2000);
    console.log(weather,weatherText,weatherIcon,dayOrNight)

  return (
    <div>
       {dayOrNight && 
          <nav className="navbar navbar-expand-lg bg-light">
            <img src={weatherIcon} alt="" width="70" height="70"/>
                <div className="container-fluid">
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">{weatherText}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">{temperature}℃</a>
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
          <nav className="navbar navbar-expand-lg bg-secondary">
            <img src={weatherIcon} alt="" width="70" height="70"/>
                <div className="container-fluid">
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-white">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">{weather.WeatherText}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">{temperature}℃</a>
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


