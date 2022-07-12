import React from 'react'
import { useState, useRef } from 'react';
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
width: '99%',
height: '99%'
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

const { changeMode, mode } = useTheme()
const [style, setStyle] = useState([])

const [coordinate,setCoordinate] = useState(center)




/** @type React.MutableRefobject<HTMLInputElement> */ 
const originRef = useRef()
    /** @type React.MutableRefobject<HTMLInputElement> */ 
const destinationRef = useRef()
async function calculateRoute(){
    
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
        provideRouteAlternatives: true
    })
    console.log(results)
    //这里面所有数据都是routes数组中的
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
        setOriginStation(results.routes[0].legs[0].steps[1].transit.departure_stop.name)
        setDestinationStation(results.routes[0].legs[0].steps[1].transit.arrival_stop.name)
        setTransitDistance(results.routes[0].legs[0].steps[1].distance.text)
        setTransitDuration(results.routes[0].legs[0].steps[1].duration.text)
}
function clearRoute(){
    setShowRoute(false)
    setDirectionsResponse(null)
    
    setDistance('')
    setDuration('')
    setOriginStation('')
    setDestinationStation('')
    setTransitDistance('')
    setTransitDuration('')
    originRef.current.value = ''
    destinationRef.current.value = ''
    console.log([directionsResponse,distance,duration,originStation,destinationStation,transitDistance,transitDuration])
    
}



// const [autocomplete, setAutocomplete] = useState(null)

const resetForm = () => {
    originRef.current.value = ''
    destinationRef.current.value = ''
}

const handleSubmit = (e) => {
    e.preventDefault()
    setShowRoute(true)
    setShowInfo(true)
    map.panTo(center)
    calculateRoute()
    resetForm()
    
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
            {showRoute &&  <DirectionsRenderer directions={directionsResponse} routeIndex={2}/> }
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
            <label >  
                <Autocomplete>
                    <input 
                        className={`input1 form-control form-control-lg ${mode}`}
                        placeholder="Origin" 
                        aria-label=".form-control-lg example"
                        type="text" 
                        ref={originRef}
                    />
                </Autocomplete>
            </label>
            <label >
                <Autocomplete>
                    <input 
                        className={`input1 form-control form-control-lg ${mode}`}
                        placeholder="Destination" 
                        aria-label=".form-control-lg example"
                        type="text" 
                        ref={destinationRef}
                    />
                </Autocomplete>
            </label>
            <button onClick={handleGetLocation}  type="button" className="btn btn-success">Use my current position as origin</button>
            <button onClick={swapAddress}  type="button" className="btn btn-success">Swap Address</button>
            <button onClick={handleSubmit}  type="button" className="btn btn-success">Submit</button>
            <button onClick={clearRoute}  type="button" className="btn btn-success">Clear Route</button>
            {showInfo && 
                <Info 
                    setShowInfo={setShowInfo}
                    clearRoute={clearRoute} 
                    distance={distance} 
                    duration={duration}
                    originStation={originStation}
                    destinationStation={destinationStation}
                    transitDistance={transitDistance}
                    transitDuration={transitDuration}
                />

            }
        </form>
    </div>
  ):<></>
}
