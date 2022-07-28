import React from 'react'
import './Info.css'
import Cookies from 'universal-cookie';

export default function Info({ 
  setShowInfo, 
  clearRoute, 
  distance, 
  duration, 
  originStation, 
  destinationStation,
  transitDistance,
  transitDuration, 
  waitTime
}) {
  const handleCloseAndClearMap = () => {
    setShowInfo(false)
    clearRoute()
  }
  
  //initialize the cookies
  const cookies = new Cookies();

  function favRoute(){
    if (cookies.get('LastOrigin') && cookies.get('LastDestination')){
      cookies.set('FavOrigin', cookies.get('LastOrigin'), { path: '/', maxAge: 31556926 }); //expire in a year
      cookies.set('FavDestination', cookies.get('LastDestination'), { path: '/', maxAge: 31556926 });
    } 
  }

  return (
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><p className='Header'>Origin: </p><p className='Data'> {originStation}</p> </li>
          <li className="list-group-item"><p className='Header'>Destination: </p><p className='Data'> {destinationStation}</p> </li>
          <li className="list-group-item"><p className='Header'>Transit/Total km: </p><p className='Data'> {transitDistance}/{distance}</p> </li>
          {/*I believe we should remove these items, fairly pointless, wil lcause spagfhetti code in other model */}
          {/*<li className="list-group-item"><p className='Header'>Wait time: </p><p className='Data'> {waitTime == 1? waitTime+" min": waitTime+" mins"} </p> </li>*/}
          {/*<li className="list-group-item"> <p className='Header'>Google prediction: </p><p className='Data'> {duration}</p></li>*/}
          <li className="list-group-item"> <p className='Header'>Our prediction: </p><p className='Data'> {Math.trunc(transitDuration/60) > 0? Math.trunc(transitDuration/60)+" hour":null}
                                                                {Math.trunc(transitDuration/60) > 1? "s ":" "}
                                                                {transitDuration%60 > 0? transitDuration%60+" min":null} 
                                                                {transitDuration%60 > 1? "s":null}</p></li> {/* //only show plural if needed */}
        </ul>
        <div className="card-footer btn-group">
          
          <button onClick={favRoute}  type="button" className="btn btn-info" data-toggle="button" aria-pressed="false" autocomplete="off">Set as favourite</button>
          <button onClick={handleCloseAndClearMap} type="button" className="btn btn-danger">Clear Route</button>
        </div>
    </div> 
  )
}