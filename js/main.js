// Select the search input and search button
let searchInput = document.querySelector('input');
let searchBtn = document.querySelector('.search-btn');
const errorMessage = document.getElementById('error-message');

// Add a click event listener to the search button
searchBtn.addEventListener('click', () => {
  // Get the value from the search input and trim any whitespace
  let search = searchInput.value.trim();
  errorMessage.textContent = '';
  // Check if the search input is not empty
  if (search !== '') {
    // Fetch weather data using the search value
    fetchWeatherData(search);
  }
});

// Define a function to fetch weather data
async function fetchWeatherData(search) {

  const apiKey = '5cb17f6af3c54d7b8a9124501230611';
  try {

    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${search}&aqi=no`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);

    // Update your HTML elements with the weather data here
    const countryCity = document.querySelector('.country-city');
    document.querySelector(".country").style.display = "flex";
    const time = document.querySelector('.time');
    time.style.display = "flex";
    const dateT = document.querySelector('.dateT');
    dateT.style.display = "flex";
    const icon = document.querySelector('.icon');
    icon.style.display = "flex";
    const temperature = document.querySelector('.temperature');
    temperature.style.display = "flex";
    const windy = document.querySelector('.windy');
    const humid = document.querySelector('.humid');
    document.querySelector(".weather-feature").style.display = "flex";
    const feelsLike = document.querySelector('.feels-like');
    const uv = document.querySelector('.uv');
    document.querySelector(".weather-feels").style.display = "flex";

    countryCity.textContent = `${data.location.country}, ${data.location.name}`;

    // Get the time in 24-hour format and include the time zone information
    const date = new Date(data.location.localtime);
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: false, timeZoneName: 'short' };
    const timeStringWithTimeZone = date.toLocaleString('en-US', timeOptions);

    // Remove the time zone information
    const timeStringWithoutTimeZone = timeStringWithTimeZone.replace(/ GMT[+-]\d{1,2}$/, '');
    time.textContent = timeStringWithoutTimeZone;

    // Format the date to "Weekday, Month day" format
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    dateT.textContent = date.toLocaleDateString('en-US', dateOptions);

    // Assuming you have an element with class "icon" in your HTML
    icon.innerHTML = `<img src="https:${data.current.condition.icon}" alt="weather"></img`;
    temperature.innerHTML = `<span>${data.current.temp_c} &deg;C</span>`;
    windy.innerHTML = `<i class="bi bi-wind"></i>&nbsp;<span>${data.current.wind_kph} km/h</span>`;
    humid.innerHTML = `<i class="bi bi-water"></i>&nbsp;<span>${data.current.humidity} %</span`;
    feelsLike.innerHTML = `Feels like: ${data.current.feelslike_c} <sup>o</sup>C`;
    uv.textContent = data.current.uv;
    uv.style.color = "green";

  } catch (error) {
    errorMessage.textContent = 'City not found. Please try again.';
    resetPage();
  }
}

// Function to reset the page to its initial state
function resetPage() {
  // Clear weather data elements
  document.querySelector(".country").style.display = "none";
  document.querySelector(".time").style.display = "none";
  document.querySelector(".dateT").style.display = "none";
  document.querySelector(".icon").style.display = "none";
  document.querySelector(".temperature").style.display = "none";
  document.querySelector(".weather-feature").style.display = "none";
  document.querySelector(".weather-feels").style.display = "none";
  // Clear the search input
  searchInput.value = '';
}