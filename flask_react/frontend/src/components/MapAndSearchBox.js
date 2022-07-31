import React from 'react'
import Cookies from 'universal-cookie';
import { useState, useRef, useEffect} from 'react';
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

import { lightStyle, darkStyle } from '../context/styleArrays';

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
const [firstLoad, setFirstLoad] = useState(true);
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

const [coordinate,setCoordinate] = useState(center)

const [ourPrediction, setOurPrediction] = useState(0);
const [useButton, setUseButton] = useState(true)
var favInUse = false;

/** @type React.MutableRefobject<HTMLInputElement> */ 
const originRef = useRef()
  /** @type React.MutableRefobject<HTMLInputElement> */ 
const destinationRef = useRef()
//depaturetime
const dateRef = useRef()
const timeRef = useRef()
const haha = useRef()
//initialize the cookies
const cookies = new Cookies();


//use state function dark mode and light mode
const [style, setStyle] = useState(lightStyle)

//use function for mode
const [hideMode, setHideMode] = useState('show')
const [hideModeBtn, setHideModeBtn] = useState('Hide')
const [hideModeBtnTwo, setHideModeBtnTwo] = useState('submit')

async function calculateRoute() {
  if (firstLoad && cookies.get('LastOrigin') &&cookies.get('LastDestination')){
    originRef.current.value = cookies.get('LastOrigin');
    destinationRef.current.value = cookies.get('LastDestination');
  } else {
    setFirstLoad(false) 
  }
  if (favInUse){  
    originRef.current.value = cookies.get('FavOrigin');
    destinationRef.current.value = cookies.get('FavDestination');
    favInUse = false;
  }
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
  let preds = await getPrediction(results)
  //这里面所有数据都是routes数组中的
      setOurPrediction(preds);
      setDirectionsResponse(results)
      setDistance(results.routes[0].legs[0].distance.text)
      setDuration(results.routes[0].legs[0].duration.text)
      setOriginStation(results.routes[0].legs[0].start_address)
      setDestinationStation(results.routes[0].legs[0].end_address)
      setShowInfo(true)
      //Cookies are set and overwritten here.
      cookies.set('LastOrigin', results.routes[0].legs[0].start_address, { path: '/', maxAge: 31556926 }); //set cookies to expire (in a year) or else they're not kept
      cookies.set('LastDestination', results.routes[0].legs[0].end_address, { path: '/', maxAge: 31556926 });
      setFirstLoad(false);
}

