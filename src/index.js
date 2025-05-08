function weather(response) {
  let searchedTemperature = response.data.temperature.current;
  let searchedCity = response.data.city;
  let searchCondition = response.data.condition.description;
  let searchconditionicon = response.data.condition.icon_url;
  let searchedHumidity = response.data.temperature.humidity;
  let searchedWind = response.data.wind.speed;
  let now = new Date();

  let temperature = document.querySelector("#mainTemperature");
  let condition = document.querySelector("#mainCondition");
  let icon = document.querySelector("#icon");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let time = document.querySelector("#time");

  time.innerHTML = realDate(now);
  temperature.innerHTML = Math.round(searchedTemperature);
  condition.innerHTML = searchCondition;
  icon.src = searchconditionicon;
  humidity.innerHTML = `${searchedHumidity}%`;
  wind.innerHTML = `${searchedWind}km/h`;

  getforecast(response.data.city);
}
function realDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes},`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[date.getDay()];
}
function currentcity(city) {
  let apiKey = "46baa2dd9fcd1o05e1460da15btf430e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=46baa2dd9fcd1o05e1460da15btf430e&units=metric`;

  axios.get(apiUrl).then(weather);
}
function getforecast(city) {
  let apiKey = "46baa2dd9fcd1o05e1460da15btf430e";
  let apiurl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=46baa2dd9fcd1o05e1460da15btf430e&units=metric`;
  axios.get(apiurl).then(displayforecast);
}

function searchCity(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let heading1 = document.querySelector("#city");
  heading1.innerHTML = searchInputElement.value;
  currentcity(searchInputElement.value);
}

function displayforecast(response) {
  console.log(response.data);

  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="forecastdays">
            <div class="forecast-time">${formatDay(day.time)}</div>
            <img src="${day.condition.icon_url}"/>
            <div class="forecast-temperature">
              <span class="forecast-temperature-max">${Math.round(
                day.temperature.maximum
              )}° </span>
              <span class="forecast-temperature-min">${Math.round(
                day.temperature.minimum
              )}° </span>
            </div>
          </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

displayforecast();
