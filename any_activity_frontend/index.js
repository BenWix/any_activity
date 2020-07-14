const BASE_URL = "http://localhost:3000"

document.addEventListener("DOMContentLoaded", () => {
    let long; 
    let lat; 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude.replace('.','x')
            lat = position.coords.latitude.replace('.','x')

            let weatherURL = BASE_URL + `/weather/${lat}/${long}`
            fetch(weatherURL)
                .then(response => console.log(response))
        })
    } else {
        console.log("Unable to determine location")
    }
})