import React, { useCallback } from 'react'
import { useState, useRef, useEffect } from 'react';
import { 
    GoogleMap, 
    useJsApiLoader, 
    Marker, 
    Autocomplete, 
    DirectionsRenderer,
    
    
} from '@react-google-maps/api';

import Geocode from 'react-geocode'

import Info from './Info'

import './MapAndSearchBox.css'

import modeIcon from '../assets/mode-icon.svg'

import { useTheme } from '../hooks/useTheme';
import { roundToNearestMinutesWithOptions } from 'date-fns/fp';
import { setDay, setMonth } from 'date-fns';

const exampleMapStyles = 
    [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }]
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }]
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }]
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }]
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }]
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }]
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }]
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }]
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }]
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }]
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }]
        }
      ]



const center = {
    lat: 53.349722,
    lng: -6.260278
  };
const containerStyle = {
width: '100%',
height: '100%'
};
const zoom = 14;

Geocode.setApiKey("AIzaSyD7bAzj9B7jo2UGQaOfcJjZl-R7AtQ51so")
Geocode.setLanguage("en")
Geocode.setRegion("ie")
Geocode.setLocationType("ROOFTOP")




export default function MapAndSearchBox() {
//searchBox
const [destinationStation, setDestinationStation] = useState('')
const [showRoute, setShowRoute] = useState(false)

const [showInfo, setShowInfo] = useState(false)
const [map, setMap] = useState(/** @type google.maps.Map */)
//route and data
const [directionsResponse, setDirectionsResponse] = useState(null)

const [distance, setDistance] = useState('')
const [duration, setDuration] = useState('')
const [originStation, setOriginStation] = useState('')
const [transitDistance, setTransitDistance] = useState('')
const [transitDuration, setTransitDuration] = useState('')
const [waitTime, setWaitTime] = useState('')

const { changeMode, mode } = useTheme()
const [style, setStyle] = useState([])

const [coordinate,setCoordinate] = useState(center)

const [dateTime, setDateTime] = useState('')

const [ourPrediction, setOurPrediction] = useState(0)
const [useButton, setUseButton] = useState(true)

/** @type React.MutableRefobject<HTMLInputElement> */ 
const originRef = useRef()
    /** @type React.MutableRefobject<HTMLInputElement> */ 
const destinationRef = useRef()
//depaturetime
const dateRef = useRef()
const timeRef = useRef()
const haha = useRef()

async function calculateRoute() {
    
    if(originRef.current.value === '' || destinationRef.current.value === ''){
        return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
            // eslint-disable-next-line no-undef
        travelMode: "TRANSIT",
        provideRouteAlternatives: true,
        transitOptions:{
          modes:['BUS'],
          departureTime: new Date(haha.current)   
        }
    })
    getPrediction(results)
    // console.log(results)
    //这里面所有数据都是routes数组中的
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
        setOriginStation(results.routes[0].legs[0].steps[1].transit.departure_stop.name)
        setDestinationStation(results.routes[0].legs[0].steps[1].transit.arrival_stop.name)
        setTransitDistance(results.routes[0].legs[0].steps[1].distance.text)
        setTransitDuration(results.routes[0].legs[0].steps[1].duration.text)
}

//function which calls our API currently set to manual time and day
//Takes in the API from Google as a parameter
function getPrediction(results){
  console.log("Here: ", results)
  //initialize the bus route list and bus station list
  var busRouteList = []
  var busStationList = []
  var busDirectionList = []
  //loop through each step to see if it is transit, if so add the values bus route name and station count to a list
  //Loop through the length of the steps 
  //if the travel mode is transit append that result to a list

  const datedate = new Date(haha.current)
    console.log(Date(haha.current))
    console.log(datedate)
    console.log(datedate.getHours())

  // Initialize the prediction variable.
  // var predictionFloat=0
  var predictionFloat=0
  setOurPrediction(0)

  for(var i=0; i<results.routes[0].legs[0].steps.length; i++){
    var travelMode = results.routes[0].legs[0].steps[i].travel_mode
    setWaitTime(parseInt((results.routes[0].legs[0].departure_time.value - datedate)/(60*1000)))
    if(travelMode=="TRANSIT"){
      var route = results.routes[0].legs[0].steps[i].transit.line.short_name
      busRouteList.push(route)
      var stops = results.routes[0].legs[0].steps[i].transit.num_stops
      busStationList.push(stops)
      var headsign = results.routes[0].legs[0].steps[i].transit.headsign
      busDirectionList.push(headsign)
      const url = "http://127.0.0.1:5000/busRoute/"+ i +"/"+ route +"/"+ headsign +"/"+ stops +"/"+ (datedate.getMonth()+1) +"/"+ (datedate.getDay()+6)%7 +"/"+ datedate.getHours();
      console.log(url);
      fetch(url).then(res => res.json()).then((prediction) => {
          console.log(prediction);
          var j = prediction.i;
          if(prediction.travel_time == 'Route Not Supported'){
            console.log(j);
            predictionFloat += results.routes[0].legs[0].steps[j].duration.value;
          }
          else{
            //add the time
            predictionFloat += parseInt(prediction.travel_time);
          }
          console.log(predictionFloat);
          //turn to minutes
          var predictionMinutes = predictionFloat/60;
          //apeend to current prediction
          var predictionAdded = ourPrediction + predictionMinutes;
          //set value
          setOurPrediction(parseInt(predictionAdded));
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }
    else if(travelMode=="WALKING"){
      var walkTime = results.routes[0].legs[0].steps[i].duration.text
      //gets string, cuts off before "mins" and turns to int, then turns into seconds
      predictionFloat += parseInt(walkTime.substring(0,walkTime.indexOf("min")-1))*60
    }
  }
  console.log("Routes:", busRouteList)
  console.log("no.Stations:", busStationList)
  console.log("Directions:", busDirectionList)
  //set prediction to zero 
}

function clearRoute(){
    setShowRoute(false)
    setDirectionsResponse(null)
    setOurPrediction(0)
    setDistance('')
    setDuration('')
    setOriginStation('')
    setDestinationStation('')
    setTransitDistance('')
    setTransitDuration('')
    setUseButton(true)
    dateRef.current.value = ''
    timeRef.current.value = ''
    originRef.current.value = ''
    destinationRef.current.value = ''
    console.log([directionsResponse,distance,duration,originStation,destinationStation,transitDistance,transitDuration])
    
}



// const [autocomplete, setAutocomplete] = useState(null)

const resetForm = () => {
    originRef.current.value = ''
    destinationRef.current.value = ''
    dateRef.current.value = ''
    timeRef.current.value = ''
}

const handleSubmit = (e) => {
  if(useButton==true){
    e.preventDefault()
    setShowRoute(true)
    setShowInfo(true)
    map.panTo(center)
    const tempDateTime = dateRef.current.value + ' ' + timeRef.current.value 
    //we use this
    haha.current = tempDateTime
    setDateTime(tempDateTime)
    calculateRoute()
    resetForm()
    setUseButton(false)
  }
}

const swapAddress = () => {
    const tempAddress = originRef.current.value
    originRef.current.value = destinationRef.current.value
    destinationRef.current.value = tempAddress
}

const handleGetLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const myPosition = position
      const lng  = myPosition.coords.longitude
      const lat  = myPosition.coords.latitude
      const latLng = { lat, lng }
      map.panTo(latLng)
      Geocode.fromLatLng(lat, lng).then(
        (response) => {
          const address = response.results[0].formatted_address;
          originRef.current.value = address
        }
      )
      setCoordinate(latLng)
      console.log(coordinate)
      console.log(latLng)
    }
  )
}



