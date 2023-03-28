let latitude;
let longitude;
const apiKey = "fa82ed2e995d469faf585924232803";
const days = 1;
const previsionAhoras = 8;

const geoLocation = (event) => {
  console.log(event.target);
  if ("geolocation" in navigator) {
    /* geolocation is available */
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        const urlForecast = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=${days}&lang=es`;
        async function getWeather() {
          try {
            const response = await fetch(urlForecast);
            const data = await response.json();
            console.log(data);
            console.log(data.forecast.forecastday[0]);
            const ubicacion = data.location;
            const today = data.forecast.forecastday[0];
            // const condicionMetereologica = today.day.condition;
            const hours = today.hour;
            const locationElement = document.querySelector(".location");
            locationElement.innerHTML = `
                        <p><strong>Ciudad</strong> ${ubicacion.name}</p>
                        <p><strong>Provincia</strong> ${ubicacion.region}</p>`;
            const hoursContainer = document.querySelector(".hours-container");

            for (let i = 0; i < previsionAhoras; i++) {
              const hourData = hours[i];
              // console.log('orden %s datos %o', i + 1, hourData);
              const htmlElement = ` <img src="${
                hourData.condition.icon
              }" alt="${hourData.condition.text}" class="img">
                            <p>${hourData.condition.text}</p>
                            <p><strong>Temperatura media</strong> ${
                              hourData.temp_c
                            } ºC</p>
                            <p><strong>Hora</strong> ${hourData.time}</p>
                            <p><strong>Prevision lluvia</strong> ${
                              hourData.chance_of_rain == 0
                                ? "no Llovera"
                                : `${hourData.chance_of_rain} % posible`
                            }</p>
                            `;
              const card = document.createElement("div");
              card.classList.add("card");
              card.innerHTML = htmlElement;
              hoursContainer.appendChild(card);
            }
          } catch (error) {
            console.error(error);
          }
        }
        getWeather();
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    /* geolocation IS NOT available */
  }
};
const myButton = document.getElementById("myBtn");
myButton.addEventListener("click", geoLocation);
