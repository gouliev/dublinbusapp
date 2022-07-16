import React from 'react'
import './MultiChoices.css'
import { useState } from 'react';
import Info from './Info';

export default function MultiChoices({ 
    directionsResponse,
    clearRoute
}) {
  const [showdetails, setShowdetails] = useState(false);
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [originStation, setOriginStation] = useState('')
  const [destinationStation, setDestinationStation] = useState('')
  const [transitDistance, setTransitDistance] = useState('')
  const [transitDuration, setTransitDuration] = useState('')


  return (
      <div className="card">
        {!showdetails && <ul className="list-group list-group-flush">
            {directionsResponse && directionsResponse.routes.map(route => (
                <li key={route.overview_path} className="list-group-item" onClick={() => {
                    setShowdetails(true)
                    setDistance(route.leg[0].distance.text)
                    setDuration(route.leg[0].duration.text)
                    setOriginStation(route.legs[0].steps[1].transit.departure_stop.name)
                    setDestinationStation(route.legs[0].steps[1].transit.arrival_stop.name)
                    setTransitDistance(route.legs[0].steps[1].distance.text)
                    setTransitDuration(route.legs[0].steps[1].duration.text)
                    console.log(route)
                }}>
                    {route.leg[0].setps[1].transit.line.short_name}
                    {route.leg[0].distance.text}
                </li>
            ))}
        </ul>}
        {showdetails && <Info
            setShowdetails={setShowdetails}
            clearRoute={clearRoute} 
            distance={distance} 
            duration={duration}
            originStation={originStation}
            destinationStation={destinationStation}
            transitDistance={transitDistance}
            transitDuration={transitDuration}
        />}

    </div> 
  )
}