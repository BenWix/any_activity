const BASE_URL = "http://localhost:3000"

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
                .then(json => console.log(json))
        })
    } else {
        console.log("Unable to determine location")
    }
})