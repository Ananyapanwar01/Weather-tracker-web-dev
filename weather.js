const apiKey = "0133cc5316757ac730cc46ae342334e4"; 

function log(message) {
  const consoleBox = document.getElementById("consoleOutput");
  consoleBox.innerHTML += message + "<br>";
}

function addToHistory(city) {
  const historyDiv = document.getElementById("history");
  const span = document.createElement("span");
  span.innerText = city;
  historyDiv.appendChild(span);
}

async function getWeather() {

  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherResult");
  document.getElementById("consoleOutput").innerHTML = "";

  log("🔹 Sync Start");
  log("🔹 Sync End");

  setTimeout(() => {
    log("⏳ setTimeout (Macrotask)");
  }, 0);

  Promise.resolve().then(() => {
    log("⚡ Promise.then (Microtask)");
  });

  try {
    log("🌐 [ASYNC] Start fetching");

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    const data = await response.json();

    if (data.cod !== 200) {
      resultDiv.innerHTML = "<p style='color:red;'>City not found</p>";
      return;
    }

    log("✅ [ASYNC] Data received");

    addToHistory(city);

    resultDiv.innerHTML = `
      <div class="weather-row"><span>City</span><span>${data.name}</span></div>
      <div class="weather-row"><span>Temp</span><span>${data.main.temp} °C</span></div>
      <div class="weather-row"><span>Weather</span><span>${data.weather[0].main}</span></div>
      <div class="weather-row"><span>Humidity</span><span>${data.main.humidity}%</span></div>
      <div class="weather-row"><span>Wind</span><span>${data.wind.speed} m/s</span></div>
    `;

  } catch (error) {
    resultDiv.innerHTML = "<p style='color:red;'>Error fetching data</p>";
  }
}