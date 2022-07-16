var searchCountry = document.getElementById("searchCountry");
var days = [ "Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
var months  = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 

searchCountry.addEventListener("keyup",function(e){
    searchWeather(e.target.value)
})

var global ;

async function searchWeather(region){
    var weatherAPI  = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=01c8afe29f35494e93710121220206&q=${region}&days=3`);
    if(weatherAPI.status != 400){
        var weather = await weatherAPI.json();
        console.log("weather: ",weather);
        global = weather;
        DisplayToday(weather.current,weather.location);
        displayFuture(weather.forecast);
    }
    
}

// display current weather

function DisplayToday(now,city){
    var d = new Date(now.last_updated);
    var dayName = days[d.getDay()];
    console.log(dayName);
    var displayData = `<div class="col-lg-4 current">
    <div class="container-header d-flex justify-content-between pt-2 px-3">
      <p>${dayName}</p>
      <span>${d.getDate()}${months[d.getMonth()]}</span>
    </div>
    <div class="container-body p-4">
      <h2 class="city-name">${city.name}</h2>
      <div class="degree-details d-flex  flex-wrap pb-3">
        <h1 class="degree me-3">${now.temp_c}<sup>o</sup>C</h1>
        <img src="https:${now.condition.icon}" class="ms-4 w-25" alt="">
      </div>
      <p class="weather-status pb-2">${now.condition.text}</p>
      <div class="weather-details pb-3">
        <span>
          <img src="imgs/icon-umberella.png" alt="">
          ${now.humidity}%
        </span>
        <span>
          <img src="imgs/icon-wind.png" alt="">
          ${now.wind_kph}km/h
        </span>
        <span>
          <img src="imgs/icon-compass.png" alt="">
          ${now.wind_dir}
        </span>
      </div>
    </div>
  </div>`
  document.getElementById("viewWeather").innerHTML = displayData;
}

// display two following days weather

function displayFuture(future){
    var box = ``;
    for(var i = 1;i<future.forecastday.length;i++){
        box = `<div class="col-lg-4 nextWeather">
            <div class="container-header d-flex justify-content-center align-items-center">
              <p class="pt-2">${days[new Date(future.forecastday[i].date).getDay()]}</p>
            </div>
            <div class="future-body text-center pt-5">
              <img src="https:${future.forecastday[i].day.condition.icon}" class="pb-2" alt="">
              <h4 class="text-white">${future.forecastday[i].day.maxtemp_c}<sup>o</sup>C</h4>
              <p>${future.forecastday[i].day.mintemp_c}<sup>o</sup></p>
              <p class="weather-status pb-2">${future.forecastday[i].day.condition.text}</p>
            </div>
          </div>`

          document.getElementById("viewWeather").innerHTML += box;
    }
    
}


// default state
searchWeather("cairo");