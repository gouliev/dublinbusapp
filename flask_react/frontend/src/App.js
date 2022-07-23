import React from 'react'
import './App.css';
import MapAndSearchBox from './components/MapAndSearchBox';
import Weather from './components/Weather';
import ModalFunction from './components/ModalCookie';
function App() {
  return (
    <div className="App">
      <div className='Modal'>
      <ModalFunction/>
      </div>
      <div className='topSide'>
        <Weather/>
      </div>
      <div className='MapAndSearchBox'>
        <MapAndSearchBox/>
      </div>
    </div>
    
  );
}


export default App;