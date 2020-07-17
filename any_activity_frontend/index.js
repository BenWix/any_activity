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
            <h3 class='suggestion'></h3>
        `;
        Activity.suggestActivity()
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
        this.conditions = []
    }

    setCondition(condition) {
        let newCondition = new Condition(condition["weather"], condition["min_temp"], condition["max_temp"])
        this.conditions.push(newCondition)
    }

    addToList() {
        let list = document.querySelector(".activityList")
        let item = document.createElement('li')
        item.innerHTML = this.name
        list.appendChild(item)
    }

    weatherValid() {
        let value = false
        // console.log(this.name) 
        this.conditions.forEach(con => {
            // console.log(con['weather'])
            if ((con.weather === currentWeather.condition  || con.weather === 'any') && con.minTemp <= currentWeather.temp && con.maxTemp >= currentWeather.temp) {
                value = true
            }
        })
        return value
    }
    
    static postActivity() {
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(Activity.formData())
        }
        
        fetch(BASE_URL + '/activities', configObj)
        .then(response => response.json())
        .then(json => Activity.createActivity(json))
        .catch(error => {
            console.log(error.message)
            alert("Failed to post to server, check console for error")
        })
    }
    
    static formData() {
        let name = document.forms["activityForm"]["aname"].value
        
        let conditions = []
        let conditionsForms = document.querySelectorAll('.conditionsForm')
        conditionsForms.forEach(form => {
            let newCondition = {}
            newCondition["weather"] = form.children[1].value
            newCondition["min_temp"] = form.children[3].value ? form.children[3].value : -100
            newCondition["max_temp"] = form.children[5].value ? form.children[5].value : 200
            conditions.push(newCondition)
        })
        document.querySelector('#activityForm').reset()
        //Create conditions array here
        return {name: name, conditions: conditions}
    }
    
    static createActivity(activity) {
        let newActivity = new Activity(activity["name"])
        activity["conditions"].forEach(con => newActivity.setCondition(con))
        allActivites.push(newActivity)
        newActivity.addToList()
    }
    
    static listActivities() {
        fetch(BASE_URL + '/activities')
            .then(response => response.json())
            .then(json => json.forEach(activity => Activity.createActivity(activity)))
    }

    static suggestActivity() {
        let name
        let possibleActivities = []
        for (let i=0; i < allActivites.length; i++){
            let act = allActivites[i]
            if (act.weatherValid()) {
                possibleActivities.push(act)
            }
        }
        let activity = possibleActivities[Math.floor(Math.random() * possibleActivities.length)]
        if (activity) {
            name = activity.name
        } else {
            name = "Suggest a New Activity"
        }
        document.querySelector('.suggestion').innerHTML = name
    }
}

class Condition {
    constructor(weather, minTemp, maxTemp) {
        this.weather = weather
        this.minTemp = minTemp
        this.maxTemp = maxTemp
    }
}


function setSubmitActivityButton() {
    let button = document.querySelector('#activitySubmit')
    button.addEventListener("click", () => {
        event.preventDefault()
        Activity.postActivity()
    })
}

function setRandomButton() {
    let button = document.querySelector("#randomActivity")
    button.addEventListener("click", () => {
        event.preventDefault()
        Activity.suggestActivity()
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

function addConditionsButton() {
    document.querySelector('#moreConditions').addEventListener('click', () => {
        event.preventDefault()
        let conditionsArea = document.querySelector('.conditionsArea')
        let newForm = document.createElement('div')
        newForm.classList.add('conditionsForm')
        newForm.innerHTML = `
        <label>Weather Condition</label>
        <select name="condition" id="condition-dropdown">
        <option value="any">Any Condition</option>
        <option value="clear">Clear</option>
        <option value="cloudy">Cloudy</option>
        <option value="raining">Raining</option>
        <option value="storming">Storming</option>
        <option value="misting">Misting</option>
        <option value="snowing">Snowing</option>
        </select>
        
        <label>Min Temp</label>
        <input type="number" name="minTemp">
        
        <label>Max Temp</label>
        <input type="number" name="maxTemp">
        `
        conditionsArea.appendChild(newForm)
    })
}


document.addEventListener("DOMContentLoaded", () => {
    let long; 
    let lat; 
    allActivites =[]
    Activity.listActivities()
    new Promise((resolve, reject) => {

        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude.toString(10).replace('.','x')
            lat = position.coords.latitude.toString(10).replace('.','x')
            console.log(`${lat}, ${long}`)
            Weather.getWeather(lat,long)
        })
        resolve(1)
    }).then((data) => {
      
          if (!lat) {
              console.log("Unable to determine location, using default of New York City")
                  lat = '40x7128'
                  long = '-74x0060'
              console.log(`${lat}, ${long}`)
              Weather.getWeather(lat,long)
          }
      })
    setRandomButton()
    setNewActivityButton()
    setAllActivityButton()
    setSubmitActivityButton()
    addConditionsButton()
})



