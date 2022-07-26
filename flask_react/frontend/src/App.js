import React from 'react'
import './App.css';
import MapAndSearchBox from './components/MapAndSearchBox';
import Weather from './components/Weather';
import ModalFunction from './components/ModalCookie';
function App() {

  const callback = function(mutations, observer) {
    const submitButton = document.getElementById('submit');
    if (submitButton) {
      setTimeout(function() {
        submitButton.click();
      }, 100);      
      observer.disconnect();
      return;
    }
  };
  
  const observer = new MutationObserver(callback);
  observer.observe(document, {childList: true,subtree: true});

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