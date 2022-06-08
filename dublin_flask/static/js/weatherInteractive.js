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

    const iconSrc = `/static/resources/img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    let timeSrc = weather.IsDayTime ? '/static/resources/img/day.svg' : '/static/resources/img/night.svg';

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