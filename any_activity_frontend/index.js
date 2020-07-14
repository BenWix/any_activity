const BASE_URL = "http://localhost:3000"

document.addEventListener("DOMContentLoaded", () => {
    let long; 
    let lat; 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude

            let weatherURL = BASE_URL + `/weather/${lat}/${long}`
            fetch(weatherURL)
                .then(response => console.log(response))
        })
    } else {
        console.log("Unable to determine location")
    }
})