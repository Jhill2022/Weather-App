const apiKey = 'b21a4d66cc2fe8245c7f8697d0b74fb2';
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
async function checkWeather(city) {
  const encodedCity = encodeURIComponent(city);
  const response = await fetch(`${apiUrl}${encodedCity}&appid=${apiKey}`);

  const data = await response.json();

  console.log(data);

  const errorElement = document.querySelector('.error');
  const weatherElement = document.querySelector('.weather');
  const cityElement = document.querySelector('.city');
  const tempElement = document.querySelector('.temp');
  const humidityElement = document.querySelector('.humidity');
  const windElement = document.querySelector('.wind');

  if (response.status === 404) {
    errorElement.style.display = 'block';
    weatherElement.style.display = 'none';
  } else {
    const { main, name, wind } = data;
    const { temp, humidity } = main;
    const weatherMain = data.weather[0].main;

    switch (weatherMain) {
      case 'Clouds':
        weatherIcon.src = 'images/clouds.png';
        break;
      case 'Clear':
        weatherIcon.src = 'images/clear.png';
        break;
      case 'Rain':
        weatherIcon.src = 'images/rain.png';
        break;
      case 'Drizzle':
        weatherIcon.src = 'images/drizzle.png';
        break;
      case 'Mist':
        weatherIcon.src = 'images/mist.png';
        break;
      default:
        break;
    }

    errorElement.style.display = 'none';
    cityElement.innerHTML = name;
    tempElement.innerHTML = `${Math.round(temp)}°c`;
    humidityElement.innerHTML = `${humidity}%`;
    windElement.innerHTML = `${wind.speed} km/h`;
    weatherElement.style.display = 'block';
  }
}

searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
});
checkWeather();
