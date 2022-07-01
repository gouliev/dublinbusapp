import React from 'react'
import './App.css';
import MapAndSearchBox from './components/MapAndSearchBox';
import clearRoute from './components/MapAndSearchBox';
//import Weather from './components/Weather';

function App() {
  return (
    <div className="App">
      <div className='topSide'>
       
      </div>
      <div className='MapAndSearchBox'>
        <MapAndSearchBox />
      </div>
      <clearRoute/>
    </div>
  );
}

// this goes beneath topSide div when reactivating the weather <Weather/>

export default App;