//function which calls our API
//Takes in the API from Google as a parameter
async function getPrediction(results){  
let preds = [];
//initialize the bus route list and bus station list for console.log purposes
var busRouteList = []
var busStationList = []
var busDirectionList = []
//loop through each step to see if it is transit, if so call the API
//Loop through the length of the steps 

const datedate = new Date(haha.current)

var totalTransitDistance = 0;

for(var i=0; i<results.routes[0].legs[0].steps.length; i++){
  var travelMode = results.routes[0].legs[0].steps[i].travel_mode
  setWaitTime(parseInt((results.routes[0].legs[0].departure_time.value - datedate)/(60*1000)))
  if(travelMode==="TRANSIT"){
    totalTransitDistance += results.routes[0].legs[0].steps[i].distance.value;
    var route = results.routes[0].legs[0].steps[i].transit.line.short_name
    busRouteList.push(route)
    var stops = results.routes[0].legs[0].steps[i].transit.num_stops
    busStationList.push(stops)
    var headsign = results.routes[0].legs[0].steps[i].transit.headsign
    busDirectionList.push(headsign)
    const url = "http://127.0.0.1:5000/busRoute/"+ i +"/"+ route +"/"+ headsign +"/"+ stops +"/"+ (datedate.getMonth()+1) +"/"+ (datedate.getDay()+6)%7 +"/"+ datedate.getHours();
    await apiCall(url).then(prediction => {
        var j = prediction.i;
        if(prediction.travel_time === 'Route Not Supported'){
          preds.push(results.routes[0].legs[0].steps[j].duration.value);
        }
        else{
          //add the time
          preds.push(parseInt(prediction.travel_time));
        }
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
  else if(travelMode==="WALKING"){
    preds.push(results.routes[0].legs[0].steps[i].duration.value);
  }
}
totalTransitDistance = (Math.round(totalTransitDistance/100) / 10).toFixed(1) + " km";
setTransitDistance(totalTransitDistance);

//loop over prediction array and sum
let sumPreds = 0;
for(let k=0;k < preds.length;k++){
  sumPreds += preds[k];
}
return parseInt(sumPreds/60);
}

async function apiCall(url){
let res = await fetch(url);
let prediction =await res.json();
return prediction;
}

function clearRoute(){
  setShowRoute(false)
  setDirectionsResponse(null)
  setShowInfo(false);
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
}

function useFav(){
favInUse = true;
document.getElementById('submit').click();  
}

function currentDateFormatted(){
  let date = new Date();
  let mm = (date.getMonth() + 1).toString();
  let dd = date.getDate().toString();
  let yyyy = date.getFullYear().toString();
  if (mm.length < 2) {
    mm = '0' + mm;
  }
  if (dd.length < 2) {
    dd = '0' + dd;
  }
  return yyyy+"-"+mm+"-"+dd;
}

const resetForm = () => {
  originRef.current.value = ''
  destinationRef.current.value = ''
  dateRef.current.value = ''
  timeRef.current.value = ''
}

const handleSubmit = (e) => {
if(useButton===true){
  e.preventDefault()
  setShowRoute(true)
  if (firstLoad){
    map.panTo(center);
  }
  if (!dateRef.current.value){ //if date not chosen
    dateRef.current.value = currentDateFormatted();
  }
  if (!timeRef.current.value){ //if time not chosen
    timeRef.current.value = (new Date()).toTimeString().substring(0,5);
  }
  haha.current = dateRef.current.value + ' ' + timeRef.current.value
  calculateRoute()
  resetForm()
}
}

const swapAddress = () => {
if (originRef.current.value === '' && destinationRef.current.value === ''){
  originRef.current.value = destinationStation;
  destinationRef.current.value = originStation;
  dateRef.current.value = haha.current.substring(0,10);
  timeRef.current.value = haha.current.substring(11);
  document.getElementById('submit').click();
} 
else{
  const tempAddress = originRef.current.value
  originRef.current.value = destinationRef.current.value
  destinationRef.current.value = tempAddress
}
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
  if(mode === 'light'){
    setStyle(darkStyle)
  }else{
    setStyle(lightStyle)
  }
}

const changeHide = () => {
  if(hideMode === 'show'){
    setHideMode('dontshow')
    setHideModeBtn('Show')
    setHideModeBtnTwo('dontshow')
  }else{
    setHideMode('show')
    setHideModeBtn('Hide')
    setHideModeBtnTwo('submit')
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
                  streetViewControl: false,
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
            <button onClick={changeHide}  type="button" className="btn a">{hideModeBtn}</button>
            <div id={`${hideMode}`}>
              <Autocomplete>
                  <input 
                      className={`input1 form-control form-control inputOrigin ${mode}`}
                      placeholder="Origin" 
                      aria-label=".form-control-lg example"
                      type="text" 
                      ref={originRef}
                      required
                  />
              </Autocomplete>
              </div>
              <div id={`${hideMode}`}>
              <Autocomplete>
                  <input 
                      className={`input1 form-control form-control inputDestination ${mode}`}
                      placeholder="Destination" 
                      aria-label=".form-control-lg example"
                      type="text" 
                      ref={destinationRef}
                  />
              </Autocomplete>
              </div>
              <div className={'timeDate'} id={`${hideMode}`}>
                  <label >
                          <input 
                              className={`input1 inputDate form-control form-control b ${mode}`}
                              placeholder="Month:XX" 
                              aria-label=".form-control-lg example"
                              type="date" 
                              ref={dateRef}
                              required
                          />
                  </label>
                  <label >
                          <input 
                              className={`input1 inputDate form-control form-control a ${mode}`}
                              placeholder="Day:XX" 
                              aria-label=".form-control-lg example"
                              type="time" 
                              ref={timeRef}
                              required
                          />
                  </label>
                
              </div>
          <button onClick={handleGetLocation}  type="button" className="btn" id={`${hideMode}`}>Use my current position as origin</button>
          <button onClick={swapAddress}  type="button" className="btn" id={`${hideMode}`}>Swap Address</button>
          <div className='btn-group' id='favClearBtn'>
          <button onClick={useFav}  type="button" className="btn b" aria-disabled='true' id={`${hideMode}`}>Use favourite</button>
          <button onClick={handleSubmit}  type="button" className="btn c" id={`${hideModeBtnTwo}`}>Submit</button>
          </div>
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
                  hideMode={hideMode}
              />

          }
          
      </form>
  </div>
):<></>
}