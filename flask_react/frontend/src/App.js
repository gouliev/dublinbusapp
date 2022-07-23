import React from 'react'
import './App.css';
import MapAndSearchBox from './components/MapAndSearchBox';
import Weather from './components/Weather';
import Modal from './components/Modal';
function App() {
  return (
    <div className="App">
      <div className='Modal'>
      <Modal/>
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