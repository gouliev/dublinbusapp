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
  transitDuration
}) {
  const handleCloseAndClearMap = () => {
    setShowInfo(false)
    clearRoute()
  }

  return (
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><h3>Original station is: {originStation}</h3> </li>
          <li className="list-group-item"><h3>Destination station is: {destinationStation}</h3> </li>
          <li className="list-group-item"><h3>Total distance is: {distance}</h3> </li>
          <li className="list-group-item"><h3>Transit distance is: {transitDistance}</h3> </li>
          <li className="list-group-item"> <h2>Google time is: {duration}</h2></li>
          <li className="list-group-item"> <h2>Our time is: {Math.trunc(transitDuration/60) > 0? Math.trunc(transitDuration/60)+" hour":null}
                                                                {Math.trunc(transitDuration/60) > 1? "s ":" "} 
                                                                {transitDuration%60 > 0? transitDuration%60+" min":null} 
                                                                {transitDuration%60 > 1? "s":null}</h2></li>
        </ul>
        <div className="card-footer">
          <button onClick={handleCloseAndClearMap} type="button" className="btn btn-danger">Cear Route</button>
        </div>
    </div> 
  )
}