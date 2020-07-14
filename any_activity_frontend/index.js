const BASE_URL = "http://localhost:3000"
let degrees = "F"

document.addEventListener("DOMContentLoaded", () => {
    let long; 
    let lat; 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude.toString(10).replace('.','x')
            lat = position.coords.latitude.toString(10).replace('.','x')

            let weatherURL = BASE_URL + `/weather/${lat}/${long}`
            fetch(weatherURL)
                .then(response => response.json())
                .then(json => setWeather(json))
        })
    } else {
        console.log("Unable to determine location")
    }
})

function setWeather(json) {
    let weatherHeader = document.querySelector('.weather')
    let temperature = document.createElement("li")
    temperature.classList.add("temperature")
    temperature.innerHTML = get_temp(json) + degrees
    weatherHeader.appendChild(temperature)
}

function get_temp(weather) {
    let rawTemp = weather["main"]["temp"]
    let temp
    //Temperature from API is in KELVIN
    //Converts based on preference of fahrenheit or celsius
    if (degrees === "F") {
        temp = (rawTemp - 273.15) * 9/5 + 32
    } else {
        temp = rawTemp - 273.15
    }
    return Math.round(temp)
}