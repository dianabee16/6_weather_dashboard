document.addEventListener("DOMContentLoaded", function(){

const searchBar = document.getElementById("search");
const userInput = document.getElementById("user_input");
const history = document.getElementById("history");
const currentWeather = document.getElementById("weather_now");
const fiveDays = document.getElementById("five_days");
const today = document.getElementById("todaysForecast");
const apiKey = "838b8791a0237d5fc47969309680dfc4";
const apiKey2 = "dbb601e9b7c8bad902bd55c2a2689ca5"; //TA
const apiKey3 = "ac330876b1d9a9795ee28bc613e69fea";

// Button
const button = document.getElementById("searchBtn");

function search(cityName){
    fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey2}`
    ).then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data,"hello")
        var todayForecast = `
        <h1>City Name: ${data[0].name}</h1>
        `;
        currentWeather.innerHTML = todayForecast
        var lat = data[0].lat
        var lon = data[0].lon
        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey2}`)
        .then(function(response){
            return response.json()
        })
        .then(function(weatherData){
            console.log(weatherData,"weatherData")
            var iconCode = weatherData.current.weather[0].icon
            var iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`
            var todaysData = `
            <img src="${iconUrl}"/>
            <p>${weatherData.current.weather[0].description}</p>

            <p>Temperature: ${weatherData.current.temp}</p>
            <p>Humidity: ${weatherData.current.humidity}</p>
            <p>Feels like: ${weatherData.current.feels_like}</p>
            <p>Wind speed: ${weatherData.current.wind_speed}</p>
            `;
            console.log(todaysData)
            today.innerHTML = todaysData


            // add code here for displaying weatherData
            
            // const iconCode = weatherData.weather[0].icon
            // const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`
            // const todayForecast = `
            // <section>
            // <h1>cityName: ${weatherData.name}</h1>
            // <p>Temp: ${weatherData.main.temp}</p>
            // <p>Humidity: ${weatherData.main.humidity}</p>
            // <p>Wind Speed: ${weatherData.wind.speed}</p>
            // <img src="${iconUrl}"/>
            // </section>
            // `;
            // currentWeather.innerHTML(todayForecast)
            // const lat = weatherData.coord.lat
            // const lon = weatherData.coord.lon

            fetch(
                `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey2}`
            )
            .then(function(response){
                return response.json()
            })
            .then(function(fiveDayData){
                console.log(fiveDayData)

        })
    })
})
}


        // DO NOT ADD HERE

    
    //  }).then(function(weatherData){
    //      console.log(weatherData)
    //      const iconCode = weatherData.weather[0].icon
    //      const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`
    //      const todayForecast = `
    //      <section> 
    //      <h1>cityName: ${weatherData.name}</h1>
    //      <p>Temp: ${weatherData.main.temp}</p>
    //      <p>Humidity: ${weatherData.main.humidity}</p>
    //      <p>Wind Speed: ${weatherData.wind.speed}</p>
    //      <img src="${iconUrl}"/>
    //      </section>
    //      `;
    //      currentWeather.innerHTML(todayForecast)
    //      const lat = weatherData.coord.lat
    //      const lon = weatherData.coord.lon

    //      fetch(
    //          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
    //      )
    //      .then(function(response){
    //          return response.json()
    //      })
    //      .then(function(fiveDayData){
    //          console.log(fiveDayData)
            //create a for loop - loop through fiveDayData 
            // let fiveDayArray = fiveDayData.list.filter(day => day.dt_txt.includes('12:00:00'));
//          })
//     })
// }

// Making the button work
button.addEventListener("click", function(event){
    event.preventDefault()
    fiveDays.innerHTML = "";
    let cityName = userInput.value.trim();
    search(cityName);
})

// To save in local storage and show it
var cityList = [];
// cityList.push(cityName);

localStorage.setItem("history", JSON.stringify(cityList))
var storageItem = JSON.parse(localStorage.getItem("history"))

})


// City Name / Date / Icon
// Temp., Wind, Humidity

//`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`
//`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`