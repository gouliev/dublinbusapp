import React from 'react'
import { useState, useRef } from 'react';
import { 
    GoogleMap, 
    useJsApiLoader, 
    Marker, 
    Autocomplete, 
    DirectionsRenderer,
    
} from '@react-google-maps/api';
import Info from './Info'
import './MapAndSearchBox.css'




const center = {
    lat: 53.349722,
    lng: -6.260278
  };
const containerStyle = {
width: '99%',
height: '99%'
};
const zoom = 14;

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
        travelMode: "TRANSIT"
    })
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
// const onLoad = (autocomplete) => {
// }

//img



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
            >
            <Marker position={center}/>
            {showRoute &&  <DirectionsRenderer directions={directionsResponse} /> }
            {/* {directionsResponse &&  <DirectionsRenderer directions={directionsResponse} /> } */}
            </GoogleMap>
        </div>
        {/* <div className='SearchBox'>
                <Autocomplete>
                    <input 
                        className="input1 form-control form-control-lg"
                        placeholder="Origin" 
                        aria-label=".form-control-lg example"
                        type="text" 
                        ref={originRef}
                    />
                </Autocomplete>
    
 
                <Autocomplete>
                    <input 
                        className="input1 form-control form-control-lg"
                        placeholder="Destination" 
                        aria-label=".form-control-lg example"
                        type="text" 
                        ref={destinationRef}
                    />
                </Autocomplete>
            <button onClick={swapAddress}  type="button" className="btn btn-success">swap Address</button>
            <button onClick={handleSubmit}  type="button" className="btn btn-success">submit</button>
            <button onClick={clearRoute}  type="button" className="btn btn-success">clear route</button>
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
       
        </div> */}
        <form className='SearchBox' onSubmit={handleSubmit}>
            <label >  
                <Autocomplete>
                    <input 
                        className="input1 form-control form-control-lg"
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
                        className="input1 form-control form-control-lg"
                        placeholder="Destination" 
                        aria-label=".form-control-lg example"
                        type="text" 
                        ref={destinationRef}
                    />
                </Autocomplete>
            </label>
            <button onClick={swapAddress}  type="button" className="btn btn-success">swap Address</button>
            <button onClick={handleSubmit}  type="button" className="btn btn-success">submit</button>
            <button onClick={clearRoute}  type="button" className="btn btn-success">clear route</button>
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
