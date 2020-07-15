const BASE_URL = "http://localhost:3000"
let currentWeather
let newActivityDisplay = false
let allActivityDisplay = false
let allActivites 

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
            <h3>${this.condition} & ${this.temp}&#176; ${this.degrees} </h3>
            <h3>you could</h3>
            <h3 class='suggestion'>${Activity.suggestActivity(this.condition, this.temp)}</h3>
        `;
    }
    
    get temp() {
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

    get condition() {
        let answer
        switch(this._condition){
            case "clear":
                answer = "clear"
                break;
            case "few clouds":
            case "scattered clouds":
            case "broken clouds": 
            case "overcast clouds":
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

    static getWeather(lat, long) {
        let weatherURL = BASE_URL + `/weather/${lat}/${long}`
        console.log(weatherURL)
        fetch(weatherURL)
            .then(response => response.json())
            .then(json => {
                console.log('Weather has been retrieved')
                console.log(json)
                currentWeather = new Weather(json)
                currentWeather.setWeather()
            })
    }

}

class Activity {
    constructor(name) {
        this.name = name
    }

    addToList() {
        let list = document.querySelector(".activityList")
        let item = document.createElement('li')
        item.innerHTML = this.name
        list.appendChild(item)
    }
    
    postActivity() {
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(this.formData)
        }
        
        fetch(BASE_URL + '/activities', configObj)
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => {
            console.log(error.message)
            alert("Failed to post to server, check console for error")
        })
    }
    
    get formData() {
        return {name: this.name}
    }
    
    static createActivity(activity) {
        let newActivity = new Activity(activity["name"])
        allActivites.push(newActivity)
        newActivity.addToList()
    }
    
    static listActivities() {
        fetch(BASE_URL + '/activities')
            .then(response => response.json())
            .then(json => json.forEach(activity => Activity.createActivity(activity)))
    }

    static suggestActivity(condition, temperature) {
        return allActivites[Math.floor(Math.random() * allActivites.length)].name
    }
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

function setSubmitActivityButton() {
    let button = document.querySelector('#activitySubmit')
    button.addEventListener("click", () => {
        event.preventDefault()
        let newActivity = new Activity(document.forms["activityForm"]["aname"].value)
        newActivity.addToList()
        newActivity.postActivity()
    })
}

document.addEventListener("DOMContentLoaded", () => {
    let long; 
    let lat; 
    allActivites =[]
    Activity.listActivities()
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude.toString(10).replace('.','x')
            lat = position.coords.latitude.toString(10).replace('.','x')
            console.log(`${lat}, ${long}`)
            Weather.getWeather(lat,long)
        })
    } else {
        console.log("Unable to determine location, using default of New York City")
        long = 40.7128
        lat = -74.0060
        console.log(`${lat}, ${long}`)
        Weather.getWeather(lat,long)
        
    }
    setNewActivityButton()
    setAllActivityButton()
    setSubmitActivityButton()
})



