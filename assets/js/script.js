const searchBar = document.getElementById("search");
const userInput = document.getElementById("user_input");
const history = document.getElementById("history");
const currentWeather = document.getElementById("weather_now");
const fiveDays = document.getElementById("five_days");

// Button
const button = document.getElementById("searchBtn");

// var cityName

// Making the button work
searchBtn.addEventListener("click", function(event){
    event.preventDefault()
    fiveDays.innerHTML = "";
    cityName = user_input.value;
   
})

// To save in local storage and show it
var cityList = [];
cityList.push(cityName);

localStorage.setItem("history", JSON.stringify(cityList))
var storageItem = JSON.parse(localStorage.getItem("history"))




// City Name / Date / Icon
// Temp., Wind, Humidity

