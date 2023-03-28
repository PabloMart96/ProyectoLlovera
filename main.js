"use strict"

const button = document.getElementById('button');

document.getElementById('cards').style.visibility = "hidden";

button.addEventListener('click', () => {

    let lon, lat;

    let city = document.getElementById('city');

    let temp1 = document.getElementById('temp1');
    let temp2 = document.getElementById('temp2');
    let temp3 = document.getElementById('temp3');

    let img1 = document.getElementById('img1');
    let img2 = document.getElementById('img2');
    let img3 = document.getElementById('img3');

    let hour1 = document.getElementById('hour');
    let hour2 = document.getElementById('hour4');
    let hour3 = document.getElementById('hour8');



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            document.getElementById('cards').style.visibility = "visible";

            const url = `https://api.weatherapi.com/v1/forecast.json?key=61017b0b92844917b28110209232803&q=${lat},${lon}&days=2&lang=es`;
            console.log(url)

            fetch(url)
                .then(response => response.json())
                .then(data => {

                    city.textContent = data.location.name;

                    let date = new Date(data.current.last_updated_epoch * 1000);
                    let hour = date.getHours();

                    let temp = Math.round(data.current.temp_c);
                    temp1.textContent = `${temp}ºC`;

                    img1.src = data.current.condition.icon;

                    hour1.textContent = `${hour}:00`

                    let hour4 = hour + 4;

                    if (hour4 > 23) {
                        let aux = hour4 - 23;
                        hour4 = aux;

                        temp = Math.round(data.forecast.forecastday[1].hour[hour4].temp_c)
                        temp2.textContent = `${temp}ºC`;

                        img2.src = data.forecast.forecastday[1].hour[hour4].condition.icon;

                        hour2.textContent = `${hour4}:00`


                    } else {
                        temp = Math.round(data.forecast.forecastday[0].hour[hour4].temp_c)
                        temp2.textContent = `${temp}ºC`;

                        img2.src = data.forecast.forecastday[0].hour[hour4].condition.icon;

                        hour2.textContent = `${hour4}:00`

                    }



                    let hour8 = hour4 + 4;

                    if (hour8 > 23) {
                        let aux = hour8 - 23;
                        hour8 = aux;

                        temp = Math.round(data.forecast.forecastday[1].hour[hour8].temp_c);
                        temp3.textContent = `${temp}ºC`;

                        img3.src = data.forecast.forecastday[1].hour[hour8].condition.icon;

                        hour3.textContent = `${hour8}:00`;

                    } else {

                        temp = Math.round(data.forecast.forecastday[0].hour[hour8].temp_c);
                        temp3.textContent = `${temp}ºC`;

                        img3.src = data.forecast.forecastday[0].hour[hour8].condition.icon;

                        hour3.textContent = `${hour8}:00`;
                    }




                })


        })



    }
});