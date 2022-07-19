import React from 'react';
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
          <li className="list-group-item"><h3>original station is:{originStation}</h3> </li>
          <li className="list-group-item"><h3>destination station is: {destinationStation}</h3> </li>
          <li className="list-group-item"><h3>total distance is: {distance}</h3> </li>
          <li className="list-group-item"><h3>transit distance is: {transitDistance}</h3> </li>
          <li className="list-group-item"> <h2>total time is: {duration}</h2></li>
          <li className="list-group-item"> <h2>transit time is: {transitDuration}</h2></li>
        </ul>
        <div className="card-footer">
          <button onClick={handleCloseAndClearMap} type="button" className="btn btn-danger">close</button>
        </div>
    </div> 
  )
}