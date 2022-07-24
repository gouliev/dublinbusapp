import React from 'react'
import './Info.css'

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

  

  return (
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><h3>Origin: {originStation}</h3> </li>
          <li className="list-group-item"><h3>Destination: {destinationStation}</h3> </li>
          <li className="list-group-item"><h3>Transit/Total km: {transitDistance}/{distance}</h3> </li>
          <li className="list-group-item"><h3>Wait time: {waitTime == 1? waitTime+" min": waitTime+" mins"} </h3> </li>
          <li className="list-group-item"> <h2>Google prediction: {duration}</h2></li>
          <li className="list-group-item"> <h2>Our prediction: {Math.trunc(transitDuration/60) > 0? Math.trunc(transitDuration/60)+" hour":null}
                                                                {Math.trunc(transitDuration/60) > 1? "s ":" "}
                                                                {transitDuration%60 > 0? transitDuration%60+" min":null} 
                                                                {transitDuration%60 > 1? "s":null}</h2></li> {/* //only show plural if needed */}
        </ul>
        <div className="card-footer">
          <button onClick={handleCloseAndClearMap} type="button" className="btn btn-danger">Clear Route</button>
        </div>
    </div> 
  )
}