//map
const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyD7bAzj9B7jo2UGQaOfcJjZl-R7AtQ51so",
    libraries:["places"]

})

const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
    }, [])

if(!isLoaded){
    return "loading"
}

const toggleMode = () => {
  changeMode(mode === 'dark' ? 'light' : 'dark')
  if(mode == 'light'){
    setStyle(exampleMapStyles)
  }else{
    setStyle([])
  }
}

return  isLoaded ?(
    <div>
        <div className='Map'>
            {/* Google Map Box */}
            <GoogleMap 
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
                onLoad={onLoad}
                onUnmount={onUnmount} 
                options={{
                    styles: style,
                  }}
            >
            <Marker onLoad={onLoad} position={center}/>
            {coordinate && < Marker  onLoad={onLoad} position={coordinate}/>}
            {showRoute  &&  <DirectionsRenderer directions={directionsResponse} routeIndex={2}/> }
            {/* {directionsResponse &&  <DirectionsRenderer directions={directionsResponse} /> } */}
            </GoogleMap>
        </div>
        
        <form className={`SearchBox`} onSubmit={handleSubmit}>
        <img 
            src={modeIcon} 
            onClick={toggleMode} 
            alt="dark/light toggle icon" 
            style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)'}}
            className='darkLight'
            />
            <div>
                <Autocomplete>
                    <input 
                        className={`input1 form-control form-control-lg inputOrigin ${mode}`}
                        placeholder="Origin" 
                        aria-label=".form-control-lg example"
                        style={{width:'100%',display:'flex', float:'left'}}
                        type="text" 
                        ref={originRef}
                        required
                    />
                </Autocomplete>
                </div>
                <div>
                <Autocomplete>
                    <input 
                        className={`input1 form-control form-control-lg inputDestination ${mode}`}
                        placeholder="Destination" 
                        aria-label=".form-control-lg example"
                        type="text" 
                        ref={destinationRef}
                    />
                </Autocomplete>
                </div>
                <div  style={{float: 'left', display: 'flex', width: '100%'}}>
                    <label >
                            <input 
                                className={`input1 inputDate form-control form-control-lg ${mode}`}
                                placeholder="Month:XX" 
                                aria-label=".form-control-lg example"
                                type="date" 
                                ref={dateRef}
                                required
                            />
                    </label>
                    <label >
                            <input 
                                className={`input1 inputDate form-control form-control-lg ${mode}`}
                                placeholder="Day:XX" 
                                aria-label=".form-control-lg example"
                                type="time" 
                                ref={timeRef}
                                required
                            />
                    </label>
                  
                </div>
            <button onClick={handleGetLocation}  type="button" className="btn btn-success">Use my current position as origin</button>
            <button onClick={swapAddress}  type="button" className="btn btn-success">Swap Address</button>
            <button onClick={handleSubmit}  type="button" className="btn btn-success">Submit</button>
            {showInfo && 
                <Info 
                    setShowInfo={setShowInfo}
                    clearRoute={clearRoute} 
                    distance={distance} 
                    duration={duration}
                    originStation={originStation}
                    destinationStation={destinationStation}
                    transitDistance={transitDistance}
                    transitDuration={ourPrediction}
                    waitTime={waitTime}
                />

            }
        </form>
    </div>
  ):<></>
}
