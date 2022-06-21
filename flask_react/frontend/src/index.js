import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*

const routeList = document.querySelector('.routeList');
const buttonGo = document.querySelector('button');
let stopStation = new Array();
stopStation = [
    {ssName: "RDS", esName: "UCD", srTime: 20},
    {ssName: "Smurfit", esName: "OCstreet", srTime: 20}
]

buttonGo.addEventListener('click', e => {
    e.preventDefault();
    if(routeList.classList.contains('d-none')){
        routeList.classList.remove('d-none');
    }

    routeList.innerHTML = `            
    <ul class="list-group choice1 mx-auto text-light mx-3 my-3 ">
        <p>First Choice</p>
        <li class="list-group-item d-flex justify-content-between align-items-center text-light">
            <span>start stop name: ${stopStation[0].ssName}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center text-light">
            <span>end stop name: ${stopStation[0].esName}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center text-light">
            <span>scheduled runing time: ${stopStation[0].srTime} mins</span>
        </li>
    </ul>
    <ul class="list-group choice1 mx-auto text-light mx-3 my-3">
        <p >Second Choice</p>
        <li class="list-group-item d-flex justify-content-between align-items-center text-light">
            <span>start stop name: ${stopStation[1].ssName}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center text-light">
            <span>end stop name: ${stopStation[1].esName}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center text-light">
            <span>scheduled runing time: ${stopStation[1].srTime} mins</span>
        </li>
    </ul>
`

});

class Forecast{
  constructor(){
      this.key = 'o8A2W5xGSY2kUAieIxpLhJSmHUf33Agv';
      this.weatherURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
      this.cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  }
  async updateCity(city){

     const cityDets = await this.getCity(city);
     const weather = await this.getWeather(cityDets.Key);
     return {cityDets, weather};// same

     }
  async getCity(city){

     const query = `?apikey=${this.key}&q=${city}`;
     const response = await fetch(this.cityURL+ query);
     const data = await response.json();
     return data[0];

 }
 async getWeather(id){

     const query = `${id}?apikey=${this.key}`;
     const response = await fetch(this.weatherURL + query);
     const data = await response.json();
     return data[0];
     
 }

}

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();



const updateUI = (data) => {

    const { cityDets, weather } = data;
    console.log(data);

    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;</span>
        </div>
    `;

    const iconSrc = `resources/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    let timeSrc = weather.IsDayTime ? 'resources/day.svg' : 'resources/night.svg';

    time.setAttribute('src', timeSrc);

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};


cityForm.addEventListener('submit', e => {
    //prevent default actions
    e.preventDefault();
    //get city value 
    const city = cityForm.city.value.trim();
    console.log(city);
    cityForm.reset();
    //update the ui with new city
    forecast.updateCity(city)
      .then(data => updateUI(data))
      .catch(err => console.log(err));
     //set local storage
    localStorage.setItem('city', city);

});

// if(localStorage.getItem('city')){
//     forecast.updateCity(localStorage.getItem('city'))
//       .then(data => updateUI(data))
//       .catch(err => console.log(err));
// }

*/