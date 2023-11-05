// Select the search input and search button
let searchInput = document.querySelector('input');
let searchBtn = document.querySelector('.search-btn');

// Add a click event listener to the search button
searchBtn.addEventListener('click', () => {
  // Get the value from the search input and trim any whitespace
  let search = searchInput.value.trim();

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
    
    // Update your HTML elements with the weather data here
    const countryCity = document.querySelector('.country-city');
    const time = document.querySelector('.time');
    const dateT = document.querySelector('.dateT');
    const icon = document.querySelector('.icon');
    const temperature = document.querySelector('.temperature');
    const windy = document.querySelector('.windy');
    const humid = document.querySelector('.humid');
    const feelsLike = document.querySelector('.feels-like');
    const uv = document.querySelector('.uv');

    countryCity.textContent = `${data.location.country}, ${data.location.name}`;
    let fullTime = time.textContent = new Date(data.location.localtime).toLocaleTimeString();
    const [hour, minute] = fullTime.split(':');
    time.textContent = `${hour}:${minute}`;
    dateT.textContent = new Date(data.location.localtime).toDateString();
    
    icon.innerHTML = `<i class="bi bi-${data.current.condition.icon.split('/').pop().replace('.png', '')}"></i>`;
    temperature.innerHTML = `${data.current.temp_c} <sup>o</sup>C`;
    windy.textContent = `${data.current.wind_kph} km/h`;
    humid.textContent = `${data.current.humidity} %`;
    feelsLike.textContent = `Feels like: ${data.current.feelslike_c} <sup>o</sup>C`;
    uv.textContent = data.current.uv;
  } catch (error) {
    console.error(error);
  }
}
