import React from 'react'
import './App.css';
import MapAndSearchBox from './components/MapAndSearchBox';
import Weather from './components/Weather';
function App() {
  return (
    <div className="App">
      <div className='topSide'>
        <Weather/>
      </div>

      <div className='MapAndSearchBox'>
        <MapAndSearchBox />
      </div>

    </div>
    
  );
}


export default App;