// const searchBtn = document.querySelector("#search-btn");
// let searchInput = document.querySelector("#search-input").value;
// const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&APPID=a4396d434551ba845da6a657caa7cd7c`;
// const apiKey = "a4396d434551ba845da6a657caa7cd7c";

// api.openweathermap.org/data/2.5/forecast/daily?q=Austin&cnt=usa&appid=a4396d434551ba845da6a657caa7cd7c

document.querySelector("#search-btn").addEventListener('click', function(){ 
    const searchInput = document.querySelector('.search-input').value; 


    fetchData(searchInput)

    document.querySelector('.search-input').value = ''

})

//fetchData();

async function fetchData(searchInput) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&APPID=a4396d434551ba845da6a657caa7cd7c&units=imperial`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    const city = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const imageIconNumber = data.weather[0].icon;
    const imageURL = `https://openweathermap.org/img/wn/${imageIconNumber}@2x.png`
    console.log(city)
    console.log(temperature)
    console.log(description)
    console.log(imageURL)
    console.log(imageIconNumber)
    updateWeather(city, temperature, description, imageURL);
  } catch (error) {
    console.log("Error", error);
  }
}
//updates the weather
const updateWeather = (city, temperature, description, imageUrl) => {

  const tempInfo = document.querySelector(".temp-info");
  const tempRounded = Math.round(temperature);
  //console.log(tempRounded)  

  tempInfo.innerHTML = ""; 

  const template = `       
    <div class="container mt-4">
      <div class="row">
        <div class="card-group">
          <div class="card current-weather text-center">
            <div class="card-body temp-info">
              <h1 class="card-title current-temp">${tempRounded}°F</h1>
              <h4 class="card-title current-city">${city}</h4>
              <p class="card-text current-vis"><small>${visibility}</small></p>
            </div>
        </div>
            <div class="card current-weather text-left">
            <div class="card-body text-left">
              <img src=${imageUrl} alt="weather icon" />
            </div>
          </div>
        </div>
      </div>
    </div>`;

  tempInfo.insertAdjacentHTML("beforeend", template);
};


//fetchData()
