const BASE_URL = "http://localhost:3000"
// let degrees = "F"
let currentWeather

class Weather {
    constructor(json) {
        this._temp = json['main']['temp']
        this.location = json['name']
        this.condition = json['weather']['description']
        this.icon = json['weather']['icon']
        this.degrees = "F"
    }

    
    setWeather() {
        let weatherHeader = document.querySelector('.weather')
        let temperature = document.createElement("p")
        temperature.classList.add("temperature")
        temperature.innerHTML = this.get_temp() + this.degrees
        weatherHeader.appendChild(temperature)
        console.log('Weather has been set')
    }
    
    get_temp() {
        let rawTemp = this._temp
        let temp
        //Temperature from API is in KELVIN
        //Converts based on preference of fahrenheit or celsius
        if (this.degrees === "F") {
            temp = (rawTemp - 273.15) * 9/5 + 32
        } else {
            temp = rawTemp - 273.15
        }
        return Math.round(temp)
    }
}

function getWeather(lat, long) {
    let weatherURL = BASE_URL + `/weather/${lat}/${long}`
    fetch(weatherURL)
        .then(response => response.json())
        .then(json => {
            console.log('Weather has been retrieved')
            currentWeather = new Weather(json)
            currentWeather.setWeather()
        })
}
document.addEventListener("DOMContentLoaded", () => {
    let long; 
    let lat; 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude.toString(10).replace('.','x')
            lat = position.coords.latitude.toString(10).replace('.','x')
            console.log(`${lat}, ${long}`)
            getWeather(lat,long)
        })
    } else {
        console.log("Unable to determine location, using default of New York City")
        long = 40.7128
        lat = -74.0060
        console.log(`${lat}, ${long}`)

        getWeather(lat,long)
    }
})



