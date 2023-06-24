const searchBar = document.getElementById("search");
const userInput = document.getElementById("user_input");
const history = document.getElementById("history");
const currentWeather = document.getElementById("weather_now");
const todaysForecast = document.getElementById("todays-weather-data");
const fiveDays = document.getElementById("five-day-cards");
const apiKey = "838b8791a0237d5fc47969309680dfc4";
const apiKey2 = "dbb601e9b7c8bad902bd55c2a2689ca5"; //TA
const apiKey3 = "ac330876b1d9a9795ee28bc613e69fea";

// Button
const button = document.getElementById("searchBtn");

// Function for the city name and API for weather info
function search(cityName) {

    fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey2}`
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            const cityName  = `<h1>${data[0].name}</h1>`;
            currentWeather.innerHTML = cityName;
            var lat = data[0].lat;
            var lon = data[0].lon;

            fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey2}`
            )
                .then(function (response) {
                return response.json();
                })
                .then(function (weatherData) {
                    console.log(weatherData.current.dt, "main Data");
                    const mainTimeStamp = weatherData.current.dt*1000;
                    const currentTime = new Date(mainTimeStamp).toLocaleDateString();
                    let fiveDayForcast = "";
                    const iconCode = weatherData.current.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
                    const todaysData = `
                        <section>
                        <p>${currentTime}</p>
                        <img src="${iconUrl}"/>
                        <p>Temperature: ${weatherData.current.temp} F</p>
                        <p>Humidity: ${weatherData.current.humidity} %</p>
                        <p>Wind Speed: ${weatherData.current.wind_speed} MPH</p>
                        <p>${weatherData.current.weather[0].description}</p>
                        </section>

                        `;
                    
                    todaysForecast.innerHTML = todaysData;

                    // Calling weather info for the next five days
                    let  fiveDayData = weatherData.daily;
                    console.log(fiveDayData, "five-day-pi");
                    for (let i = 0; i < 5; i++) {
                        console.log(fiveDayData[i], "yo");
                        const timeStamp = fiveDayData[i+1].dt*1000;
                        const currentDates = new Date(timeStamp).toLocaleDateString();
                        console.log(currentDates)
                        const fiveDayCode = fiveDayData[i].weather[0].icon;
                        const fiveDayUrl = `https://openweathermap.org/img/w/${fiveDayCode}.png`;
                        fiveDayForcast += `
                            <section class="cards">
                            <p>${currentDates}</p>
                            <div class="card-img">
                            <img src='${fiveDayUrl}'/>
                            </div>
                            <div class="card-content">
                            <p>${fiveDayData[i].weather[0].description}</p>
                            <p>Temperature day: ${fiveDayData[i].temp.day} F</p>
                            <p>Temperature night: ${fiveDayData[i].temp.night} F</p>
                            <p>Humidity ${fiveDayData[i].humidity} %</p>
                            <p>Wind Speed ${fiveDayData[i].wind_speed} MPH</p>
                            </div>
                            <div class="summary">
                            <p> ${fiveDayData[i].summary}</p>
                            </div>
                            </section>
                            `;
                    fiveDays.innerHTML = fiveDayForcast;
                    }
                });

        });
}

// Making the button work
button.addEventListener("click", function (event) {
    event.preventDefault();
    fiveDays.innerHTML = "";
    let cityName = userInput.value.trim();
    makeHistory()
    search(cityName);
    userInput.value = "";
});

// Saving searches in local storage
function makeHistory() {
    let historyValue = userInput.value.trim();
    let historyStorage = JSON.parse(localStorage.getItem("historyStorage")) || [];
    historyStorage.push(historyValue);
    localStorage.setItem("historyStorage", JSON.stringify(historyStorage));

    makeHistoryList(historyStorage)
}

// Making a list of searched cities and showing it in the page
function makeHistoryList(historyStorage) {
        history.innerHTML = "";
        historyStorage.forEach(function(city){
                const li = document.createElement('li')
                li.textContent = city;
                li.className += "past-city"
                history.appendChild(li)

                li.addEventListener("click", function(event){
                    event.preventDefault();
                    let pastCity = li.textContent;
                    search(pastCity)
                });
        });
}


//`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`
//`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`