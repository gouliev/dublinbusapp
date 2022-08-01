import React from 'react'
import { useState, useEffect, useCallback } from "react";
import { useTheme } from "../hooks/useTheme";
import './Weather.css'


export default function Weather() {
    //not needed
    //const [key,setKey] = useState('rD2vGykJdSF2ohlaBf7Iycdz8kUFrk79');
    //const [weatherURL,setWeatherURL] = useState('http://dataservice.accuweather.com/currentconditions/v1/');
    //const [cityURL, setCityURL] = useState('http://dataservice.accuweather.com/locations/v1/cities/search');
    const [cityQuery, setCityQuery] = useState('')
    const [weatherQuery, setWeatherQuery] = useState('')
    const [cityDets,setCityDets] = useState([])
    const [weather, setWeather] = useState([])
    const [dayOrNight, setDayOrNight] = useState(true)
    const [iconSrc, setIconSrc] = useState('')
    const [weatherText, setWeatherText] = useState('')
    const [temperature, setTemperature] = useState('')
    const [weatherIcon, setWeatherIcon] = useState('')
    
   




    /*const fetchCity = useCallback (async () => {
      const response = await fetch(cityURL + `?apikey=${key}&q=dublin`)
      const json = await response.json()
      setCityDets(json[0])
      console.log(json)
    },[cityURL])*/
//newyork :349727
//dublin 207931
    const fetchWeather = useCallback (async () => {
      //const response = await fetch(weatherURL + `207931?apikey=${key}`)
      const response = await fetch('http://52.48.114.161/weather')
      const json = await response.json()
      setWeather(json)
      console.log(json)
    },[])

    //useEffect(() => {
    //  fetchCity()
    //},[fetchCity])
  

    useEffect(() => {
      fetchWeather()
    },[fetchWeather])
    
    setTimeout(() => {
      setWeatherText(weather.WeatherText)
      setTemperature(weather.weatherMetric)
      setWeatherIcon(`img2/icons/${weather.WeatherIcon}.svg`)
      weather.IsDayTime ? setDayOrNight(true) : setDayOrNight(false)
    },2000);
   
  
  return (
    <div>
       {dayOrNight && 
          <nav className="navbar navbar-expand bg-light">
            <img src={weatherIcon} alt="" width="70" height="70"/>
                <div className="container-fluid">
                  <div  id="navbarSupportedContent">
                      <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#">{weatherText}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">{temperature}℃ in Dublin</a>
                        </li>
                      </ul>
                      {/* <form className="d-flex" role="search">
                        <input className="form-control me-2 cityForm" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                      </form> */}
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
                            <a className="nav-link" href="#">{temperature}℃ in Dublin</a>
                        </li>
                      </ul>
                      {/* <form className="d-flex text-white" role="search">
                        <input className="form-control me-2 cityForm" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                      </form> */}
                  </div>
                </div>
          </nav>}
    </div>
  )
}




