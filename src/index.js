import "./main.css";

let input = document.getElementById("city");
input.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    search();
  }
});

async function getData(city) {
  let data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=731f86b9747fcb744dfc14c2ef1f5c52`,
    { mode: "cors" }
  );
  let filtered = await data.json();
  return filtered;
}

function search() {
  let city = document.getElementById("city").value;
  getData(city).then((data) => furthur(data));
}

function countryDecoder(countryCode) {
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(countryCode); // "United States"
}

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  if (h == null) {
    return `00:${m}+`;
  }
  if (m == null) {
    return `${h}:00+`;
  }
  return `${h}:${m}`;
}
function timeConverter(timex) {
  console.error(timex);
  let a = new Date(timex * 1000).toUTCString();
  return `${a.slice(-11, -4)}`;
}

function furthur(data) {
  if (data["cod"] == 200) {
    let currentTemp = document.getElementById("currentTemp");
    let minmaxtemp = document.getElementById("minmaxtemp");
    let weatherstatus = document.getElementById("weatherstatus");
    let cityName = document.getElementById("cityName");
    let countryName = document.getElementById("countryName");
    let timezone = document.getElementById("timezone");
    let sunrise = document.getElementById("sunrise");
    let sunset = document.getElementById("sunset");

    currentTemp.innerHTML = `${(data["main"]["temp"] - 273).toFixed(0)}&#176`;
    minmaxtemp.innerHTML = `${(data["main"]["temp_min"] - 273).toFixed(
      0
    )}&#176/${(data["main"]["temp_max"] - 273).toFixed(0)}&#176`;
    weatherstatus.textContent = data["weather"][0]["main"];
    cityName.textContent = data["name"];
    countryName.textContent = countryDecoder(data["sys"]["country"]);
    timezone.innerHTML = secondsToHms(data["timezone"]);
    sunrise.textContent = timeConverter(data["sys"]["sunrise"]);
    sunset.textContent = timeConverter(data["sys"]["sunset"]);
  } else {
    alert("Please enter correct city");
  }
}

search();
