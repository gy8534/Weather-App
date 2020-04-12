window.addEventListener('load' , ()=> {
    let lon;
    let lat;
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureDescription = document.querySelector(".temperature-description");

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const api = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=21f3940c0ee8091fa93aabc99c9de858";
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const description = data.weather[0].description.toUpperCase();
                    const city = data.name + "/" +data.sys.country;
                    const temperature = data.main.temp-273.15;
                    const icon = data.weather[0].icon;

                    temperatureDescription.textContent = description;
                    temperatureDegree.textContent = temperature;
                    locationTimezone.textContent = city;
                    document.getElementById("location-icon").src = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
                })
        });
    }
});