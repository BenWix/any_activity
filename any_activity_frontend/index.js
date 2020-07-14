const BASE_URL = "http://localhost:3000"

document.addEventListener("DOMContentLoaded", () => {
    let long; 
    let lat; 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude

            console.log(`${lat}, ${long}`)
        })
    } else {
        console.log("Unable to determine location")
    }
})