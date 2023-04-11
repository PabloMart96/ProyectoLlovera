"use strict";

const button = document.getElementById("button");

document.getElementById("cards").style.visibility = "hidden";

button.addEventListener("click", () => {
  let lon, lat;

  let city = document.getElementById("city");

  let temp1 = document.getElementById("temp1");
  let temp2 = document.getElementById("temp2");
  let temp3 = document.getElementById("temp3");

  let img1 = document.getElementById("img1");
  let img2 = document.getElementById("img2");
  let img3 = document.getElementById("img3");

  let weatherText = document.getElementById("weatherText");
  let weatherText2 = document.getElementById("weatherText2");
  let weatherText3 = document.getElementById("weatherText3");

  let hour1 = document.getElementById("hour");
  let hour2 = document.getElementById("hour4");
  let hour3 = document.getElementById("hour8");

  let inicio = document.getElementById("inicio");
  let fin = document.getElementById("fin");

  let llovera = document.getElementById("llovera");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      let preActual, pre2, pre3, pre4, pre5, pre6, pre7, pre8;

      document.getElementById("cards").style.visibility = "visible";

      const url = `https://api.weatherapi.com/v1/forecast.json?key=61017b0b92844917b28110209232803&q=${lat},${lon}&days=2&lang=es`;
      console.log(url);

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          city.textContent = data.location.name;

          let date = new Date(data.current.last_updated_epoch * 1000);
          let hour = date.getHours();

          let temp = Math.round(data.current.temp_c);
          temp1.textContent = `${temp}ºC`;

          img1.src = data.current.condition.icon;
          weatherText.textContent = data.current.condition.text;
          hour1.textContent = `${hour}:00`;
          //Precipitacion Actual
          preActual = data.current.precip_mm;
          //Precipitacion 2 hora
          let hourTwo = hour + 2;
          if (hourTwo > 23) {
            let aux = hourTwo - 23;
            hourTwo = aux;
            pre2 = data.forecast.forecastday[1].hour[hourTwo].precip_mm;
          } else {
            pre2 = data.forecast.forecastday[0].hour[hourTwo].precip_mm;
          }

          //Precipitacion 3 hora
          let hourThree = hour + 3;
          if (hourThree > 23) {
            let aux = hourThree - 23;
            hourThree = aux;
            pre3 = data.forecast.forecastday[1].hour[hourThree].precip_mm;
          } else {
            pre3 = data.forecast.forecastday[0].hour[hourThree].precip_mm;
          }

          //Precipitacion 4 hora
          let hour4 = hour + 4;

          if (hour4 > 23) {
            let aux = hour4 - 23;
            hour4 = aux;

            temp = Math.round(data.forecast.forecastday[1].hour[hour4].temp_c);
            temp2.textContent = `${temp}ºC`;

            img2.src = data.forecast.forecastday[1].hour[hour4].condition.icon;
            weatherText2.textContent =
              data.forecast.forecastday[1].hour[hour4].condition.text;
            hour2.textContent = `${hour4}:00`;

            pre4 = data.forecast.forecastday[1].hour[hour4].precip_mm;
          } else {
            temp = Math.round(data.forecast.forecastday[0].hour[hour4].temp_c);
            temp2.textContent = `${temp}ºC`;

            img2.src = data.forecast.forecastday[0].hour[hour4].condition.icon;
            weatherText2.textContent =
              data.forecast.forecastday[0].hour[hour4].condition.text;
            hour2.textContent = `${hour4}:00`;

            pre4 = data.forecast.forecastday[0].hour[hour4].precip_mm;
          }
          //Precipitacion 5 hora
          let hour5 = hour + 5;
          if (hour5 > 23) {
            let aux = hour5 - 23;
            hour5 = aux;
            pre5 = data.forecast.forecastday[1].hour[hour5].precip_mm;
          } else {
            pre5 = data.forecast.forecastday[0].hour[hour5].precip_mm;
          }

          //Precipitacion 6 hora
          let hour6 = hour + 6;
          if (hour6 > 23) {
            let aux = hour6 - 23;
            hour6 = aux;
            pre6 = data.forecast.forecastday[1].hour[hour6].precip_mm;
          } else {
            pre6 = data.forecast.forecastday[0].hour[hour6].precip_mm;
          }

          //Precipitacion 7 hora
          let hour7 = hour + 7;
          if (hour7 > 23) {
            let aux = hour7 - 23;
            hour7 = aux;
            pre7 = data.forecast.forecastday[1].hour[hour7].precip_mm;
          } else {
            pre7 = data.forecast.forecastday[0].hour[hour7].precip_mm;
          }

          //Precipitacion 8 hora
          let hour8 = hour4 + 4;

          if (hour8 > 23) {
            let aux = hour8 - 23;
            hour8 = aux;

            temp = Math.round(data.forecast.forecastday[1].hour[hour8].temp_c);
            temp3.textContent = `${temp}ºC`;

            img3.src = data.forecast.forecastday[1].hour[hour8].condition.icon;
            weatherText3.textContent =
              data.forecast.forecastday[1].hour[hour8].condition.text;
            hour3.textContent = `${hour8}:00`;

            pre8 = data.forecast.forecastday[1].hour[hour8].precip_mm;
          } else {
            temp = Math.round(data.forecast.forecastday[0].hour[hour8].temp_c);
            temp3.textContent = `${temp}ºC`;

            img3.src = data.forecast.forecastday[0].hour[hour8].condition.icon;
            weatherText3.textContent =
              data.forecast.forecastday[0].hour[hour8].condition.text;
            hour3.textContent = `${hour8}:00`;

            pre8 = data.forecast.forecastday[0].hour[hour8].precip_mm;
          }
          //Validacion Lluvia
          if (
            preActual >= 0.1 ||
            pre2 >= 0.1 ||
            pre3 >= 0.1 ||
            pre4 >= 0.1 ||
            pre5 >= 0.1 ||
            pre6 >= 0.1 ||
            pre7 >= 0.1 ||
            pre8 >= 0.1
          ) {
            llovera.textContent = "Llovera en las proximas horas...";
          } else {
            llovera.textContent = "No llovera en las proximas horas...";
          }

          inicio.textContent = data.forecast.forecastday[0].astro.sunrise;
          fin.textContent = data.forecast.forecastday[0].astro.sunset;
        })
        .catch((error) => console.error(error.message));
    });
  }
});

