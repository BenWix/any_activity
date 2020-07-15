const BASE_URL = "http://localhost:3000"
let currentWeather
let newActivityDisplay = false
let allActivityDisplay = false

class Weather {
    constructor(json) {
        this._temp = json['main']['temp']
        this.location = json['name']
        this._condition = json['weather']['0']['description']
        this.icon = json['weather']['icon']
        this.degrees = "F"
    }

    
    setWeather() {
        let weatherBlurb = document.querySelector('.weather')

        weatherBlurb.innerHTML = `
            <h3>Right now in \n${this.location}\nit is </h3>
            <h3>${this.condition()} & ${this.get_temp()}&#176; ${this.degrees} </h3>
        `;

    }
    
    get_temp() {
        let rawTemp = this._temp
        let temp
        //Temperature from API is in Kelvin
        //Converts based on preference of Fahrenheit or Celsius
        if (this.degrees === "F") {
            temp = (rawTemp - 273.15) * 9/5 + 32
        } else {
            temp = rawTemp - 273.15
        }
        return Math.round(temp)
    }

    condition() {
        let answer
        switch(this._condition){
            case "clear":
                answer = "clear"
                break;
            case "few clouds":
            case "scattered clouds":
            case "broken clouds": 
                answer = "cloudy"
                break;
            case "shower rain":
            case "rain":
                answer = "raining"
                break;
            case "thunderstorm":
                answer = "storming"
                break;
            default: 
                answer = this._condition + "ing"
        }
        return answer
    }
}

function getWeather(lat, long) {
    let weatherURL = BASE_URL + `/weather/${lat}/${long}`
    fetch(weatherURL)
        .then(response => response.json())
        .then(json => {
            console.log('Weather has been retrieved')
            console.log(json)
            currentWeather = new Weather(json)
            currentWeather.setWeather()
        })
}

function setNewActivityButton() {
    let button = document.querySelector("#addActivity")
    let newActivityForm = document.querySelector("#newActivity")
    button.addEventListener("click", () =>{
        event.preventDefault()
        if (newActivityDisplay) {
            newActivityForm.style.display = "none"
            newActivityDisplay = false
        } else {
            newActivityForm.style.display = "block"
            newActivityDisplay = true
        }
    })
}

function setAllActivityButton() {
    let button = document.querySelector("#allActivities")
    let allActivityList = document.querySelector("#allActivitiesList")
    button.addEventListener("click", () =>{
        event.preventDefault()
        if (allActivityDisplay) {
            allActivityList.style.display = "none"
            allActivityDisplay = false
        } else {
            allActivityList.style.display = "block"
            allActivityDisplay = true
        }
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
    setNewActivityButton()
    setAllActivityButton()
})



